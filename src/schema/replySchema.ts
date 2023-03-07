import { z } from "zod";

export type ReplyValues = z.infer<typeof replySchema>;

export const REPLY_MAX_LENGTH = 280;

export const replySchema = z.object({
  text: z
    .string()
    .max(REPLY_MAX_LENGTH, `Reply text can't have more than ${REPLY_MAX_LENGTH} characters.`)
});
