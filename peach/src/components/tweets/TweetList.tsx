import { Alert, Center, Loader, Stack } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { useEffect, VoidFunctionComponent } from 'react';
import { useInfiniteQuery } from 'react-query';
import { AlertCircle } from 'tabler-icons-react';
import { api, ApiResponse } from '../../lib/api';
import {
  fetchTweets,
  Tweet as TweetType,
  TweetFilters,
} from '../../lib/api/tweet';
import ScrollToTopButton from '../other/ScrollToTopButton';
import Tweet from './Tweet';

interface TweetListProps {
  filters?: TweetFilters;
  initialData?: ApiResponse<TweetType>;
}

const TweetList: VoidFunctionComponent<TweetListProps> = ({
  filters,
  initialData,
}) => {
  const {
    data,
    isFetchingNextPage,
    isLoading,
    isError,
    isSuccess,
    fetchNextPage,
  } = useInfiniteQuery(
    ['tweets', { filters }],
    async ({ pageParam = 1 }) =>
      (await fetchTweets({ page: pageParam, ...filters })).data,
    {
      getNextPageParam: (lastPage) =>
        lastPage.next
          ? new URL(lastPage.next).searchParams.get('page')
          : undefined,
      initialData: initialData
        ? {
            pages: [initialData],
            pageParams: [undefined],
          }
        : undefined,
    }
  );

  const [ref, observer] = useIntersection();
  useEffect(() => {
    if (observer?.isIntersecting) fetchNextPage();
  }, [observer?.isIntersecting, fetchNextPage]);

  return (
    <>
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
        {/* //TODO: add no tweets message if none are found */}
        {isSuccess && (
          <>
            {data.pages.map((page) =>
              page?.results?.map((tweet, i, tweetPage) => {
                const last = i + 1 === tweetPage.length;
                return (
                  <Tweet
                    ref={last ? ref : undefined}
                    key={tweet.id}
                    {...tweet}
                  />
                );
              })
            )}
          </>
        )}
        {(isFetchingNextPage || isLoading) && (
          <Center>
            <Loader />
          </Center>
        )}
      </Stack>
      <ScrollToTopButton />
    </>
  );
};

export default TweetList;
