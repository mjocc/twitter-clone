import { Button, Group } from '@mantine/core';
import { useAtom } from 'jotai';
import { VoidFunctionComponent } from 'react';
import { authModalAtom } from '../../state';
import AuthModal from './AuthModal';

interface AuthButtonsProps {}

const AuthButtons: VoidFunctionComponent<AuthButtonsProps> = () => {
  const [authModal, setAuthModal] = useAtom(authModalAtom);
  return (
    <>
      <Group>
        <Button variant="outline" onClick={() => setAuthModal('log-in')}>
          Log in
        </Button>
        <Button onClick={() => setAuthModal('sign-up')}>Sign up</Button>
      </Group>
      <AuthModal />
    </>
  );
};

export default AuthButtons;
