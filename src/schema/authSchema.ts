import { containsEmojis } from "utils/strings";
import * as yup from "yup";

export const PROFILE_EMAIL_MAX_LENGTH = 25;
export const PROFILE_SCREEN_NAME_MAX_LENGTH = 15;
export const PROFILE_NAME_MAX_LENGTH = 50;
export const PROFILE_PASSWORD_MAX_LENGTH = 16;

export type SignInValues = {
  email: string;
  password: string;
};

export type SignUpValues = {
  screenName: string;
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export const signInSchema: yup.SchemaOf<SignInValues> = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email.")
    .max(
      PROFILE_EMAIL_MAX_LENGTH,
      `Email can't have more than ${PROFILE_EMAIL_MAX_LENGTH} characters.`
    )
    .required("Email is required.")
    .trim(),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters.")
    .max(
      PROFILE_PASSWORD_MAX_LENGTH,
      `Password can't have more than ${PROFILE_PASSWORD_MAX_LENGTH} characters.`
    )
    .test("emoji", "⛔ No entry emojis", value => !containsEmojis(value))
    .required("Password is required.")
    .trim()
});

export const signUpSchema: yup.SchemaOf<SignUpValues> = yup.object().shape({
  screenName: yup
    .string()
    .min(4, "Your username cannot be shorter than 4 characters.")
    .max(
      PROFILE_SCREEN_NAME_MAX_LENGTH,
      `Your username cannot be longer than ${PROFILE_SCREEN_NAME_MAX_LENGTH} characters.`
    )
    .required("Screen name is required.")
    .trim(),
  name: yup
    .string()
    .min(4, "Your name cannot be shorter than 4 characters.")
    .max(
      PROFILE_NAME_MAX_LENGTH,
      `Your name cannot be longer than ${PROFILE_NAME_MAX_LENGTH} characters.`
    )
    .required("Name is required.")
    .trim(),
  email: yup
    .string()
    .email("Must be a valid email.")
    .max(
      PROFILE_EMAIL_MAX_LENGTH,
      `Your email cannot be longer than ${PROFILE_EMAIL_MAX_LENGTH} characters.`
    )
    .required("Email is required.")
    .trim(),
  password: yup
    .string()
    .min(4, "Your password cannot be shorter than 4 characters.")
    .max(
      PROFILE_PASSWORD_MAX_LENGTH,
      `Your password cannot be longer than ${PROFILE_PASSWORD_MAX_LENGTH} characters.`
    )
    .test("emoji", "⛔ No entry emojis", value => !containsEmojis(value))
    .required("Password is required."),
  repeatPassword: yup
    .string()
    .required("Repeat password is required.")
    .oneOf([yup.ref("password"), null], "Password does not match.")
});
