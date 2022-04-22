import { showNotification } from '@mantine/notifications';
import { useAtom, useAtomValue } from 'jotai';
import { makeApiCall } from '.';
import { LogInFormValues } from '../../components/authentication/LogInForm';
import { SignUpFormValues } from '../../components/authentication/SignUpForm';
import { authenticatedAtom, authFormAtom } from '../state';

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

export const useAuthProtected = () => {
  const authenticated = useAtomValue(authenticatedAtom);
  const [, setAuthForm] = useAtom(authFormAtom);
  return (action: string, callback: () => void) => {
    if (authenticated) {
      return callback();
    } else {
      showNotification({
        message: `You must be signed-in to ${action}`,
      });
      setAuthForm('log-in');
    }
  };
};
