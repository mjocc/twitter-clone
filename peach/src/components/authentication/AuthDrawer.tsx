import { Drawer, Modal, Tabs } from '@mantine/core';
import { useAtom } from 'jotai';
import { RESET } from 'jotai/utils';
import { VoidFunctionComponent } from 'react';
import { authFormAtom } from '../../state';
import LogInForm, { LogInFormValues } from './LogInForm';
import SignUpForm, { SignUpFormValues } from './SignUpForm';

interface AuthDrawerProps {}

const AuthDrawer: VoidFunctionComponent<AuthDrawerProps> = () => {
  const [authForm, setAuthForm] = useAtom(authFormAtom);
  const tabNums = {
    'log-in': 0,
    'sign-up': 1,
  };
  const active = authForm ? tabNums[authForm] : undefined;

  const handleLogIn = (values: LogInFormValues) => console.log(values)
  const handleSignUp = (values: SignUpFormValues) => console.log(values)

  return (
    <Drawer
      opened={authForm !== null}
      onClose={() => setAuthForm(RESET)}
      withCloseButton={false}
      padding="xl"
      size="lg"
      position="right"
    >
      <Tabs
        active={active}
        onTabChange={(_, tabKey: 'log-in' | 'sign-up') => setAuthForm(tabKey)}
        grow
      >
        <Tabs.Tab label="Log in" tabKey="log-in">
          <LogInForm onSubmit={handleLogIn} />
        </Tabs.Tab>
        <Tabs.Tab label="Sign up" tabKey="sign-up">
          <SignUpForm onSubmit={handleSignUp} />
        </Tabs.Tab>
      </Tabs>
    </Drawer>
  );
};

export default AuthDrawer;
