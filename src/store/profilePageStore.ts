import { create } from "zustand";

interface ProfilePageStore {
  topBarSubheading: string;
  changeTopBarSubheading: (topBarSubheading: string) => void;
}

type State = Pick<ProfilePageStore, "topBarSubheading">;

const initialState: State = {
  topBarSubheading: ""
};

const useProfilePageStore = create<ProfilePageStore>(set => ({
  ...initialState,
  changeTopBarSubheading: topBarSubheading => set({ topBarSubheading })
}));

export default useProfilePageStore;
