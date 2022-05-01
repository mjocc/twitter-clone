import { Alert, Center, Loader, Stack } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { useEffect, VoidFunctionComponent } from 'react';
import { useInfiniteQuery } from 'react-query';
import { AlertCircle } from 'tabler-icons-react';
import { api, ApiResponse } from '../../lib/api';
import {
  fetchTweeters,
  Tweeter,
  TweeterFilters,
} from '../../lib/api/tweeters';
import ScrollToTopButton from '../other/ScrollToTopButton';
import UserBanner from './UserBanner'

interface TweeterListProps {
  filters?: TweeterFilters;
  initialData?: ApiResponse<Tweeter>;
}

// TODO: merge with tweet list into one generic component?

const TweeterList: VoidFunctionComponent<TweeterListProps> = ({
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
    ['tweeters', { filters }],
    async ({ pageParam = 1 }) =>
      (await fetchTweeters({ page: pageParam, ...filters })).data,
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
      <Stack mx="auto">
        {isError && (
          <Alert
            icon={<AlertCircle size={16} />}
            title="Something went wrong"
            color="red"
            mt="md"
          >
            Tweeters could not be fetched. Please try again later.
          </Alert>
        )}
        {/* //TODO: add no tweeters message if none are found */}
        {isSuccess && (
          <>
            {data.pages.map((page) =>
              page?.results?.map((tweeter, i, tweeterPage) => {
                const last = i + 1 === tweeterPage.length;
                return (
                  <UserBanner
                    ref={last ? ref : undefined}
                    key={tweeter.id}
                    {...tweeter}
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

export default TweeterList;
