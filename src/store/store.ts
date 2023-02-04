import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import modalsSlice from "./slices/modalsSlice";
import toastsSlice from "./slices/toastsSlice";

const reducer = combineReducers({
  toasts: toastsSlice,
  modals: modalsSlice
});

export const store = configureStore({ reducer });

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
