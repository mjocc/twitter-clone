import { showNotification } from '@mantine/notifications';
import { atom, useAtom, useAtomValue } from 'jotai';
import { atomWithHash, selectAtom } from 'jotai/utils';
import { UserInfo } from './api/auth';

// TODO: (add profile pic url option to database?)
export const userInfoAtom = atom<null | UserInfo>(null);
export const authenticatedAtom = selectAtom(
  userInfoAtom,
  (userInfo) => !!userInfo?.loggedIn
);
export const usernameAtom = selectAtom(
  userInfoAtom,
  (userInfo) => userInfo?.username
);

export const authFormAtom = atomWithHash<null | 'sign-up' | 'log-in'>(
  'auth-form',
  null
);

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
