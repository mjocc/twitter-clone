import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import { VoidFunctionComponent } from 'react';

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
  return (
    <Link href={href} passHref>
      <UnstyledButton
        component="a"
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        })}
      >
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>

          <Text size="sm">{label}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
};

export default NavbarLink;
