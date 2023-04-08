import { HOME_PAGE_ROUTE } from "constants/routes";
import { create } from "zustand";

interface TweetPageStore {
  referer: string;
  setReferer: (referer: string) => void;
}

type State = Pick<TweetPageStore, "referer">;

const initialState: State = {
  referer: HOME_PAGE_ROUTE
};

const useTweetPageStore = create<TweetPageStore>(set => ({
  ...initialState,
  setReferer: referer => set({ referer })
}));

export default useTweetPageStore;
