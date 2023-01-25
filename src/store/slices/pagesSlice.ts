import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface SliceState {
  defaultPage: {
    formLoading: boolean;
  };
}

const initialState: SliceState = {
  defaultPage: {
    formLoading: false
  }
};

const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    setDefaultPageFormLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.defaultPage.formLoading = payload;
    }
  }
});

export const { setDefaultPageFormLoading } = pagesSlice.actions;

export default pagesSlice.reducer;
