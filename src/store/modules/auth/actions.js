import { apiSvc, TokenService } from "../../../services";
import { Auth } from "aws-amplify";
import * as types from "../../../utils/types";
import store from "../../../store/index";

let timer;
let lastUserId;

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
    try {
      await Auth.signIn(payload.email, payload.password).then((user) => {
        context.commit("setSignedIn", !!user);
        context.commit("setCognitoUser", user);

        // Helper function to validate ExpiresIn
        // context.dispatch("showExpiresIn", {
        //   source: "ExpiresIn From aws Auth",
        //   expiresIn: user.signInUserSession.accessToken.payload.exp,
        // });

        return context.dispatch(types.AUTH, {
          ...payload,
          idToken: user.signInUserSession.idToken.jwtToken,
          expiresIn: user.signInUserSession.accessToken.payload.exp,
        });
      });
    } catch (error) {
      throw new AuthenticationError(error.code, error.message);
    }
  },
  async signup(context, payload) {
    // aws user creation
    return await Auth.signUp({
      username: payload.email,
      password: payload.password,
      attributes: {
        email: payload.email,
      },
      validationData: [], // optional
    })
      .then((data) => {
        let idToken = "signup-token";

        // db account creation
        this.dispatch("createDbAccountInfo", {
          ...payload,
          idToken,
          username: data.user.username,
        }).then(() => {
          // db client/contractor creation
          payload.id = lastUserId;
          this.dispatch("createDbClientInfo", payload, data.user).then(() => {
            // now let's get the user just created, logged into the system
            context.dispatch(types.AUTH, {
              ...payload,
            });
          });
        });
      })
      .catch((err) => {
        console.log(err);
        this.error = err.message || "Failed to register, try again later.";
        throw new AuthenticationError(err.code, this.error);
      });
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
      responseData = JSON.parse(body);
    } catch (e) {
      responseData == {};
    }

    if (!response.statusText == "OK" || response.data.length == 0) {
      const error = new Error(
        responseData.message || "Failed to authenticate. Check your login data."
      );
      throw error;
    }
    const userId = responseData.id;
    const userType = responseData.userType;
    const expiresIn = +payload.expiresIn; // const expiresIn = 5000; //5 seconds
    const expirationDate = new Date().getTime() + expiresIn;

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

      localStorage.setItem("access_token", token);
      localStorage.setItem(types.USERID, userId);
      localStorage.setItem("expirationDate", expirationDate);
    } else {
      // console.log("Nope... it is a returning user ");
      // console.log("look at this:", [userId, token, expirationDate]);
      // let's mark the user as signedIn then
    }

    // go get all the user Info to fill loggedUser
    const response = await apiSvc.get(`accounts/${userId}`);
    const { body } = response.data;
    try {
      loggedUserInfo = JSON.parse(body);
    } catch (e) {
      loggedUserInfo == {};
    }

    const expiresIn = +expirationDate - new Date().getTime();
    if (expiresIn < 0) {
      // console.log("ATTENTION: one has to log back in since token has expired");
      return;
    }

    context.dispatch("showExpiresIn", {
      source: "Let's expire this user on",
      expiresIn: expiresIn,
    });

    timer = setTimeout(function () {
      context.dispatch(types.AUTO_LOGOUT);
    }, expiresIn);

    if (token && userId) {
      await this.dispatch(types.SET_USER_TYPE_INFO, {
        token: token,
        userId: userId,
        loggedUserInfo: loggedUserInfo,
      });
    }
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

    TokenService.removeToken();
    TokenService.removeTokenExpirationDate();
    localStorage.removeItem(types.USERID);
    localStorage.removeItem(types.LOGGED_USER);

    clearTimeout(timer);

    context.commit(types.SET_USER, {
      token: null,
      userId: null,
      loggedUser: {},
    });
  },
  autoLogout(context) {
    context.dispatch(types.LOGOUT);
    context.commit(types.SET_AUTO_LOGOUT);
  },
  async setUserTypeInfo(context, payload) {
    // Setting initial login information about this user
    await context.commit(types.SET_USER, {
      token: payload.token,
      userId: payload.userId,
      loggedUser: payload.loggedUserInfo,
    });

    // Setting the userType (client or Contractor) information about this user
    switch (payload.loggedUserInfo.userType) {
      case "client":
        await this.dispatch(types.FETCH_CLIENT, { id: payload.userId });

        // eslint-disable-next-line no-case-declarations
        let client = store.getters["clients/client"];
        context.commit("updateUserAttributes", {
          ClientOrContractorInfo: client,
        });
        break;
      case "contractor":
        await this.dispatch(types.FETCH_CONTRACTOR, { id: payload.userId });
        // eslint-disable-next-line no-case-declarations
        let contractor = store.getters["contractors/contractor"];
        context.commit("updateUserAttributes", {
          ClientOrContractorInfo: contractor,
        });
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
        await this.dispatch("clients/createClient", client);
        break;
      case "contractor":
        await this.dispatch("contractors/createContractor", client);
        break;
      default:
    }
  },
  async createDbAccountInfo(context, payload) {
    const account = {
      // id: pk,
      userName: payload.email,
      password: payload.password,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      userType: payload.userType,
      comments: payload.username,
      returnSecureToken: "",
      statusText: "",
      expiresIn: "",
      idToken: "",
      expirationDate: "",
      imgPath: "",
    };

    // db user creation
    await apiSvc
      .post(`accounts`, account)
      .then((response) => {
        const { body } = response.data;
        const userId = JSON.parse(body);

        if (response.status == 200 || response.status == 201) {
          lastUserId = userId[0].LAST_INSERT_ID;
          return lastUserId;
        } else {
          return false;
        }
      })
      .catch((err) => {
        throw new AuthenticationError(err.code, err.message);
      });
  },
};
