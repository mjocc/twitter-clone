import { atom } from 'jotai'
import { atomWithHash, atomWithStorage } from 'jotai/utils'

export const authTokenAtom = atomWithStorage<null | string>('auth-token', null)
export const authenticatedAtom = atom((get) => get(authTokenAtom) !== null)

export const authModalAtom = atomWithHash<null | 'sign-up' | 'log-in'>('auth-modal', null)
// export const authModalAtom = atom<null | 'sign-up' | 'log-in'>(null)