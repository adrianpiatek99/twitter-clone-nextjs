import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface SliceState {
  isNavDrawerOpen: boolean;
  isAuthRequiredModalOpen: boolean;
}

const initialState: SliceState = {
  isNavDrawerOpen: false,
  isAuthRequiredModalOpen: false
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setNavDrawerOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isNavDrawerOpen = payload;
    },
    setAuthRequiredModalOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuthRequiredModalOpen = payload;
    }
  }
});

export const { setNavDrawerOpen, setAuthRequiredModalOpen } = globalSlice.actions;

export default globalSlice.reducer;
