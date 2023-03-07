import { TRPCError } from "@trpc/server";
import { apiInfiniteScrollSchema } from "schema/apiSchema";
import { tweetSchema } from "schema/tweetSchema";
import { z } from "zod";

import { protectedProcedure, publicProcedure, router } from "../trpc";

const include = {
  author: {
    select: {
      id: true,
      name: true,
      screenName: true,
      profileImageUrl: true
    }
  },
  media: true,
  _count: true
};

export const tweetRouter = router({
  create: protectedProcedure
    .input(
      z
        .object({
          media: z
            .object({ width: z.number(), height: z.number(), url: z.string() })
            .array()
            .optional()
        })
        .merge(tweetSchema)
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { text, media } = input;
      const userId = session.user.id;
      const textTrim = text.trim();

      if (!textTrim || textTrim.length === 0) {
        throw new TRPCError({ code: "PARSE_ERROR", message: "Tweet text is required." });
      }

      const createdTweet = await prisma.tweet.create({
        data: {
          text: textTrim,
          author: {
            connect: {
              id: userId
            }
          }
        },
        include: {
          likes: {
            where: { userId },
            select: {
              userId: true
            }
          },
          ...include
        }
      });

      const createdMedia = media
        ? await prisma.$transaction(
            media.map(image =>
              prisma.media.create({
                data: {
                  ...image,
                  tweet: {
                    connect: {
                      id: createdTweet.id
                    }
                  }
                }
              })
            )
          )
        : [];

      return { ...createdTweet, media: createdMedia };
    }),

  delete: protectedProcedure
    .input(z.object({ tweetId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { tweetId } = input;
      const userId = session.user.id;

      const deletedTweet = await prisma.tweet.delete({
        where: {
          id_authorId: {
            id: tweetId,
            authorId: userId
          }
        }
      });

      if (!deletedTweet) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Something went wrong then trying to delete tweet."
        });
      }
    }),

  details: publicProcedure
    .input(z.object({ tweetId: z.string(), screenName: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { screenName, tweetId } = input;
      const userId = ctx.session?.user?.id;

      const tweet = await prisma.tweet.findFirst({
        where: {
          id: tweetId,
          author: {
            screenName
          }
        },
        include: {
          likes: {
            where: { userId },
            select: {
              userId: true
            }
          },
          ...include
        }
      });

      if (!tweet) {
        throw new TRPCError({ code: "NOT_FOUND", message: "This tweet doesn’t exist." });
      }

      return tweet;
    }),

  like: protectedProcedure
    .input(z.object({ tweetId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { tweetId } = input;
      const userId = session.user.id;

      const like = await prisma.like.create({
        data: {
          tweet: {
            connect: {
              id: tweetId
            }
          },
          user: {
            connect: {
              id: userId
            }
          }
        }
      });

      if (!like) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Something went wrong then trying to like tweet."
        });
      }
    }),

  unlike: protectedProcedure
    .input(z.object({ tweetId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { tweetId } = input;
      const userId = session.user.id;

      const unlike = await prisma.like.delete({
        where: {
          tweetId_userId: {
            tweetId,
            userId
          }
        }
      });

      if (!unlike) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Something went wrong then trying to unlike tweet."
        });
      }
    }),

  timeline: publicProcedure.input(apiInfiniteScrollSchema).query(async ({ ctx, input }) => {
    const { prisma } = ctx;
    const { cursor, limit } = input;
    const userId = ctx.session?.user?.id;

    const tweets = await prisma.tweet.findMany({
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: [{ createdAt: "desc" }],
      include: {
        likes: {
          where: { userId },
          select: {
            userId: true
          }
        },
        ...include
      }
    });

    if (!tweets) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Can't fetch tweets." });
    }

    let nextCursor: typeof cursor | undefined = undefined;

    if (tweets.length > limit) {
      const nextItem = tweets.pop() as typeof tweets[number];

      nextCursor = nextItem.id;
    }

    return {
      tweets,
      nextCursor
    };
  }),

  profileTimeline: publicProcedure
    .input(
      apiInfiniteScrollSchema.merge(
        z.object({
          profileScreenName: z.string()
        })
      )
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { cursor, limit, profileScreenName } = input;
      const userId = ctx.session?.user?.id;

      const tweets = await prisma.tweet.findMany({
        where: { author: { screenName: profileScreenName } },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: [{ createdAt: "desc" }],
        include: {
          likes: {
            where: { userId },
            select: {
              userId: true
            }
          },
          ...include
        }
      });

      if (!tweets) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Can't fetch tweets." });
      }

      let nextCursor: typeof cursor | undefined = undefined;

      if (tweets.length > limit) {
        const nextItem = tweets.pop() as typeof tweets[number];

        nextCursor = nextItem.id;
      }

      return {
        tweets,
        nextCursor
      };
    }),

  likesTimeline: publicProcedure
    .input(
      apiInfiniteScrollSchema.merge(
        z.object({
          profileId: z.string()
        })
      )
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { cursor, limit, profileId } = input;
      const userId = ctx.session?.user?.id;

      const likedTweets = await prisma.like.findMany({
        where: {
          userId: profileId
        },
        orderBy: [{ createdAt: "desc" }],
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        include: {
          tweet: {
            include: {
              likes: {
                where: { userId },
                select: {
                  userId: true
                }
              },
              ...include
            }
          }
        }
      });

      if (!likedTweets) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Can't fetch tweets." });
      }

      let nextCursor: typeof cursor | undefined = undefined;

      if (likedTweets.length > limit) {
        const nextItem = likedTweets.pop() as typeof likedTweets[number];

        nextCursor = nextItem.id;
      }

      return {
        likedTweets,
        nextCursor
      };
    })
});
