import React, { FC, ReactElement } from "react";
import { Provider } from "react-redux";

import { store } from "./store";

interface ReduxStoreProviderProps {
  children: ReactElement;
}

const ReduxStoreProvider: FC<ReduxStoreProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxStoreProvider;
