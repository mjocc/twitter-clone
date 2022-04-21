import {
  Box,
  Button,
  Card,
  Divider,
  Group,
  LoadingOverlay,
  Text,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import dateFormat from 'dateformat';
import { forwardRef, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Heart } from 'tabler-icons-react';
import { Tweet as TweetType } from '../../lib/api/query';
import { likeTweet } from '../../lib/api/tweet';
import User from './User';

interface TweetProps {
  tweet: TweetType;
}

const Tweet = forwardRef<HTMLDivElement, TweetProps>(({ tweet }, ref) => {
  const queryClient = useQueryClient()
  // TODO: type this properly
  const { mutate, isLoading, isError } =
    useMutation(likeTweet, {onSuccess() {
      queryClient.invalidateQueries('/tweets')
    }});

  useEffect(() => {
    if (isError) {
      showNotification({
        message: "Something went wrong. The tweet may've been deleted.",
        color: 'red',
      });
    }
  }, [isError]);

  return (
    <Card shadow="sm" ref={ref}>
      <Box pb={10}>
        <User user={tweet.author} />
      </Box>
      <Text pb={10} size="xl">
        {tweet.text}
      </Text>
      <Text color="dimmed" size="sm">
        {dateFormat(tweet.created, 'h:MM TT · d mmm, yyyy')}
      </Text>
      <Divider my={10} />
      <Group>
        <Group spacing={5}>
          <Text weight={700}>{tweet.like_count}</Text>
          <Text>{tweet.like_count === 1 ? 'like' : 'likes'}</Text>
        </Group>
        <Group spacing={5}>
          <Text weight={700}>{tweet.reply_count}</Text>
          <Text>replies</Text>
        </Group>
      </Group>
      <Divider mt={10} mb={7.5} />
      <Group position="center">
        <LoadingOverlay visible={isLoading} />
        <Button
          variant="subtle"
          color="pink"
          radius={100}
          compact
          mb={-7.5}
          sx={(theme) => ({
            height: 38.5,
            width: 38.5,
            color: tweet.liked ? theme.colors.pink[9] : theme.colors.gray[0],
            '&:hover': {
              color: theme.colors.pink[2],
            },
          })}
          onClick={() => {
            mutate({ tweetId: tweet.id, liked: !tweet.liked });
          }}
        >
          <Heart />
        </Button>
      </Group>
    </Card>
  );
});
Tweet.displayName = 'Tweet';

export default Tweet;
