import { makeApiCall } from '.';

export interface UserInfo {
  token?: null;
  loggedIn: boolean;
  username: string;
  profile_name: string;
}

export const logIn = async (credentials: {
  username: string;
  password: string;
}) =>
  await makeApiCall({
    path: '/obtain-auth-token',
    method: 'POST',
    body: credentials,
  });

export const logOut = async () =>
  await makeApiCall({
    exactPath: '/api/log-out',
    method: 'POST',
  });

// TODO: write similar logic for sign up
