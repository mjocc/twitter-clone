import { Box, Navbar as MNavbar, Overlay } from '@mantine/core';
import { useAtomValue } from 'jotai';
import { VoidFunctionComponent } from 'react';
import { Adjustments, Home, User as UserIcon, Users } from 'tabler-icons-react';
import { authenticatedAtom, usernameAtom } from '../../state';
import NavbarLink from './NavbarLink';
import User from './User';

interface NavbarProps {}

const Navbar: VoidFunctionComponent<NavbarProps> = () => {
  const username = useAtomValue(usernameAtom);
  const authenticated = useAtomValue(authenticatedAtom);

  return (
    <Box sx={{ position: 'relative' }}>
      {!authenticated && <Overlay opacity={0.5} color="#000000" zIndex={5} />}
      <MNavbar width={{ base: 300 }} p="xs">
        <MNavbar.Section grow mt="xs">
          <NavbarLink
            icon={<Home size={16} />}
            color="blue"
            label="Home"
            href="/"
          />
          <NavbarLink
            icon={<UserIcon size={16} />}
            color="teal"
            label="Profile"
            href={`/@/${username}`}
          />
          <NavbarLink
            icon={<Users size={16} />}
            color="violet"
            label="Following"
            href="/following"
          />
          <NavbarLink
            icon={<Adjustments size={16} />}
            color="grape"
            label="Manage account"
            href="/account"
          />
        </MNavbar.Section>
        <MNavbar.Section>
          <User />
        </MNavbar.Section>
      </MNavbar>
    </Box>
  );
};

export default Navbar;
