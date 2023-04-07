import { create } from "zustand";

interface TweetPageStore {
  referer: string;
  setReferer: (referer: string) => void;
}

type State = Pick<TweetPageStore, "referer">;

const initialState: State = {
  referer: "/home"
};

const useTweetPageStore = create<TweetPageStore>(set => ({
  ...initialState,
  setReferer: referer => set({ referer })
}));

export default useTweetPageStore;
