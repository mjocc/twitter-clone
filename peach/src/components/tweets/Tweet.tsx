import { Box, Card, Divider, Group, Paper, Text } from '@mantine/core';
import { VoidFunctionComponent } from 'react';
import { Tweet as TweetType } from '../../lib/api/query';
import dateFormat from 'dateformat';
import User from './User';

interface TweetProps {
  tweet: TweetType;
}

const Tweet: VoidFunctionComponent<TweetProps> = ({ tweet }) => {
  return (
    <Card shadow="sm">
      <Box pb={10}>
        <User user={tweet.author} />
      </Box>
      <Text py={10} size="xl">
        {tweet.text}
      </Text>
      <Text color="dimmed" size="sm">
        {dateFormat(tweet.created, 'h:MM TT · d mmm, yyyy')}
      </Text>
      <Divider my={5}/>
      <Group>
        <Group spacing={5}>
          <Text weight={700}>{tweet.like_count}</Text>
          <Text>likes</Text>
        </Group>
        <Group spacing={5}>
          <Text weight={700}>{tweet.reply_count}</Text>
          <Text>replies</Text>
        </Group>
      </Group>
    </Card>
  );
};

export default Tweet;
