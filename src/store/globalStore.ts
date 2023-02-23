import { create } from "zustand";

interface GlobalState {
  isNavDrawerOpen: boolean;
  isAuthRequiredModalOpen: boolean;
  openNavDrawer: (isOpen: boolean) => void;
  openAuthRequiredModal: (isOpen: boolean) => void;
}

const initialState = {
  isNavDrawerOpen: false,
  isAuthRequiredModalOpen: false
};

const useGlobalStore = create<GlobalState>(set => ({
  ...initialState,
  openNavDrawer: isOpen => set({ isNavDrawerOpen: isOpen }),
  openAuthRequiredModal: isOpen => set({ isAuthRequiredModalOpen: isOpen })
}));

export default useGlobalStore;
