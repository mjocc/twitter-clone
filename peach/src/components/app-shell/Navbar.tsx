import { Box, Navbar as MNavbar, Overlay } from '@mantine/core';
import { useAtomValue } from 'jotai';
import { VoidFunctionComponent } from 'react';
import { Adjustments, Home, User as UserIcon, Users } from 'tabler-icons-react';
import { authenticatedAtom, usernameAtom } from '../../lib/state';
import NavbarLink from './NavbarLink';
import NavbarUser from './NavbarUser';

interface NavbarProps {}

const Navbar: VoidFunctionComponent<NavbarProps> = () => {
  const username = useAtomValue(usernameAtom);
  const authenticated = useAtomValue(authenticatedAtom);

  return (
    <Box sx={{ position: 'relative' }}>
      <MNavbar
        width={{ base: 300 }}
        p="xs"
        fixed
        position={{ top: 0, left: 0 }}
        sx={authenticated ? {} : { opacity: 0.6, pointerEvents: 'none' }}
      >
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
          <NavbarUser />
        </MNavbar.Section>
      </MNavbar>
    </Box>
  );
};

export default Navbar;
