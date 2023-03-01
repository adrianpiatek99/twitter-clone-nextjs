import React from "react";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Layout } from "components/layout";
import { useScrollRestoration } from "hooks/useScrollRestoration";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "shared/Toast";
import { GlobalStyle, ThemeProvider } from "src/theme";
import { api } from "utils/api";

const App = ({ Component, pageProps: { session, ...pageProps }, router }: AppProps) => {
  useScrollRestoration(router);

  return (
    <>
      <Head>
        <title>Twitter</title>
      </Head>
      <SessionProvider session={session}>
        <ThemeProvider>
          <GlobalStyle />
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Toaster />
        </ThemeProvider>
      </SessionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default api.withTRPC(App);
