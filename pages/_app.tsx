import React, { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "components/layout";
import { useScrollRestoration } from "hooks/useScrollRestoration";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "shared/Toast";
import ReduxStoreProvider from "store/ReduxStoreProvider";
import { GlobalStyle, ThemeProvider } from "styled/theme";

const App = ({ Component, pageProps: { session, ...pageProps }, router }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  useScrollRestoration(router);

  return (
    <>
      <Head>
        <title>Twitter</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <ReduxStoreProvider>
            <ThemeProvider>
              <GlobalStyle />
              <Layout>
                <Component {...pageProps} />
              </Layout>
              <Toaster />
            </ThemeProvider>
          </ReduxStoreProvider>
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
