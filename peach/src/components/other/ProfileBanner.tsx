import { Avatar, Button, Group, Paper, Stack, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useAtomValue } from 'jotai';
import { useState, VoidFunctionComponent } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { followTweeter, Tweeter } from '../../lib/api/tweeters';
import { useAuthProtected, usernameAtom } from '../../lib/state';

interface ProfileBannerProps extends Tweeter {}

const ProfileBanner: VoidFunctionComponent<ProfileBannerProps> = ({
  id,
  profile_name,
  username,
  tweet_count,
  following: initialFollowing,
}) => {
  const [following, setFollowing] = useState<boolean>(!!initialFollowing);
  const authProtected = useAuthProtected();
  const selfUsername = useAtomValue(usernameAtom);

  const formatter = Intl.NumberFormat('en', { notation: 'compact' });
  const self = username === selfUsername;

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(followTweeter, {
    onSuccess({ data }) {
      queryClient.invalidateQueries('tweets');
      setFollowing(data.following);
    },
    onError() {
      showNotification({
        message: "Something went wrong. The tweeter may've been deleted.",
        color: 'red',
      });
    },
  });

  return (
    <Paper py={10} px={20} sx={{ position: 'sticky', top: 60, zIndex: 100 }}>
      <Group position="apart">
        <Group>
          <Avatar
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
            radius="xl"
          />
          <Stack>
            <Text size="lg" weight={700} mb={-20}>
              {profile_name}
            </Text>
            <Text color="dimmed">{formatter.format(tweet_count)} tweets</Text>
          </Stack>
        </Group>
        <Button
          disabled={self}
          loading={isLoading}
          loaderProps={{ variant: 'oval' }}
          color={following ? 'gray' : 'blue'}
          onClick={() =>
            authProtected('follow someone', () =>
              mutate({ tweeterId: id, following: !following })
            )
          }
        >
          {following ? 'Unfollow' : 'Follow'}
        </Button>
      </Group>
    </Paper>
  );
};

export default ProfileBanner;
