import { Button, Center, Loader, Stack } from '@mantine/core';
import { VoidFunctionComponent } from 'react';
import { useInfiniteQuery } from 'react-query';
import { ApiResponse } from '../../lib/api';
import { GeneralQueryKey, Tweet as TweetType } from '../../lib/api/query';
import Tweet from './Tweet';

interface TweetListProps {
  queryParams: GeneralQueryKey[1];
}

const TweetList: VoidFunctionComponent<TweetListProps> = ({ queryParams }) => {
  const {
    data,
    isFetchingNextPage,
    isLoading,
    isError,
    isSuccess,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<ApiResponse<TweetType>, Error, ApiResponse<TweetType>>(
    ['/tweets', queryParams],
    {
      getNextPageParam: (lastPage) =>
        lastPage.next
          ? new URL(lastPage.next).searchParams.get('page')
          : undefined,
    }
  );
  return (
    <Stack mx="auto" sx={{ maxWidth: 550 }}>
      {isSuccess && (
        <>
          {data.pages.map((page) =>
            page.results.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)
          )}
          {hasNextPage && !isFetchingNextPage && (
            <Button variant="subtle" onClick={() => fetchNextPage()}>
              Load more tweets
            </Button>
          )}
        </>
      )}
      {(isFetchingNextPage || isLoading) && (
        <Center>
          <Loader />
        </Center>
      )}
    </Stack>
  );
};

export default TweetList;
