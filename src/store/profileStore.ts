import type { UserData } from "types/user";
import { create } from "zustand";

type ViewedProfile = Pick<UserData, "id" | "screenName">;

interface ProfileState {
  viewedProfile?: ViewedProfile;
  setViewedProfile: (profileData: ViewedProfile) => void;
}

const initialState = {
  viewedProfile: undefined
};

const useProfileStore = create<ProfileState>(set => ({
  ...initialState,
  setViewedProfile: ({ id, screenName }) => set({ viewedProfile: { id, screenName } })
}));

export default useProfileStore;
