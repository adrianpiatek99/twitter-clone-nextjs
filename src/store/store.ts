import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import pagesSlice from "./slices/pagesSlice";
import toastsSlice from "./slices/toastsSlice";

const reducer = combineReducers({
  pages: pagesSlice,
  toasts: toastsSlice
});

export const store = configureStore({ reducer });

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
