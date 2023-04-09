import { create } from "zustand";

interface GlobalStore {
  isNavDrawerOpen: boolean;
  isAuthRequiredModalOpen: boolean;
  openNavDrawer: (isOpen: boolean) => void;
  openAuthRequiredModal: (isOpen: boolean) => void;
}

type State = Pick<GlobalStore, "isNavDrawerOpen" | "isAuthRequiredModalOpen">;

const initialState: State = {
  isNavDrawerOpen: false,
  isAuthRequiredModalOpen: false
};

const useGlobalStore = create<GlobalStore>(set => ({
  ...initialState,
  openNavDrawer: isOpen => set({ isNavDrawerOpen: isOpen }),
  openAuthRequiredModal: isOpen => set({ isAuthRequiredModalOpen: isOpen })
}));

export default useGlobalStore;
