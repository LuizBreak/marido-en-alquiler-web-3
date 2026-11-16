import Amplify, { Auth } from 'aws-amplify';
import awsExports from '../aws-exports';
// This module is an authentication-action dependency, so configuration precedes
// the store's initial cached-session restore as well as interactive sign-in.
Amplify.configure(awsExports);
export { Auth };
