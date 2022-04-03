import {
  Anchor,
  Group,
  Header as MantineHeader,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { VoidFunctionComponent } from 'react';
import icon from '../../../public/icon.png';
import { authenticatedAtom } from '../../state';
import AuthButtons from '../authentication/AuthButtons';
import AuthDrawer from '../authentication/AuthDrawer';
import DarkModeToggle from './DarkModeToggle';
import SearchBar from './SearchBar';

interface HeaderProps {}

const Header: VoidFunctionComponent<HeaderProps> = () => {
  const authenticated = useAtomValue(authenticatedAtom);
  return (
    <>
      <MantineHeader height={60} p="xs">
        <Group sx={{ height: '100%' }} px={20} position="apart">
          <Link href="/" passHref>
            <UnstyledButton component="a">
              <Group>
                <Image src={icon} height={32} width={32} />
                <Title order={3} m={0}>
                  Twitter
                </Title>
              </Group>
            </UnstyledButton>
          </Link>
          <Group spacing={30} ml={'auto'}>
            <SearchBar />
            {!authenticated && <AuthButtons />}
            <DarkModeToggle />
          </Group>
        </Group>
      </MantineHeader>
      <AuthDrawer />
    </>
  );
};

export default Header;
