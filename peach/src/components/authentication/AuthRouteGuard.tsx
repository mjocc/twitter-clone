import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { PropsWithChildren, ReactNode, FunctionComponent } from 'react';
import { authenticatedAtom } from '../../lib/state';

interface AuthRouteGuardProps {
  backup: ReactNode; // rendered if auth checks fail
}

//TODO: make sure this stays up to date with any route changes
const AUTHENTICATED_ROUTES = ['/account', '/following'];

const AuthRouteGuard: FunctionComponent<AuthRouteGuardProps> = ({
  children,
  backup,
}) => {
  const authenticated = useAtomValue(authenticatedAtom);
  const router = useRouter();

  if (authenticated) return <>{children}</>;

  if (router.pathname === '/') return <>{backup}</>;

  if (!AUTHENTICATED_ROUTES.includes(router.pathname)) return <>{children}</>;

  return <>{backup}</>;
};

export default AuthRouteGuard;
