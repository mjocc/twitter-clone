import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { VoidFunctionComponent } from 'react';
import { MoonStars, Sun } from 'tabler-icons-react';

interface DarkModeToggleProps {}

const DarkModeToggle: VoidFunctionComponent<DarkModeToggleProps> = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  return (
    <ActionIcon
      radius="md"
      size="lg"
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <Sun size={22} /> : <MoonStars size={22} />}
    </ActionIcon>
  );
};

export default DarkModeToggle;
