import {
  Box,
  Button,
  Card,
  Center,
  Divider,
  Group,
  LoadingOverlay,
  Text,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import dateFormat from 'dateformat';
import { forwardRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Heart } from 'tabler-icons-react';
import { useAuthProtected } from '../../lib/state';
import { Tweet as TweetType } from '../../lib/api/tweet';
import { likeTweet } from '../../lib/api/tweet';
import User from './User';

interface TweetProps extends TweetType {}

const Tweet = forwardRef<HTMLDivElement, TweetProps>(
  (
    {
      text,
      author,
      created,
      like_count,
      reply_count,
      liked,
      id,
      replied_tweet,
      reply,
    },
    ref
  ) => {
    const authProtected = useAuthProtected();
    const { colors } = useMantineTheme();
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation(likeTweet, {
      onSuccess() {
        //TODO: go through all invalidate queries and make them more specific (replace general query function?)
        //TODO: use returned data to update value?
        queryClient.invalidateQueries('tweets');
      },
      onError() {
        showNotification({
          message: "Something went wrong. The tweet may've been deleted.",
          color: 'red',
        });
      },
    });

    return (
      <Card shadow="sm" ref={ref}>
        <Box pb={10}>
          <User user={author} />
        </Box>
        <Text pb={10} size="xl">
          {text}
        </Text>
        <Text color="dimmed" size="sm">
          {dateFormat(created, 'h:MM TT · d mmm, yyyy')}
        </Text>
        <Divider my={10} />
        <Group>
          <Group spacing={5}>
            <Text weight={700}>{like_count}</Text>
            <Text>{like_count === 1 ? 'like' : 'likes'}</Text>
          </Group>
          <Group spacing={5}>
            <Text weight={700}>{reply_count}</Text>
            <Text>replies</Text>
          </Group>
        </Group>
        <Divider mt={10} />
        <Card.Section>
          <Group p={6} position="center">
            <LoadingOverlay visible={isLoading} zIndex={5} />
            <Tooltip
              position="bottom"
              label={liked ? 'Unlike' : 'Like'}
              withArrow
              mb={-4.65}
            >
              <Button
                variant="subtle"
                color="pink"
                radius={100}
                compact
                //TODO: make this styling work in light mode
                sx={(theme) => ({
                  height: 38.5,
                  width: 38.5,
                  color: liked
                    ? theme.colors.pink[7]
                    : theme.colorScheme === 'dark'
                    ? theme.colors.gray[0]
                    : theme.colors.gray[4],
                  '&:hover': {
                    color: theme.colors.pink[7],
                  },
                })}
                onClick={() =>
                  authProtected('like a tweet', () =>
                    mutate({ tweetId: id, liked: !liked })
                  )
                }
              >
                <Center sx={(theme) => theme.fn.cover()}>
                  <Heart fill={colors.pink[7]} fillOpacity={liked ? 1 : 0} />
                </Center>
              </Button>
            </Tooltip>
          </Group>
        </Card.Section>
      </Card>
    );
  }
);
Tweet.displayName = 'Tweet';

export default Tweet;
