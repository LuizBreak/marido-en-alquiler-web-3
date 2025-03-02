export const AuthConfig = {
  issuer: "https://cognito-idp.ca-central-1.amazonaws.com/us-east-1_jcd6F2KYx",
  userinfoEndpoint: "https://auth-dev.target-innovations.com/oauth2/userInfo",
  redirectUri: "{your-redirect-url}",
  clientId: "7pk9i7mte51s879bo8865j50vr",
  responseType: "code",
  scope: "phone email openid profile aws.cognito.signin.user.admin",
  strictDiscoveryDocumentValidation: false,
  tokenEndpoint: "https://auth-dev.target-innovations.com/oauth2/token",
  revocationEndpoint: "https://auth-dev.target-innovations.com/logout",
  logoutUrl: "https://auth-dev.target-innovations.com/logout",
  postLogoutRedirectUri: "{your-log-out-redirect-url}",
  loginUrl: "https://auth-dev.target-innovations.com/logout",
  // useSilentRefresh: true
};
