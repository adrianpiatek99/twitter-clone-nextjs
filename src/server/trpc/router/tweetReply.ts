import { TRPCError } from "@trpc/server";
import { apiInfiniteScrollSchema } from "schema/apiSchema";
import { replySchema } from "schema/replySchema";
import { z } from "zod";

import { protectedProcedure, publicProcedure, router } from "../trpc";

export const tweetReplyRouter = router({
  create: protectedProcedure
    .input(z.object({ tweetId: z.string() }).merge(replySchema))
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { tweetId, text } = input;
      const userId = session.user.id;
      const textTrim = text.trim();

      if (!textTrim || textTrim.length === 0) {
        throw new TRPCError({ code: "PARSE_ERROR", message: "Tweet text is required." });
      }

      const reply = await prisma.tweetReply.create({
        data: {
          text,
          tweet: {
            connect: {
              id: tweetId
            }
          },
          author: {
            connect: {
              id: userId
            }
          }
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              screenName: true,
              profileImageUrl: true
            }
          },
          tweet: {
            select: {
              author: {
                select: {
                  id: true,
                  name: true,
                  screenName: true,
                  profileImageUrl: true
                }
              }
            }
          }
        }
      });

      if (!reply) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Something went wrong then trying to reply tweet."
        });
      }

      return reply;
    }),

  replies: publicProcedure
    .input(
      apiInfiniteScrollSchema.merge(
        z.object({
          tweetId: z.string()
        })
      )
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { cursor, limit, tweetId } = input;

      const replies = await prisma.tweetReply.findMany({
        where: {
          tweetId
        },
        orderBy: [{ createdAt: "desc" }],
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              screenName: true,
              profileImageUrl: true
            }
          },
          tweet: {
            select: {
              author: {
                select: {
                  id: true,
                  name: true,
                  screenName: true,
                  profileImageUrl: true
                }
              }
            }
          }
        }
      });

      if (!replies) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Can't fetch replies."
        });
      }

      if (!replies) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Can't fetch tweets." });
      }

      let nextCursor: typeof cursor | undefined = undefined;

      if (replies.length > limit) {
        const nextItem = replies.pop() as typeof replies[number];

        nextCursor = nextItem.id;
      }

      return {
        replies,
        nextCursor
      };
    })
});
