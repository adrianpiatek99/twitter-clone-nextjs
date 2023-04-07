import { create } from "zustand";

export const authPageTabs = ["sign in", "sign up"] as const;

export type AuthPageTabs = typeof authPageTabs[number];

interface AuthPageStore {
  currentTab: AuthPageTabs;
  email: string;
  password: string;
  isLoading: boolean;
  setCurrentTab: (tab: AuthPageTabs) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setIsLoading: (loading: boolean) => void;
  resetStore: () => void;
}

type State = Pick<AuthPageStore, "currentTab" | "email" | "password" | "isLoading">;

const initialState: State = {
  currentTab: "sign in",
  email: "",
  password: "",
  isLoading: false
};

const useAuthPageStore = create<AuthPageStore>(set => ({
  ...initialState,
  setCurrentTab: tab => set({ currentTab: tab }),
  setEmail: email => set({ email }),
  setPassword: password => set({ password }),
  setIsLoading: isLoading => set({ isLoading }),
  resetStore: () => set({ currentTab: "sign in", email: "", password: "", isLoading: false })
}));

export default useAuthPageStore;
