import { Modal, Tabs } from '@mantine/core';
import { useAtom } from 'jotai';
import { RESET } from 'jotai/utils';
import { VoidFunctionComponent } from 'react';
import { authModalAtom } from '../../state';
import LogInForm, { LogInFormValues } from './LogInForm';
import SignUpForm, { SignUpFormValues } from './SignUpForm';

interface AuthModalProps {}

const AuthModal: VoidFunctionComponent<AuthModalProps> = () => {
  const [authModal, setAuthModal] = useAtom(authModalAtom);
  const tabNums = {
    'log-in': 0,
    'sign-up': 1,
  };
  const active = authModal ? tabNums[authModal] : undefined;

  const handleLogIn = (values: LogInFormValues) => console.log(values)
  const handleSignUp = (values: SignUpFormValues) => console.log(values)

  return (
    <Modal
      opened={authModal !== null}
      onClose={() => setAuthModal(RESET)}
      withCloseButton={false}
    >
      <Tabs
        active={active}
        onTabChange={(_, tabKey: 'log-in' | 'sign-up') => setAuthModal(tabKey)}
        grow
      >
        <Tabs.Tab label="Log in" tabKey="log-in">
          <LogInForm onSubmit={handleLogIn} />
        </Tabs.Tab>
        <Tabs.Tab label="Sign up" tabKey="sign-up">
          <SignUpForm onSubmit={handleSignUp} />
        </Tabs.Tab>
      </Tabs>
    </Modal>
  );
};

export default AuthModal;
