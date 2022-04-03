import { atom } from 'jotai';
import { atomWithHash, atomWithStorage } from 'jotai/utils';

export const authTokenAtom = atomWithStorage<null | string>('auth-token', null);
// TODO: replace username atom with full tweeter information for use in bottom left thing, etc. (add profile pic url option to database?)
export const usernameAtom = atomWithStorage<null | string>('username', null);
export const authenticatedAtom = atom((get) => get(authTokenAtom) !== null);

export const authFormAtom = atomWithHash<null | 'sign-up' | 'log-in'>(
  'auth-form',
  null
);
