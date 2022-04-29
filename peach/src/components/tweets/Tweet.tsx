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
  useMantineTheme
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import dateFormat from 'dateformat';
import { useRouter } from 'next/router';
import { forwardRef, VoidFunctionComponent } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Heart } from 'tabler-icons-react';
import { likeTweet, Tweet as TweetType } from '../../lib/api/tweets';
import { useAuthProtected } from '../../lib/state';
import User from './User';

interface TweetProps extends TweetType {
  noLink?: boolean;
}

// TODO: add hashtags (in database) and ability to @

const Tweet = forwardRef<
  HTMLDivElement,
  TweetProps
>(
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
      noLink,
    },
    ref
  ) => {
    const authProtected = useAuthProtected();
    const router = useRouter();
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
          <User {...author} />
        </Box>
        <Box
          className="test"
          {...(!noLink && {
            sx: (theme) => ({
              cursor: 'pointer',
              '&:hover': { backgroundColor: theme.colors.dark[5] },
            }),
            onClick: () => router.push(`/tweet/${id}`),
          })}
        >
          <Text pb={10} size="xl">
            {text}
          </Text>
          <Text color="dimmed" size="sm" className="subTest">
            {dateFormat(created, 'h:MM TT · d mmm, yyyy')}
          </Text>
        </Box>
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
                sx={(theme) => ({
                  zIndex: 5,
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
