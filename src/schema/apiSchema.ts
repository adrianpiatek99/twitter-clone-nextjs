import { z } from "zod";

export const apiInfiniteScrollSchema = z.object({
  cursor: z.string().nullish(),
  limit: z.number().min(1).max(50).default(20)
});
