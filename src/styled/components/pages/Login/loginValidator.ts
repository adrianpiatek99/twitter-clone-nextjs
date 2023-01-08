import { containsEmojis } from "utils/strings";
import * as yup from "yup";

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
    .email("Must be a valid email")
    .max(80, "Email must be at least 80 characters")
    .required("Email is required")
    .trim(),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(16, "Password must be at most 16 characters")
    .test("emoji", "⛔ No entry emojis", value => !containsEmojis(value))
    .required("Password is required")
    .trim()
});

export const signUpSchema: yup.SchemaOf<SignUpValues> = yup.object().shape({
  screenName: yup
    .string()
    .min(3, "Screen name must be at least 3 characters")
    .max(25, "Screen name must be at least 16 characters")
    .required("Screen name is required")
    .trim(),
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(16, "Name must be at least 16 characters")
    .required("Name is required")
    .trim(),
  email: yup
    .string()
    .email("Must be a valid email")
    .max(80, "Email must be at least 80 characters")
    .required("Email is required")
    .trim(),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(16, "Password must be at most 16 characters")
    .test("emoji", "⛔ No entry emojis", value => !containsEmojis(value))
    .required("Password is required"),
  repeatPassword: yup
    .string()
    .required("Repeat password is required")
    .oneOf([yup.ref("password"), null], "Password does not match")
});
