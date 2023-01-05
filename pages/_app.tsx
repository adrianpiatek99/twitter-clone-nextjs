import React from "react";

import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import ReduxStoreProvider from "store/ReduxStoreProvider";
import { GlobalStyle, ThemeProvider } from "styled/theme";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <ReduxStoreProvider>
        <ThemeProvider>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </ReduxStoreProvider>
    </SessionProvider>
  );
};

export default App;
