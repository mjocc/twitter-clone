import { Button, Group, Text } from '@mantine/core';
import { useAtom, useAtomValue } from 'jotai';
import { VoidFunctionComponent } from 'react';
import { authenticatedAtom, authFormAtom } from '../../lib/state';

interface AuthButtonsProps {
  grow?: boolean;
  large?: boolean;
}

const AuthButtons: VoidFunctionComponent<AuthButtonsProps> = ({
  grow,
  large,
}) => {
  const authenticated = useAtomValue(authenticatedAtom);
  const [, setAuthForm] = useAtom(authFormAtom);
  const size = large ? 'md' : 'sm';

  return !authenticated ? (
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
  ) : null;
};

export default AuthButtons;
