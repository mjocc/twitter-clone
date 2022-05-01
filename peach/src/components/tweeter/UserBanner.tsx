import { Box, Button, Card, Group, Stack, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useAtomValue } from 'jotai';
import { forwardRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { followTweeter, Tweeter } from '../../lib/api/tweeters';
import { useAuthProtected, usernameAtom } from '../../lib/state';
import UserAvatar from './UserAvatar';
import HoverButtonLink from '../other/HoverButtonLink';

interface UserBannerProps extends Tweeter {
  noLink?: boolean;
}

const UserBanner = forwardRef<HTMLDivElement, UserBannerProps>(
  ({ id, profile_name, username, tweet_count, following, noLink }, ref) => {
    const authProtected = useAuthProtected();
    const selfUsername = useAtomValue(usernameAtom);

    const formatter = Intl.NumberFormat('en', { notation: 'compact' });
    const self = username === selfUsername;

    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation(followTweeter, {
      onSuccess() {
        queryClient.invalidateQueries('tweeters');
        queryClient.invalidateQueries('tweets');
      },
      onError() {
        showNotification({
          message: "Something went wrong. The tweeter may've been deleted.",
          color: 'red',
        });
      },
    });

    return (
      <Card
        ref={ref}
        py={5}
        px={5}
        sx={(theme) => ({
          position: 'sticky',
          top: 60,
          zIndex: 100,
          backgroundColor:
            theme.colorScheme == 'dark' ? theme.colors.dark[7] : theme.white,
        })}
      >
        <Group position="apart">
          <Box sx={{ flex: 1 }}>
            <HoverButtonLink href={`/@/${username}`} noLink={noLink}>
              <Group>
                <UserAvatar username={username} />
                <Stack>
                  <Group mb={-20}>
                    <Text size="lg" weight={700}>
                      {profile_name}
                    </Text>
                    <Text color="dimmed" size="md">
                      @{username}
                    </Text>
                  </Group>
                  <Text color="dimmed">
                    {formatter.format(tweet_count)} tweets
                  </Text>
                </Stack>
              </Group>
            </HoverButtonLink>
          </Box>
          <Button
            mr={10}
            disabled={self}
            loading={isLoading}
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
      </Card>
    );
  }
);
UserBanner.displayName = 'UserBanner';

export default UserBanner;
