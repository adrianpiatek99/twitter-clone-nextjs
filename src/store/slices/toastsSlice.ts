import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

export type ToastType = "success" | "information" | "error" | "warning";

export type ToastProps = {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
};

interface SliceState {
  toasts: ToastProps[];
}

const initialState: SliceState = {
  toasts: []
};

const toastsSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    addToast: (state, { payload }: PayloadAction<Omit<ToastProps, "id">>) => {
      const newToast = {
        id: v4(),
        ...payload
      };

      state.toasts = [newToast, ...state.toasts];
    },
    removeToast: (state, { payload }: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(({ id }) => id !== payload);
    },
    clearToasts: state => {
      state.toasts = [];
    }
  }
});

export const { addToast, removeToast, clearToasts } = toastsSlice.actions;

export default toastsSlice.reducer;
