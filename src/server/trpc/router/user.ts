import { TRPCError } from "@trpc/server";
import { exclude } from "prisma/prisma";
import { apiInfiniteScrollSchema } from "schema/apiSchema";
import { profileSchema } from "schema/profileSchema";
import { z } from "zod";

import { protectedProcedure, publicProcedure, router } from "../trpc";

export const userRouter = router({
  editProfile: protectedProcedure
    .input(
      z
        .object({
          profileImageUrl: z.string(),
          profileBannerUrl: z.string()
        })
        .merge(profileSchema)
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const userId = session.user.id;

      const updatedUser = await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          ...input
        }
      });

      return updatedUser;
    }),

  byScreenName: publicProcedure
    .input(z.object({ screenName: z.string() }))
    .query(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { screenName } = input;
      const userId = session?.user.id;

      const user = await prisma.user.findFirst({
        where: { screenName: { equals: screenName, mode: "insensitive" } },
        include: {
          followedBy: {
            where: { followerId: userId },
            select: {
              followerId: true
            }
          },
          _count: true
        }
      });

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "This account doesn’t exist"
        });
      }

      const userWithoutSpecificFields = exclude(user, ["password", "email"]);

      return userWithoutSpecificFields;
    }),

  follow: protectedProcedure
    .input(
      z.object({
        followUserId: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { followUserId } = input;
      const userId = session.user.id;

      if (userId === followUserId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You can't follow yourself."
        });
      }

      const follow = await prisma.follows.create({
        data: {
          following: {
            connect: {
              id: followUserId
            }
          },
          follower: {
            connect: {
              id: userId
            }
          }
        }
      });

      if (!follow) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Something went wrong then trying to follow user."
        });
      }
    }),

  unfollow: protectedProcedure
    .input(
      z.object({
        followUserId: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { followUserId } = input;
      const userId = session.user.id;

      const unfollow = await prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: userId,
            followingId: followUserId
          }
        }
      });

      if (!unfollow) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Something went wrong then trying to unfollow user."
        });
      }
    }),

  following: publicProcedure
    .input(
      apiInfiniteScrollSchema.merge(
        z.object({
          screenName: z.string()
        })
      )
    )
    .query(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { screenName, cursor, limit } = input;
      const userId = session?.user.id;

      const following = await prisma.follows.findMany({
        orderBy: [{ createdAt: "desc" }],
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          follower: {
            screenName
          }
        },
        include: {
          following: {
            select: {
              id: true,
              name: true,
              screenName: true,
              description: true,
              profileImageUrl: true,
              followedBy: {
                where: { followerId: userId },
                select: {
                  followerId: true
                }
              }
            }
          }
        }
      });

      if (!following) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Something went wrong then trying to fetch following list."
        });
      }

      let nextCursor: typeof cursor | undefined = undefined;

      if (following.length > limit) {
        const nextItem = following.pop() as typeof following[number];

        nextCursor = nextItem.id;
      }

      return { following, nextCursor };
    }),

  followers: publicProcedure
    .input(
      apiInfiniteScrollSchema.merge(
        z.object({
          screenName: z.string()
        })
      )
    )
    .query(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { screenName, cursor, limit } = input;
      const userId = session?.user.id;

      const followers = await prisma.follows.findMany({
        orderBy: [{ createdAt: "desc" }],
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: {
          following: {
            screenName
          }
        },
        include: {
          follower: {
            select: {
              id: true,
              name: true,
              screenName: true,
              description: true,
              profileImageUrl: true,
              followedBy: {
                where: { followerId: userId },
                select: {
                  followerId: true
                }
              }
            }
          }
        }
      });

      if (!followers) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Something went wrong then trying to fetch followers list."
        });
      }

      let nextCursor: typeof cursor | undefined = undefined;

      if (followers.length > limit) {
        const nextItem = followers.pop() as typeof followers[number];

        nextCursor = nextItem.id;
      }

      return { followers, nextCursor };
    })
});
