import { Amplify } from 'aws-amplify';
import * as auth from 'aws-amplify/auth';
import awsExports from '../aws-exports';

// Configure before cached-session restore. This app needs user-pool tokens only;
// uploads and other AWS services are owned by the authenticated backend.
Amplify.configure({ Auth: { Cognito: {
  userPoolId: awsExports.aws_user_pools_id,
  userPoolClientId: awsExports.aws_user_pools_web_client_id,
  loginWith: { email: true },
} } });

function authError(code, message) {
  const error = new Error(message); error.code = code; return error;
}
async function call(operation) {
  try { return await operation(); }
  catch (error) { if (!error.code) error.code = error.name; throw error; }
}
function tokenView(token) {
  return { jwtToken: token.toString(), payload: token.payload,
    getJwtToken: () => token.toString(), getExpiration: () => token.payload.exp };
}
async function session() {
  const { tokens } = await auth.fetchAuthSession();
  if (!tokens?.idToken || !tokens?.accessToken) {
    throw authError('NotAuthorizedException', 'Inicia sesión para continuar.');
  }
  const idToken = tokenView(tokens.idToken), accessToken = tokenView(tokens.accessToken);
  return { idToken, accessToken, getIdToken: () => idToken, getAccessToken: () => accessToken };
}

// Keep the existing application-facing contract in one place while using the
// supported modular SDK. No refresh token is returned to Vuex or callers.
export const Auth = {
  signIn: (username, password) => call(async () => {
    // v6 rejects account switching while a prior user is cached. The store
    // serializes provider operations, so clear that provider session first.
    await auth.signOut();
    const result = await auth.signIn({ username, password });
    if (!result.isSignedIn) {
      if (result.nextStep?.signInStep === 'CONFIRM_SIGN_UP') {
        throw authError('UserNotConfirmedException', 'Confirma tu correo para continuar.');
      }
      throw authError('SIGN_IN_STEP_REQUIRED', 'Completa la verificación de tu cuenta para iniciar sesión.');
    }
    const user = await auth.getCurrentUser(), current = await session();
    return { ...user, attributes: { email: current.idToken.payload.email }, signInUserSession: current };
  }),
  currentSession: () => call(session),
  signOut: () => call(() => auth.signOut()),
  signUp: ({ username, password, attributes }) => call(async () => {
    const result = await auth.signUp({ username, password, options: { userAttributes: attributes } });
    return { ...result, user: { username } };
  }),
  confirmSignUp: (username, code) => call(() => auth.confirmSignUp({ username, confirmationCode: code })),
  resendSignUp: username => call(() => auth.resendSignUpCode({ username })),
  changePassword: (_user, oldPassword, newPassword) => call(() => auth.updatePassword({ oldPassword, newPassword })),
  forgotPassword: username => call(() => auth.resetPassword({ username })),
  forgotPasswordSubmit: (username, code, newPassword) => call(() => auth.confirmResetPassword({ username, confirmationCode: code, newPassword })),
};

export async function chatSessionToken() {
  return (await Auth.currentSession()).getIdToken().getJwtToken();
}
