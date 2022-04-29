import { Avatar, Box, Group, Text, useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import { VoidFunctionComponent } from 'react';
import { ChevronLeft, ChevronRight } from 'tabler-icons-react';

interface UserProps {
  username?: string;
  profile_name?: string;
  noLink?: boolean;
  chevron?: boolean;
}

const User: VoidFunctionComponent<UserProps> = ({
  username,
  profile_name,
  noLink,
  chevron,
}) => {
  const theme = useMantineTheme();

  const component = (
    <Group>
      {/* // TODO: get actual user image */}
      <Avatar
        src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
        radius="xl"
      />
      <Box sx={{ flex: 1 }}>
        <Text
          color={theme.colorScheme === 'dark' ? 'white' : 'black'}
          size="sm"
          weight={600}
          sx={{ '&:hover': { textDecoration: 'underline' } }}
        >
          {profile_name}&nbsp;
        </Text>
        <Text color="dimmed" size="xs">
          @{username}
        </Text>
      </Box>

      {chevron &&
        (theme.dir === 'ltr' ? (
          <ChevronRight size={18} />
        ) : (
          <ChevronLeft size={18} />
        ))}
    </Group>
  );

  return noLink ? (
    component
  ) : (
    <Link href={`/@/${username}`}>
      <a style={{ textDecoration: 'none' }}>{component}</a>
    </Link>
  );
};

export default User;
