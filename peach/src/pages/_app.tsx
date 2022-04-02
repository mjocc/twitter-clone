import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  TypographyStylesProvider
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value ?? (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme,
          }}
        >
          <TypographyStylesProvider>
            <AppShell
              padding="md"
              navbar={<Navbar />}
              header={<Header />}
              styles={(theme) => ({
                main: {
                  backgroundColor:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[8]
                      : theme.colors.gray[0],
                },
              })}
            >
              <Component {...pageProps} />
            </AppShell>
          </TypographyStylesProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
