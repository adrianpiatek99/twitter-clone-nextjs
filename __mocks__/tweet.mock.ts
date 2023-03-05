import type { TweetData } from "types/tweet";

export const mockedTweet: TweetData = {
  id: "45435fghfghfgh",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tristique mi ac sem scelerisque commodo. Quisque congue aliquam justo, at rutrum ligula finibus et.",
  hashtags: [],
  media: [],
  author: {
    id: "dsfsdfsd34w55345",
    screenName: "_example",
    name: "Example Example",
    profileImageUrl: ""
  },
  likes: [],
  authorId: "dsfsdfsd34w55345",
  createdAt: new Date(),
  updatedAt: new Date(),
  _count: {
    likes: 0,
    media: 0,
    replies: 0
  }
};
