const TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
export const TOKEN_EXPERATION = "tokenExpiration";

/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
 *
 * article reference: https://medium.com/@zitko/structuring-a-vue-project-authentication-87032e5bfe16
 *
 **/
export const TokenService = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  saveToken(accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  saveRefreshToken(refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  getTokenExpirationDate() {
    return localStorage.getItem(TOKEN_EXPERATION);
  },

  saveTokenExpirationDate(expirationDate) {
    localStorage.setItem(TOKEN_EXPERATION, expirationDate);
  },

  removeTokenExpirationDate() {
    localStorage.removeItem(TOKEN_EXPERATION);
  },
};
