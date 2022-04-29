import { Autocomplete, Box } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useState, VoidFunctionComponent } from 'react';
import { useQuery } from 'react-query';
import { Search } from 'tabler-icons-react';
import { fetchTweeters, Tweeter } from '../../lib/api/tweeters';
import SearchBarItem from './SearchBarItem';

interface SearchBarProps {}

interface TweeterWithValue extends Tweeter {
  value: string;
}

const SearchBar: VoidFunctionComponent<SearchBarProps> = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [debounced] = useDebouncedValue(query, 100, { leading: true });

  const { data, isSuccess, isError } = useQuery(
    ['tweeters', { query: debounced }],
    async () => (await fetchTweeters({ search: debounced })).data
  );

  let autocompleteData;
  if (isSuccess) {
    autocompleteData = data.results.map((result) => ({
      value: result.username,
      ...result,
    }));
  }

  return (
    <Box sx={{ width: 300 }}>
      <Autocomplete
        value={query}
        onChange={setQuery}
        required
        radius="lg"
        placeholder="Search"
        aria-label="search bar"
        icon={<Search size={20} />}
        itemComponent={SearchBarItem}
        data={autocompleteData ?? []}
        filter={(value, item) =>
          item.value.toLowerCase().includes(value.toLowerCase().trim()) ||
          item.profile_name.toLowerCase().includes(value.toLowerCase().trim())
        }
        nothingFound="No tweeters found"
        limit={7}
        error={isError}
        onItemSubmit={({ username }: TweeterWithValue) =>
          router.push(`/@/${username}`)
        }
      />
    </Box>
  );
};

export default SearchBar;
