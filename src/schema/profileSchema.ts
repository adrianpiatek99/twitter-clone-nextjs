import type { UserData } from "api/user/userByScreenName";
import * as yup from "yup";

import { PROFILE_NAME_MAX_LENGTH } from "./authSchema";

export const PROFILE_DESCRIPTION_MAX_LENGTH = 160;
export const PROFILE_URL_MAX_LENGTH = 100;

export type ProfileValues = Pick<UserData, "name" | "description" | "url">;

export const profileSchema: yup.SchemaOf<ProfileValues> = yup.object().shape({
  name: yup
    .string()
    .min(4, "Your name cannot be shorter than 4 characters.")
    .max(
      PROFILE_NAME_MAX_LENGTH,
      `Your name cannot be longer than ${PROFILE_NAME_MAX_LENGTH} characters.`
    )
    .required("Name is required.")
    .matches(/^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/g, "Invalid characters or too many blank spaces.")
    .trim(),
  description: yup
    .string()
    .default("")
    .max(
      PROFILE_DESCRIPTION_MAX_LENGTH,
      `Description can't have more than ${PROFILE_DESCRIPTION_MAX_LENGTH} characters.`
    )
    .trim(),
  url: yup
    .string()
    .nullable()
    .default("")
    .max(
      PROFILE_URL_MAX_LENGTH,
      `Website url can't have more than ${PROFILE_URL_MAX_LENGTH} characters.`
    )
    .url()
});
