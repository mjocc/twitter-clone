import {
  Box,
  Button,
  Card,
  Center,
  Divider,
  Group, Text,
  Tooltip,
  useMantineTheme
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import dateFormat from 'dateformat';
import { forwardRef, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Heart } from 'tabler-icons-react';
import { likeTweet, Tweet as TweetType } from '../../lib/api/tweets';
import { useAuthProtected } from '../../lib/state';
import HoverButtonLink from '../other/HoverButtonLink';
import User from '../tweeter/User';

interface TweetProps extends TweetType {
  noLink?: boolean;
}

// TODO: add hashtags (in database) and ability to @

const Tweet = forwardRef<HTMLDivElement, TweetProps>(
  (
    {
      text,
      author,
      created,
      like_count: propLikeCount,
      reply_count,
      liked: propLiked,
      id,
      replied_tweet,
      reply,
      noLink,
    },
    ref
  ) => {
    const authProtected = useAuthProtected();
    const { colors } = useMantineTheme();

    const [forceLike, setForceLike] = useState<boolean | null>(null);
    const liked = forceLike === null ? propLiked : forceLike;
    const like_count =
      forceLike === null
        ? propLikeCount
        : forceLike
        ? propLikeCount + 1
        : propLikeCount - 1;
    useEffect(() => {
      setForceLike(null);
    }, [propLiked, propLikeCount, setForceLike]);

    const queryClient = useQueryClient();
    const { mutate } = useMutation(likeTweet, {
      onMutate({ liked }) {
        setForceLike(liked);
      },
      onSuccess() {
        //TODO: go through all invalidate queries and make them more specific (replace general query function?)
        //TODO: use returned data to update value?
        setTimeout(() => {
          queryClient.invalidateQueries('tweets');
        }, 1000);
      },
      onError() {
        setForceLike(null);
        showNotification({
          message: "Something went wrong. The tweet may've been deleted.",
          color: 'red',
        });
      },
    });

    return (
      <Card
        shadow="sm"
        ref={ref}
        p={6}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[7]
              : theme.colors.white,
        })}
      >
        <HoverButtonLink href={`/@/${author.username}`}>
          <User {...author} />
        </HoverButtonLink>
        <HoverButtonLink href={`/tweet/${id}`} noLink={noLink}>
          <Text mt={-5} pb={10} size="xl">
            {text}
          </Text>
          <Text color="dimmed" size="sm" className="subTest">
            {dateFormat(created, 'h:MM TT · d mmm, yyyy')}
          </Text>
        </HoverButtonLink>
        <Box mt={-10} px={10}>
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
        </Box>
        <Card.Section>
          <Group p={6} position="center">
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
                    ? theme.colors.dark[0]
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
