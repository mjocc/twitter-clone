import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/micah';
import { Avatar, useMantineTheme } from '@mantine/core';
import { VoidFunctionComponent } from 'react';

interface UserAvatarProps {
  username?: string;
}

const UserAvatar: VoidFunctionComponent<UserAvatarProps> = ({ username }) => {
  const theme = useMantineTheme();
  const icon = createAvatar(style, {
    seed: username,
    dataUri: true,
    backgroundColor:
      theme.colorScheme == 'dark' ? theme.colors.dark[7] : theme.colors.gray[3],
  });

  return <Avatar src={username ? icon : null} radius="xl" alt={username} />;
};

export default UserAvatar;
