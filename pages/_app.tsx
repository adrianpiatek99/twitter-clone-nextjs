import React from "react";

import { AppProps } from "next/app";
import ReduxStoreProvider from "store/ReduxStoreProvider";
import { GlobalStyle, ThemeProvider } from "styled/theme";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ReduxStoreProvider>
      <ThemeProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </ReduxStoreProvider>
  );
};

export default App;
