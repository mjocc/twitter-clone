import { makeApiCall } from './api';

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

// TODO: write similar logic for sign up and log out
