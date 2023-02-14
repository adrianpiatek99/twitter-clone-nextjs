import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import globalSlice from "./slices/globalSlice";
import toastsSlice from "./slices/toastsSlice";

const reducer = combineReducers({
  global: globalSlice,
  toasts: toastsSlice
});

export const store = configureStore({ reducer });

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
