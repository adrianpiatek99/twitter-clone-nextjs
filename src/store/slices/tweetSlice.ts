import { createSlice } from "@reduxjs/toolkit";

interface TweetStateData {
  loading: boolean;
  error: unknown;
}

const initialState: TweetStateData = {
  loading: false,
  error: null
};

const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {}
});

export default tweetSlice.reducer;
