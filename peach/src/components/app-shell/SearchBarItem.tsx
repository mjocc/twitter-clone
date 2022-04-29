import { Box } from '@mantine/core';
import { forwardRef, VoidFunctionComponent } from 'react';
import User from '../tweets/User';

interface SearchBarItemProps {
  username: string;
  profile_name: string;
}

const SearchBarItem: VoidFunctionComponent<SearchBarItemProps> = forwardRef<
  HTMLDivElement,
  SearchBarItemProps
>(({ username, profile_name, ...others }, ref) => {
  return (
    <Box ref={ref} p={5} {...others}>
      <User {...{ username, profile_name }} noLink />
    </Box>
  );
});
SearchBarItem.displayName = 'SearchBarItem';

export default SearchBarItem;
