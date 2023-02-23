import { z } from "zod";

import { PROFILE_NAME_MAX_LENGTH } from "./authSchema";

export const PROFILE_DESCRIPTION_MAX_LENGTH = 160;
export const PROFILE_URL_MAX_LENGTH = 100;

export type ProfileValues = z.infer<typeof profileSchema>;

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(4, "Your name cannot be shorter than 4 characters.")
    .max(
      PROFILE_NAME_MAX_LENGTH,
      `Your name cannot be longer than ${PROFILE_NAME_MAX_LENGTH} characters.`
    )
    .refine(
      value => /^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/g.test(value),
      "Invalid characters or too many blank spaces."
    ),
  description: z
    .string()
    .trim()
    .max(
      PROFILE_DESCRIPTION_MAX_LENGTH,
      `Description can't have more than ${PROFILE_DESCRIPTION_MAX_LENGTH} characters.`
    ),
  url: z.union([z.string().url().nullish(), z.literal("")])
});
