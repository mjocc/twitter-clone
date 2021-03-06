import { Box, Group, Text, useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import { VoidFunctionComponent } from 'react';
import { ChevronLeft, ChevronRight } from 'tabler-icons-react';
import UserAvatar from './UserAvatar';

interface UserProps {
  username?: string;
  profile_name?: string;
  chevron?: boolean;
}

const User: VoidFunctionComponent<UserProps> = ({
  username,
  profile_name,
  chevron,
}) => {
  const theme = useMantineTheme();

  return (
    <Group>
      <UserAvatar username={username} />
      <Box sx={{ flex: 1 }}>
        <Text
          color={
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black
          }
          size="sm"
          weight={600}
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
};

export default User;
