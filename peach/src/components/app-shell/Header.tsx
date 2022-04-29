import {
  Container,
  Group,
  Header as MantineHeader,
  Title,
  UnstyledButton,
} from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { VoidFunctionComponent } from 'react';
import icon from '../../../public/icon.png';
import AuthButtons from '../authentication/AuthButtons';
import AuthDrawer from '../authentication/AuthDrawer';
import DarkModeToggle from './DarkModeToggle';
import SearchBar from './SearchBar';

interface HeaderProps {}

const Header: VoidFunctionComponent<HeaderProps> = () => {
  return (
    <>
      <MantineHeader
        height={61}
        p="sm"
        fixed
        position={{ top: 0, left: 0 }}
        sx={{ width: '100vw' }}
      >
        <Container fluid>
          <Group px={20} position="apart">
            <Link href="/" passHref>
              <UnstyledButton component="a">
                <Group>
                  <Image src={icon} height={32} width={32} alt="twitter logo" />
                  <Title order={3} m={0}>
                    Twitter
                  </Title>
                </Group>
              </UnstyledButton>
            </Link>
            <Group spacing={30} ml={'auto'}>
              <SearchBar />
              <AuthButtons />
              <DarkModeToggle />
            </Group>
          </Group>
        </Container>
      </MantineHeader>
      <AuthDrawer />
    </>
  );
};

export default Header;
