import { Button, Group, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
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
  const modals = useModals();
  const size = large ? 'md' : 'sm';

  const openLogOutConfirmationModal = () =>
    modals.openConfirmModal({
      title: 'Log out of your account',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to log out?
        </Text>
      ),
      labels: { confirm: 'Log out', cancel: 'Go back' },
      confirmProps: { color: 'red' },
      //TODO: implement an actual log out thing here
      onConfirm: () => console.log('log out'),
    });

  return (
    <Group grow={!!grow}>
      {authenticated ? (
        <Button size={size} onClick={openLogOutConfirmationModal}>
          Log out
        </Button>
      ) : (
        <>
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
        </>
      )}
    </Group>
  );
};

export default AuthButtons;
