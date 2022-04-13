import {
  Box,
  Group,
  Menu,
  Skeleton,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useAtomValue } from 'jotai';
import { VoidFunctionComponent } from 'react';
import { UserOff } from 'tabler-icons-react';
import { authenticatedAtom, userInfoAtom } from '../../lib/state';
import User from '../tweets/User';

interface NavbarUserProps {}

const NavbarUser: VoidFunctionComponent<NavbarUserProps> = () => {
  const theme = useMantineTheme();
  const authenticated = useAtomValue(authenticatedAtom);
  const user = useAtomValue(userInfoAtom);
  const modals = useModals();

  const openLogOutConfirmationModal = () =>
    modals.openConfirmModal({
      title: 'Log out of your account',
      centered: true,
      children: <Text size="sm">Are you sure you want to log out?</Text>,
      labels: { confirm: 'Log out', cancel: 'Go back' },
      confirmProps: { color: 'blue' },
      //TODO: implement an actual log out thing here
      onConfirm: () => console.log('log out'),
    });

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      <Menu
        position="right"
        placement="center"
        withArrow
        control={
          <UnstyledButton
            sx={{
              display: 'block',
              width: 279,
              padding: theme.spacing.xs,
              borderRadius: theme.radius.sm,
              color:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[0]
                  : theme.black,

              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
              },
            }}
          >
            {authenticated ? (
              <User user={user} chevron />
            ) : (
              <Group>
                <Skeleton
                  circle
                  height={38}
                  animate={false}
                  sx={{ opacity: 0.5 }}
                />
                <Box sx={{ flex: 1, opacity: 0.5 }}>
                  <Skeleton
                    visible={true}
                    animate={false}
                    width={160}
                    height={12}
                    radius="xl"
                  />
                  <Skeleton
                    visible={true}
                    animate={false}
                    width={120}
                    height={12}
                    mt={7}
                    radius="xl"
                  />
                </Box>
              </Group>
            )}
          </UnstyledButton>
        }
      >
        <Menu.Item
          onClick={openLogOutConfirmationModal}
          icon={<UserOff size={14} />}
        >
          Log out
        </Menu.Item>
      </Menu>
    </Box>
  );
};

export default NavbarUser;