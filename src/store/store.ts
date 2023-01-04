import { combineReducers, configureStore } from "@reduxjs/toolkit";

import tweetSlice from "./slices/tweetSlice";

const reducer = combineReducers({
  tweet: tweetSlice
});

export const store = configureStore({ reducer });
