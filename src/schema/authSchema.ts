import { containsEmojis } from "utils/strings";
import { z } from "zod";

export type SignInValues = z.infer<typeof signInSchema>;

export type SignUpValues = z.infer<typeof signUpSchema>;

export const PROFILE_EMAIL_MAX_LENGTH = 50;
export const PROFILE_SCREEN_NAME_MAX_LENGTH = 15;
export const PROFILE_NAME_MAX_LENGTH = 50;
export const PROFILE_PASSWORD_MAX_LENGTH = 16;

export const signInSchema = z.object({
  email: z
    .string()
    .email("Must be a valid email.")
    .max(
      PROFILE_EMAIL_MAX_LENGTH,
      `Email can't have more than ${PROFILE_EMAIL_MAX_LENGTH} characters.`
    )
    .trim(),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters.")
    .max(
      PROFILE_PASSWORD_MAX_LENGTH,
      `Password can't have more than ${PROFILE_PASSWORD_MAX_LENGTH} characters.`
    )
});

export const signUpSchema = z
  .object({
    screenName: z
      .string()
      .min(4, "Your username cannot be shorter than 4 characters.")
      .max(
        PROFILE_SCREEN_NAME_MAX_LENGTH,
        `Your username cannot be longer than ${PROFILE_SCREEN_NAME_MAX_LENGTH} characters.`
      )
      .trim()
      .refine(
        value => /^(\w+\S)*\w+$/g.test(value),
        "Invalid characters or too many blank spaces."
      ),
    name: z
      .string()
      .min(4, "Your name cannot be shorter than 4 characters.")
      .max(
        PROFILE_NAME_MAX_LENGTH,
        `Your name cannot be longer than ${PROFILE_NAME_MAX_LENGTH} characters.`
      )
      .trim()
      .refine(
        value => /^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/g.test(value),
        "Invalid characters or too many blank spaces."
      ),
    email: z
      .string()
      .email("Must be a valid email.")
      .max(
        PROFILE_EMAIL_MAX_LENGTH,
        `Your email cannot be longer than ${PROFILE_EMAIL_MAX_LENGTH} characters.`
      )
      .trim(),
    password: z
      .string()
      .min(4, "Your password cannot be shorter than 4 characters.")
      .max(
        PROFILE_PASSWORD_MAX_LENGTH,
        `Your password cannot be longer than ${PROFILE_PASSWORD_MAX_LENGTH} characters.`
      )
      .refine(value => !containsEmojis(value), "⛔ No entry emojis"),
    repeatPassword: z
      .string()
      .min(4, "Your password cannot be shorter than 4 characters.")
      .max(
        PROFILE_PASSWORD_MAX_LENGTH,
        `Your password cannot be longer than ${PROFILE_PASSWORD_MAX_LENGTH} characters.`
      )
  })
  .refine(data => data.password === data.repeatPassword, {
    message: "Password does not match.",
    path: ["repeatPassword"]
  });
