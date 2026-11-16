import { expirationFromJwt } from "../../../services/session-expiry";
import { apiSvc, TokenService } from "../../../services";
import { Auth } from "aws-amplify";
import * as types from "../../../utils/types";
import store from "../../../store/index";

let timer;

function normalizeAccountInfo(accountInfo) {
  const account = Array.isArray(accountInfo) ? accountInfo[0] || {} : accountInfo || {};
  const id = account.id || account.Id || account.localId;

  return {
    ...account,
    id,
    userType: account.userType,
  };
}

class AuthenticationError extends Error {
  constructor(errorCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

export default {
  async login(context, payload) {
    clearTimeout(timer);
    apiSvc.removeHeader();
    context.commit("setSignedIn", false);
    context.commit("setCognitoUser", null);
    context.commit("clients/RESET_CLIENT", null, { root: true });
    context.commit("contractors/RESET_CONTRACTOR", null, { root: true });
    context.commit(types.SET_USER, {
      token: null,
      userId: null,
      loggedUser: {},
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem(types.USERID);
    localStorage.removeItem(types.LOGGED_USER);

    try {
      const user = await Auth.signIn(payload.email, payload.password);

      // Helper function to validate ExpiresIn
      // context.dispatch("showExpiresIn", {
      //   source: "ExpiresIn From aws Auth",
      //   expiresIn: user.signInUserSession.accessToken.payload.exp,
      // });

      await context.dispatch(types.AUTH, {
        ...payload,
        idToken: user.signInUserSession.idToken.jwtToken,
        expiresIn: user.signInUserSession.accessToken.payload.exp,
      });

      context.commit("setCognitoUser", user);
    } catch (error) {
      context.commit("setSignedIn", false);
      context.commit("setCognitoUser", null);
      context.commit("clients/RESET_CLIENT", null, { root: true });
      context.commit("contractors/RESET_CONTRACTOR", null, { root: true });
      context.commit(types.SET_USER, {
        token: null,
        userId: null,
        loggedUser: {},
      });
      localStorage.removeItem("access_token");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem(types.USERID);
      localStorage.removeItem(types.LOGGED_USER);
      throw new AuthenticationError(error.code, error.message);
    }
  },
  async signup(context, payload) {
  const registration = await Auth.signUp({ username: payload.email, password: payload.password, attributes: { email: payload.email }, validationData: [] });
  try {
    const account = await context.dispatch("createDbAccountInfo", { ...payload, username: registration.user.username });
    await context.dispatch("createDbClientInfo", { ...payload, id: account.id });
    return registration;
  } catch (error) {
    throw new AuthenticationError(error.code, "La identidad fue creada, pero el perfil no pudo completarse. Contacta soporte antes de registrarte otra vez.");
  }
},
  async auth(context, payload) {
    let response = null;
    let responseData = null;

    try {
      // db account authentication by email to get the UseId
      response = await apiSvc.post(`authenticate`, {
        email: payload.email,
        returnSecureToken: true,
      });
      const { body } = response.data;
      responseData = normalizeAccountInfo(JSON.parse(body));
    } catch (e) {
      responseData = {};
    }

    if (!response || (response.status < 200 || response.status >= 300) || !responseData.id) {
      const error = new Error(
        responseData.message || "Failed to authenticate. Check your login data."
      );
      throw error;
    }
    const userId = responseData.id;
    const userType = responseData.userType;
    const expirationDate = expirationFromJwt(payload.expiresIn);

    return await this.dispatch(types.TRY_LOGIN, {
      token: payload.idToken,
      userId: userId,
      expirationDate: expirationDate,
      userType: userType,
    });
  },
  async tryLogin(context, payload) {
    // TODO: INVESTIGATE why the service does not work
    // let token = TokenService.getToken();
    // let expirationDate = TokenService.getexpirationDateDate();

    let token = localStorage.getItem("access_token");
    let expirationDate = localStorage.getItem("expirationDate");
    let userId = localStorage.getItem(types.USERID);
    let loggedUserInfo = null;
    let userType = null;
    // console.log("ExpiresIn from localStorage", [
    //   token,
    //   expirationDate,
    //   userId,
    // ]);

    /*
     * if payload was provided, it is because it's a new login
     * and it needs to override the local storage service from
     * previous attempts
     */
    if (typeof payload !== "undefined") {
      // console.log("this is a new longin");
      token = payload.token;
      userId = payload.userId;
      expirationDate = payload.expirationDate;
      loggedUserInfo = null;
      userType = payload.userType || null;

      localStorage.setItem("access_token", token);
      localStorage.setItem(types.USERID, userId);
      localStorage.setItem("expirationDate", expirationDate);
    } else {
      // console.log("Nope... it is a returning user ");
      // console.log("look at this:", [userId, token, expirationDate]);
      // let's mark the user as signedIn then
    }

    if (!token || !userId || !expirationDate) {
      return false;
    }

    if (userId === "undefined" || userId === "null") {
      context.dispatch(types.LOGOUT);
      return false;
    }

    let sessionEmail = null;
    if (typeof payload === "undefined") {
      try {
        const session = await Auth.currentSession();
        const idToken = session.getIdToken();
        token = idToken.getJwtToken();
        expirationDate = expirationFromJwt(idToken.getExpiration());
        sessionEmail = idToken.payload.email;
        localStorage.setItem("access_token", token);
        localStorage.setItem("expirationDate", expirationDate);
      } catch (_) {
        await context.dispatch(types.LOGOUT);
        return false;
      }
    }
    apiSvc.setHeader();
    const expiresIn = +expirationDate - new Date().getTime();
    if (expiresIn < 0) {
      context.dispatch(types.LOGOUT);
      return false;
    }

    // Load account details only after establishing the Cognito session.
    try {
      const response = await apiSvc.get(`accounts/${userId}`);
      const { body } = response.data;
      loggedUserInfo = normalizeAccountInfo(JSON.parse(body));
    } catch (e) {
      loggedUserInfo = {};
    }

    context.dispatch("showExpiresIn", {
      source: "Let's expire this user on",
      expiresIn: expiresIn,
    });

    if (!loggedUserInfo.id || (sessionEmail && loggedUserInfo.email !== sessionEmail)) {
      await context.dispatch(types.LOGOUT);
      return false;
    }
    timer = setTimeout(function () {
      context.dispatch(types.AUTO_LOGOUT);
    }, expiresIn);

    if (token && userId) {
      await this.dispatch(types.SET_USER_TYPE_INFO, {
        token: token,
        userId: userId,
        userType: userType,
        loggedUserInfo: loggedUserInfo,
      });
      return true;
    }

    return false;
  },
  showExpiresIn(context, payload) {
    var now = new Date();
    let expiryDate = new Date(now.getTime() + payload.expiresIn);
    console.log(payload.source, expiryDate);
  },
  logout(context) {
    Auth.signOut()
      .then(() => {
        // context.commit("setSignedIn", false);
      })
      .catch((err) => console.log(err));

    context.commit("setSignedIn", false);

    apiSvc.removeHeader();
    TokenService.removeToken();
    TokenService.removeRefreshToken();
    TokenService.removeTokenExpirationDate();
    localStorage.removeItem("expirationDate");
    localStorage.removeItem(types.USERID);
    localStorage.removeItem(types.LOGGED_USER);

    clearTimeout(timer);

    context.commit("clients/RESET_CLIENT", null, { root: true });
    context.commit("contractors/RESET_CONTRACTOR", null, { root: true });

    context.commit(types.SET_USER, {
      token: null,
      userId: null,
      loggedUser: {},
    });
    context.commit("setCognitoUser", null);
  },
  autoLogout(context) {
    context.dispatch(types.LOGOUT);
    context.commit(types.SET_AUTO_LOGOUT);
  },
  async setUserTypeInfo(context, payload) {
    const resolvedUserType =
      payload.userType || payload.loggedUserInfo?.userType || null;

    // Setting initial login information about this user
    context.commit("clients/RESET_CLIENT", null, { root: true });
    context.commit("contractors/RESET_CONTRACTOR", null, { root: true });

    await context.commit(types.SET_USER, {
      token: payload.token,
      userId: payload.userId,
      loggedUser: {
        ...(payload.loggedUserInfo || {}),
        userType: resolvedUserType,
      },
    });

    // Setting the userType (client or Contractor) information about this user
    switch (resolvedUserType) {
      case "client":
        if (!payload.userId) {
          break;
        }

        await this.dispatch(types.FETCH_CLIENT, { id: payload.userId });

        // eslint-disable-next-line no-case-declarations
        let client = store.getters["clients/client"];
        if (client && String(client.id) === String(payload.userId)) {
          context.commit("updateUserAttributes", {
            ClientOrContractorInfo: client,
          });
        }
        break;
      case "contractor":
        if (!payload.userId) {
          break;
        }

        await this.dispatch(types.FETCH_CONTRACTOR, { id: payload.userId });
        // eslint-disable-next-line no-case-declarations
        let contractor = store.getters["contractors/contractor"];
        if (contractor && String(contractor.id) === String(payload.userId)) {
          context.commit("updateUserAttributes", {
            ClientOrContractorInfo: contractor,
          });
        }
        break;
      default:
    }
    context.commit("setSignedIn", true);
  },
  async confirmSignUp(context, payload) {
    // After retrieveing the confirmation code from the user

    await Auth.confirmSignUp(payload.username, payload.code)
      .then((data) => console.log("confirmSignUp.response", data))
      .catch((err) => {
        console.log(err);
        throw new AuthenticationError(err.code, err.message);
      });
  },
  async changePassword(context, payload) {
    // Article Reference: https://docs.amplify.aws/lib/auth/manageusers/q/platform/js/#password-operations

    // Auth.currentAuthenticatedUser() // now need since user is already in the store
    //   .then((user) => {
    try {
      await Auth.changePassword(
        payload.user,
        payload.oldPassword,
        payload.newPassword
      );
      // })
      // .then((data) => console.log(data))
      // .catch((err) => console.log(err));
    } catch (error) {
      console.log("error: ", error);
      throw new AuthenticationError(error.code, error.message);
    }
  },
  async sendConfirmationCode(context, username) {
    try {
      // Send confirmation code to user's email
      await Auth.forgotPassword(username).then((data) => console.log(data));
    } catch (error) {
      console.log("error: ", error);
      throw new AuthenticationError(error.code, error.message);
    }
  },
  async resetPasswordWithCode(context, payload) {
    // Collect confirmation code and new password, then
    try {
      await Auth.forgotPasswordSubmit(
        payload.username,
        payload.code,
        payload.newPassword
      ).then((data) => console.log(data));
    } catch (error) {
      console.log("error: ", error);
      throw new AuthenticationError(error.code, error.message);
    }
  },
  async createDbClientInfo(context, payload) {
    const client = {
      id: payload.id,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
    };

    switch (payload.userType) {
      case "client":
        return await this.dispatch("clients/createClient", client);
      case "contractor":
        return await this.dispatch("contractors/createContractor", client);
      default:
        return false;
    }
  },
  async createDbAccountInfo(context, payload) {
  const account = {
    userName: payload.email,
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    userType: payload.userType,
    comments: payload.username,
    returnSecureToken: "", statusText: "", expiresIn: "", idToken: "", expirationDate: "", avatar: "",
  };
  const response = await apiSvc.post("accounts", account);
  if (!response.data.data?.id) throw new Error("The account was not assigned an ID.");
  return response.data.data;
},
};
