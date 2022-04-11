import {
  Box,
  Group,
  Skeleton, UnstyledButton,
  useMantineTheme
} from '@mantine/core';
import { useAtomValue } from 'jotai';
import { VoidFunctionComponent } from 'react';
import { authenticatedAtom, userInfoAtom } from '../../lib/state';
import User from '../tweets/User';

interface NavbarUserProps {}

const NavbarUser: VoidFunctionComponent<NavbarUserProps> = () => {
  const theme = useMantineTheme();
  const authenticated = useAtomValue(authenticatedAtom);
  const user = useAtomValue(userInfoAtom);

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
      <UnstyledButton
        sx={{
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

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
    </Box>
  );
};

export default NavbarUser;
