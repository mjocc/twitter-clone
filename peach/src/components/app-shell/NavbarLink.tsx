import { Group, Text, ThemeIcon } from '@mantine/core';
import { useRouter } from 'next/router';
import { VoidFunctionComponent } from 'react';
import HoverButtonLink from '../other/HoverButtonLink';

interface NavbarLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  href: string;
}

const NavbarLink: VoidFunctionComponent<NavbarLinkProps> = ({
  icon,
  color,
  label,
  href,
}) => {
  const router = useRouter();

  return (
    <HoverButtonLink
      href={href}
      active={router.asPath.replace(/#.*$/, '') === href}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </HoverButtonLink>
  );
};

export default NavbarLink;
