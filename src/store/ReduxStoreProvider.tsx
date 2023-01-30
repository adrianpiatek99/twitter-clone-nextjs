import type { ReactNode } from "react";
import React from "react";
import { Provider } from "react-redux";

import { store } from "./store";

interface ReduxStoreProviderProps {
  children: ReactNode;
}

const ReduxStoreProvider = ({ children }: ReduxStoreProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxStoreProvider;
