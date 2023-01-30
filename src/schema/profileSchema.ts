import type { UserData } from "api/user/userByScreenName";
import * as yup from "yup";

import { PROFILE_NAME_MAX_LENGTH } from "./authSchema";

export const PROFILE_DESCRIPTION_MAX_LENGTH = 160;
export const PROFILE_URL_MAX_LENGTH = 100;

export type ProfileValues = Pick<UserData, "name" | "description" | "url">;

export const profileSchema: yup.SchemaOf<ProfileValues> = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(
      PROFILE_NAME_MAX_LENGTH,
      `Name can't have more than ${PROFILE_NAME_MAX_LENGTH} characters.`
    )
    .required("Name is required.")
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
    .default("")
    .max(
      PROFILE_URL_MAX_LENGTH,
      `Website url can't have more than ${PROFILE_URL_MAX_LENGTH} characters.`
    )
    .url()
});
