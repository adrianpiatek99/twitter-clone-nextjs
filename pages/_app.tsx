import React from "react";

import ReduxStoreProvider from "store/ReduxStoreProvider";
import { ThemeProvider } from "styled/theme";

const App = () => {
  return (
    <ReduxStoreProvider>
      <ThemeProvider>
        <div>_app</div>
      </ThemeProvider>
    </ReduxStoreProvider>
  );
};

export default App;
