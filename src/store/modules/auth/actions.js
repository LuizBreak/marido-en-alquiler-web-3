import { expirationFromJwt } from "../../../services/session-expiry";
import { createdAccountId, usesLegacyApi } from "../../../services/api-contract";
import { apiSvc, TokenService } from "../../../services";
import { Auth } from "../../../services/cognito";
import * as types from "../../../utils/types";
import store from "../../../store/index";
import { sessionVersion, invalidateSession, requireCurrentSession } from "../../../services/session-state";

let timer;
let providerOperation = Promise.resolve();
function withProvider(operation) {
  const result = providerOperation.then(operation);
  providerOperation = result.catch(() => {});
  return result;
}
function clearSession(context, preserveStorage = false) {
  invalidateSession();
  clearTimeout(timer);
  apiSvc.removeHeader();
  context.commit("setSignedIn", false);
  context.commit("setCognitoUser", null);
  context.commit("resetUserData", null, { root: true });
  context.commit("resetChat", null, { root: true });
  context.commit(types.SET_USER, { token: null, userId: null, loggedUser: {} });
  if (!preserveStorage) {
    TokenService.removeToken();
    TokenService.removeRefreshToken();
    TokenService.removeTokenExpirationDate();
    for (const key of ["expirationDate", types.USERID, types.LOGGED_USER]) localStorage.removeItem(key);
  }
}

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
    clearSession(context);
    const version = sessionVersion();

    try {
      const user = await withProvider(() => Auth.signIn(payload.email, payload.password));
      requireCurrentSession(version);

      // Helper function to validate ExpiresIn
      // context.dispatch("showExpiresIn", {
      //   source: "ExpiresIn From aws Auth",
      //   expiresIn: user.signInUserSession.accessToken.payload.exp,
      // });

      const authenticated = await context.dispatch(types.AUTH, {
        ...payload,
        idToken: user.signInUserSession.idToken.jwtToken,
        expiresIn: user.signInUserSession.accessToken.payload.exp,
      });
      requireCurrentSession(version);
      if (!authenticated) throw new Error("No se pudo cargar tu perfil. Inicia sesión de nuevo.");
      context.commit("setCognitoUser", user);
    } catch (error) {
      if (version === sessionVersion()) await context.dispatch(types.LOGOUT);
      throw new AuthenticationError(error.code, error.message);
    }
  },
  async signup(context, payload) {
  const registration = await Auth.signUp({ username: payload.email, password: payload.password, attributes: {
    email: payload.email,
    given_name: payload.firstName || "",
    family_name: payload.lastName || "",
    profile: JSON.stringify({ userType: payload.userType === "contractor" ? "contractor" : "client" }),
  }, validationData: [] });
  if (!usesLegacyApi()) return registration;
  try {
    const account = await context.dispatch("createDbAccountInfo", { ...payload, username: registration.user.username });
    await context.dispatch("createDbClientInfo", { ...payload, id: account.id });
    return registration;
  } catch (error) {
    throw new AuthenticationError(error.code, "La identidad fue creada, pero el perfil no pudo completarse. Contacta soporte antes de registrarte otra vez.");
  }
},
  async auth(context, payload) {
    const version = sessionVersion();
    let response = null;
    let responseData = null;

    try {
      // Establish the verified Cognito identity before requesting the SQL profile.
      localStorage.setItem("access_token", payload.idToken);
      apiSvc.setHeader();
      response = await apiSvc.post(`authenticate`, {
        email: payload.email,
        returnSecureToken: true,
      });
      requireCurrentSession(version);
      const { body } = response.data;
      responseData = normalizeAccountInfo(JSON.parse(body));
    } catch (e) {
      requireCurrentSession(version);
      apiSvc.removeHeader();
      localStorage.removeItem("access_token");
      throw new AuthenticationError(e.response?.data?.code || e.code,
        e.response?.data?.message || "No se pudo iniciar sesión. Inténtalo de nuevo.");
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
    const version = sessionVersion();
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
      if (token || userId || expirationDate) await context.dispatch(types.LOGOUT);
      return false;
    }

    if (userId === "undefined" || userId === "null") {
      await context.dispatch(types.LOGOUT);
      return false;
    }

    let sessionEmail = null;
    if (typeof payload === "undefined") {
      try {
        const session = await Auth.currentSession();
        requireCurrentSession(version);
        const idToken = session.getIdToken();
        token = idToken.getJwtToken();
        expirationDate = expirationFromJwt(idToken.getExpiration());
        sessionEmail = idToken.payload.email;
        localStorage.setItem("access_token", token);
        localStorage.setItem("expirationDate", expirationDate);
      } catch (_) {
        if (version === sessionVersion()) await context.dispatch(types.LOGOUT);
        return false;
      }
    }
    apiSvc.setHeader();
    const expiresIn = +expirationDate - new Date().getTime();
    if (!Number.isFinite(expiresIn) || expiresIn <= 0) {
      await context.dispatch(types.LOGOUT);
      return false;
    }

    // Load account details only after establishing the Cognito session.
    try {
      const response = await apiSvc.get(`accounts/${userId}`);
      requireCurrentSession(version);
      const { body } = response.data;
      loggedUserInfo = normalizeAccountInfo(JSON.parse(body));
    } catch (e) {
      requireCurrentSession(version);
      loggedUserInfo = {};
    }

    context.dispatch("showExpiresIn", {
      source: "Let's expire this user on",
      expiresIn: expiresIn,
    });

    if (!loggedUserInfo.id || (sessionEmail && String(loggedUserInfo.email).trim().toLowerCase() !== String(sessionEmail).trim().toLowerCase())) {
      await context.dispatch(types.LOGOUT);
      return false;
    }
    timer = setTimeout(function () {
      if (version === sessionVersion()) context.dispatch(types.AUTO_LOGOUT);
    }, expiresIn);

    if (token && userId) {
      try {
        await this.dispatch(types.SET_USER_TYPE_INFO, {
          token: token,
          userId: userId,
          userType: userType,
          loggedUserInfo: loggedUserInfo,
        });
      } catch (_) {
        if (version === sessionVersion()) await context.dispatch(types.LOGOUT);
        return false;
      }
      requireCurrentSession(version);
      return true;
    }

    return false;
  },
  showExpiresIn(context, payload) {
    var now = new Date();
    let expiryDate = new Date(now.getTime() + payload.expiresIn);
    console.log(payload.source, expiryDate);
  },
  async logout(context, { localOnly = false } = {}) {
    clearSession(context, localOnly);
    if (!localOnly) {
      // Local data is cleared immediately, even if the provider is unreachable.
      try { await withProvider(() => Auth.signOut()); } catch (_) { /* already signed out locally */ }
    }
  },
  async autoLogout(context, payload) {
    const completed = context.dispatch(types.LOGOUT, payload);
    context.commit(types.SET_AUTO_LOGOUT);
    await completed;
  },
  async setUserTypeInfo(context, payload) {
    const version = sessionVersion();
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
    requireCurrentSession(version);
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
      phone: "",
      address: "",
    };

    switch (payload.userType) {
      case "client":
        return await this.dispatch("clients/createClient", client);
      case "contractor":
        return await this.dispatch("contractors/createContractor", {
          ...client, driversLicense: "", country: "", city: "", postalCode: "", serviceTypes: "[]",
        });
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
  if (usesLegacyApi()) {
    // Satisfy legacy NOT NULL columns without sending Cognito credentials.
    Object.assign(account, { password: "", phone: "", localId: "" });
  }
  const response = await apiSvc.post("accounts", account);
  return { id: createdAccountId(response.data.data) };
},
};
