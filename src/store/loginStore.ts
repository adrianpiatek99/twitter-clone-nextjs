import { create } from "zustand";

interface LoginStore {
  email: string;
  password: string;
  isLoading: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setIsLoading: (loading: boolean) => void;
  resetStore: () => void;
}

const initialState = {
  email: "",
  password: "",
  isLoading: false
};

const useLoginStore = create<LoginStore>(set => ({
  ...initialState,
  setEmail: email => set({ email }),
  setPassword: password => set({ password }),
  setIsLoading: isLoading => set({ isLoading }),
  resetStore: () => set({ email: "", password: "", isLoading: false })
}));

export default useLoginStore;
