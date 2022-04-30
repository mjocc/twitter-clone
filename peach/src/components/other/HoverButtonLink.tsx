import { Box, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import { FunctionComponent } from 'react';

interface HoverButtonLinkProps {
  href: string;
  active?: boolean;
  noLink?: boolean;
}

const HoverButtonLink: FunctionComponent<HoverButtonLinkProps> = ({
  href,
  active,
  noLink,
  children,
}) => {
  return noLink ? (
    <Box p={10}>{children}</Box>
  ) : (
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
          ...(active
            ? {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[8]
                    : theme.colors.gray[2],
              }
            : {}),
        })}
      >
        {children}
      </UnstyledButton>
    </Link>
  );
};

export default HoverButtonLink;
