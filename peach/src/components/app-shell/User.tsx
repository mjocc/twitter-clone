import {
  Avatar,
  Box,
  Group,
  Skeleton,
  Text,
  UnstyledButton,
  useMantineTheme
} from '@mantine/core';
import { useAtomValue } from 'jotai';
import { VoidFunctionComponent } from 'react';
import { ChevronLeft, ChevronRight } from 'tabler-icons-react';
import { authenticatedAtom } from '../../lib/state';

interface UserProps {}
// TODO: Make this actually use user data and display a skeleton when the person is logged out.
const User: VoidFunctionComponent<UserProps> = () => {
  const theme = useMantineTheme();
  const authenticated = useAtomValue(authenticatedAtom);

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
          <Group>
            <Avatar
              src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
              radius="xl"
            />
            <Box sx={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                Amy Horsefighter
              </Text>
              <Text color="dimmed" size="xs">
                ahorsefighter@gmail.com
              </Text>
            </Box>

            {theme.dir === 'ltr' ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </Group>
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
                width={120}
                height={12}
                radius="xl"
              />
              <Skeleton
                visible={true}
                animate={false}
                width={160}
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

export default User;
