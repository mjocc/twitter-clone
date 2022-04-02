import { Navbar as MantineNavbar } from '@mantine/core';
import { VoidFunctionComponent } from 'react';

interface NavbarProps {}

const Navbar: VoidFunctionComponent<NavbarProps> = () => {
  return (
    <MantineNavbar width={{ base: 300 }} height={500} p="xs">
      {/* <Navbar.Section grow mt="xs">
        <MainLinks />
      </Navbar.Section>
      <Navbar.Section>
        <User />
      </Navbar.Section> */}
    </MantineNavbar>
  );
};

export default Navbar;
