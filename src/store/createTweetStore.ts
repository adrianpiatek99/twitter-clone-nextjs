import { create } from "zustand";

export const CREATE_TWEET_PHOTOS_LIMIT = 4;

export type TweetMediaFile = { file: File; preview: string };

export interface CreateTweetStore {
  tweetText: string;
  tweetFiles: TweetMediaFile[];
  aspectRatio: number;
  setTweetText: (tweetText: string) => void;
  addTweetFiles: (files: File[]) => void;
  removeTweetFile: (filePreview: string) => void;
  setAspectRatio: (padding: number) => void;
  resetStore: () => void;
}

type State = Pick<CreateTweetStore, "tweetText" | "tweetFiles" | "aspectRatio">;

const initialState: State = {
  tweetText: "",
  aspectRatio: 0,
  tweetFiles: []
};

const createTweetStore = create<CreateTweetStore>((set, get) => ({
  ...initialState,
  setTweetText: tweetText =>
    set({
      tweetText
    }),
  addTweetFiles: files =>
    set(state => ({
      tweetFiles: [
        ...state.tweetFiles,
        ...files.map(file => ({
          file,
          preview: URL.createObjectURL(file)
        }))
      ].slice(0, CREATE_TWEET_PHOTOS_LIMIT)
    })),
  removeTweetFile: filePreview => {
    const tweetFiles = get().tweetFiles;

    if (tweetFiles.length === 1) {
      set({ aspectRatio: 0 });
    }

    set(state => ({
      tweetFiles: state.tweetFiles.filter(file => file.preview !== filePreview)
    }));
  },
  setAspectRatio: aspectRatio => set({ aspectRatio }),
  resetStore: () => set({ tweetText: "", tweetFiles: [] })
}));

export default createTweetStore;
