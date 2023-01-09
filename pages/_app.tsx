import React, { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "shared/Toast";
import ReduxStoreProvider from "store/ReduxStoreProvider";
import { GlobalStyle, ThemeProvider } from "styled/theme";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <ReduxStoreProvider>
          <ThemeProvider>
            <GlobalStyle />
            <Component {...pageProps} />
            <Toaster />
          </ThemeProvider>
        </ReduxStoreProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default App;
