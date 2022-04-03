import { Box, TextInput } from '@mantine/core';
import { VoidFunctionComponent } from 'react';
import { Search } from 'tabler-icons-react';

interface SearchBarProps {}

const SearchBar: VoidFunctionComponent<SearchBarProps> = () => {
  return (
    <Box sx={{ width: 300 }}>
      <TextInput radius="lg" placeholder="Search" icon={<Search />} />
    </Box>
  );
};

export default SearchBar;
