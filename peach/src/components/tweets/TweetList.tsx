import { Alert, Box, Center, Loader, Stack } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { useEffect, VoidFunctionComponent } from 'react';
import { useInfiniteQuery } from 'react-query';
import { AlertCircle } from 'tabler-icons-react';
import { ApiResponse } from '../../lib/api';
import { GeneralQueryKey, Tweet as TweetType } from '../../lib/api/query';
import Tweet from './Tweet';

interface TweetListProps {
  filters?: GeneralQueryKey[1];
  initialData: ApiResponse<TweetType>;
}

const TweetList: VoidFunctionComponent<TweetListProps> = ({
  filters: queryParams = {},
  initialData,
}) => {
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
        lastPage?.next
          ? new URL(lastPage.next).searchParams.get('page')
          : undefined,
      initialData: {
        pages: [initialData],
        pageParams: [undefined],
      },
    }
  );

  const [ref, observer] = useIntersection();
  useEffect(() => {
    if (observer?.isIntersecting) fetchNextPage();
  }, [observer?.isIntersecting, fetchNextPage]);

  return (
    <Stack mx="auto" sx={{ maxWidth: 550 }}>
      {isError && (
        <Alert
          icon={<AlertCircle size={16} />}
          title="Something went wrong"
          color="red"
          mt="md"
        >
          Tweets could not be fetched. Please try again later.
        </Alert>
      )}
      {isSuccess && (
        <>
          {data.pages.map((page) =>
            page?.results?.map((tweet) => (
              <Tweet key={tweet.id} tweet={tweet} />
            ))
          )}
          {hasNextPage && !isFetchingNextPage && <Box ref={ref}></Box>}
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
