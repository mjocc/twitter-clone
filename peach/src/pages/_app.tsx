import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { useAtomDevtools } from 'jotai/devtools';
import { useHydrateAtoms } from 'jotai/utils';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from '../components/app-shell/Header';
import Navbar from '../components/app-shell/Navbar';
import AuthRouteGuard from '../components/authentication/AuthRouteGuard';
import WelcomePage from '../components/other/WelcomePage';
import { UserInfo } from '../lib/auth';
import { userInfoAtom } from '../lib/state';

const queryClient = new QueryClient();

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value ?? (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  // @ts-ignore
  useHydrateAtoms([[userInfoAtom, props.userInfo]]);
  useAtomDevtools(userInfoAtom, 'User info');

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

      <QueryClientProvider client={queryClient}>
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
            <NotificationsProvider>
              <ModalsProvider>
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
              </ModalsProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </>
  );
}

type UserInfoCookie = Omit<UserInfo, 'loggedIn' | 'token'> & { token: string };

App.getInitialProps = async (context: any) => {
  const userInfoCookie: UserInfoCookie | undefined = JSON.parse(
    context?.ctx?.req?.cookies?.['auth-token']
  );
  if (userInfoCookie) {
    const userInfo: UserInfo = {
      ...userInfoCookie,
      token: null,
      loggedIn: true,
    };
    return { userInfo };
  }
  return { userInfo: undefined };
};
