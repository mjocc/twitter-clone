import { Button, Group } from '@mantine/core';
import { useAtom } from 'jotai';
import { VoidFunctionComponent } from 'react';
import { authFormAtom } from '../../lib/state';

interface AuthButtonsProps {
  grow?: boolean;
  large?: boolean;
}

const AuthButtons: VoidFunctionComponent<AuthButtonsProps> = ({
  grow,
  large,
}) => {
  const [, setAuthForm] = useAtom(authFormAtom);
  const size = large ? 'md' : 'sm';

  return (
    <Group grow={!!grow}>
      <Button
        size={size}
        variant="outline"
        onClick={() => setAuthForm('log-in')}
      >
        Log in
      </Button>
      <Button size={size} onClick={() => setAuthForm('sign-up')}>
        Sign up
      </Button>
    </Group>
  );
};

export default AuthButtons;
