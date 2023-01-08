import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    setDefaultPageFormLoading: ({ defaultPage }, { payload }: PayloadAction<boolean>) => {
      defaultPage.formLoading = payload;
    }
  }
});

export const { setDefaultPageFormLoading } = pagesSlice.actions;

export default pagesSlice.reducer;
