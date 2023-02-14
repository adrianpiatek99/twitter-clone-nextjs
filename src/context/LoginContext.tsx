import type { ReactNode } from "react";

import createStore from "./createStore";

const initialState = {
  email: "",
  password: "",
  isLoading: false
};

const { Provider, useStore } = createStore(initialState);

const LoginContextProvider = ({ children }: { children: ReactNode }) => {
  return <Provider>{children}</Provider>;
};

export const useLoginStore = useStore;

export default LoginContextProvider;
