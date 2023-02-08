import type { User } from "@prisma/client";
import type { Session } from "next-auth";

export const mockedUser: User = {
  id: "34534dfgdfgdfg435435",
  screenName: "_example",
  name: "Example Example",
  email: "name@example.com",
  password: "examplePassword!",
  profileImageUrl: "",
  profileBannerUrl: "",
  description: "",
  role: "USER",
  url: "",
  emailVerified: null,
  createdAt: new Date(),
  updatedAt: new Date()
};

export const mockedSession: Session = {
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  user: {
    ...mockedUser,
    followedBy: [],
    _count: {
      likes: 0,
      tweets: 0,
      followedBy: 0,
      following: 0
    }
  }
};
