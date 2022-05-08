import { Drawer, Tabs } from '@mantine/core';
import { useAtom } from 'jotai';
import { RESET } from 'jotai/utils';
import { VoidFunctionComponent } from 'react';
import { authFormAtom } from '../../lib/state';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';

interface AuthDrawerProps {}

const AuthDrawer: VoidFunctionComponent<AuthDrawerProps> = () => {
  const [authForm, setAuthForm] = useAtom(authFormAtom);
  const tabNums = {
    'log-in': 0,
    'sign-up': 1,
  };
  const active = authForm ? tabNums[authForm] : undefined;

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
        variant="pills"
        onTabChange={(_, tabKey: 'log-in' | 'sign-up') => setAuthForm(tabKey)}
        grow
      >
        <Tabs.Tab label="Log in" tabKey="log-in">
          <LogInForm />
        </Tabs.Tab>
        <Tabs.Tab label="Sign up" tabKey="sign-up">
          <SignUpForm />
        </Tabs.Tab>
      </Tabs>
    </Drawer>
  );
};

export default AuthDrawer;
