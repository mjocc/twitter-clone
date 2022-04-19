import { makeApiCall } from '.';
import { LogInFormValues } from '../../components/authentication/LogInForm';
import { SignUpFormValues } from '../../components/authentication/SignUpForm';

export interface UserInfo {
  token?: null;
  loggedIn: boolean;
  username: string;
  profile_name: string;
}

export const logIn = async (credentials: LogInFormValues) =>
  await makeApiCall({
    path: '/obtain-auth-token',
    method: 'POST',
    body: credentials,
  });

export const signUp = async (credentials: SignUpFormValues) => {
  return await makeApiCall({
    path: '/tweeters',
    method: 'POST',
    body: credentials,
  });
};

export const logOut = async () =>
  await makeApiCall({
    exactPath: '/api/log-out',
    method: 'POST',
  });

export const getUserInfo = async (username: string) =>
  await makeApiCall({
    path: '/tweeters',
    method: 'GET',
    params: { username },
  });
// TODO: write similar logic for sign up
