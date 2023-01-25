import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface SliceState {
  navDrawer: {
    isOpen: boolean;
  };
}

const initialState: SliceState = {
  navDrawer: {
    isOpen: false
  }
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setNavDrawerOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.navDrawer.isOpen = payload;
    }
  }
});

export const { setNavDrawerOpen } = modalsSlice.actions;

export default modalsSlice.reducer;
