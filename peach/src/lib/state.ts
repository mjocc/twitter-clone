import { atom } from 'jotai';
import { atomWithHash, atomWithStorage, selectAtom } from 'jotai/utils';
import { UserInfo } from '../lib/auth';

export const authTokenAtom = atomWithStorage<null | string>('auth-token', null);
// TODO: replace username atom with full tweeter information for use in bottom left thing, etc. (add profile pic url option to database?)
export const userInfoAtom = atomWithStorage<null | UserInfo>('user-info', null);
export const usernameAtom = selectAtom(
  userInfoAtom,
  (userInfo) => userInfo?.username
);
export const authenticatedAtom = atom((get) => get(authTokenAtom) !== null);

export const authFormAtom = atomWithHash<null | 'sign-up' | 'log-in'>(
  'auth-form',
  null
);
