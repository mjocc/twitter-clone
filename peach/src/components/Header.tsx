import { ActionIcon, Group, Header as MantineHeader } from '@mantine/core';
import { useAtomValue } from 'jotai';
import { VoidFunctionComponent } from 'react';
import { authenticatedAtom } from '../state';
import AuthButtons from './authentication/AuthButtons';
import DarkModeToggle from './DarkModeToggle';

interface HeaderProps {}

const Header: VoidFunctionComponent<HeaderProps> = () => {
  const authenticated = useAtomValue(authenticatedAtom);
  return (
    <MantineHeader height={60} p="xs">
      <Group sx={{ height: '100%' }} px={20} position="apart">
        <DarkModeToggle />
        {!authenticated && <AuthButtons />}
      </Group>
    </MantineHeader>
  );
};

export default Header;
