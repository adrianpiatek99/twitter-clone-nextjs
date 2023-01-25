import React, { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import ReduxStoreProvider from "store/ReduxStoreProvider";
import { GlobalStyle, ThemeProvider } from "styled/theme";
import Layout from "templates/layout";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <ReduxStoreProvider>
          <ThemeProvider>
            <GlobalStyle />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </ReduxStoreProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default App;
