import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '../components/app-shell/Header';
import Navbar from '../components/app-shell/Navbar';
import AuthRouteGuard from '../components/authentication/AuthRouteGuard';
import WelcomePage from '../components/other/WelcomePage';

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
        <link rel="icon" type="image/png" href="/icon.png" />
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
            loader: 'bars',
          }}
        >
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
            <AuthRouteGuard backup={<WelcomePage />}>
              <Component {...pageProps} />
            </AuthRouteGuard>
          </AppShell>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
