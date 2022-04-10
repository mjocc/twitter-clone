import { atom } from 'jotai';
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
