import type { UserData } from "types/user";
import { create } from "zustand";

type ViewedProfile = Pick<UserData, "id" | "screenName">;

interface ProfileStore {
  viewedProfile?: ViewedProfile;
  setViewedProfile: (profileData: ViewedProfile) => void;
}

type State = Pick<ProfileStore, "viewedProfile">;

const initialState: State = {
  viewedProfile: undefined
};

const useProfileStore = create<ProfileStore>(set => ({
  ...initialState,
  setViewedProfile: ({ id, screenName }) => set({ viewedProfile: { id, screenName } })
}));

export default useProfileStore;
