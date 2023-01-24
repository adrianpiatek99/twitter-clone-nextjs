import type {
  UserByScreenNameRequest,
  UserByScreenNameResponse
} from "api/user/userByScreenName";
import {
  userByScreenNamePath
} from "api/user/userByScreenName";
import { getPromise } from "network/basePromises";

export async function userByScreenName(payload: UserByScreenNameRequest) {
  return getPromise<UserByScreenNameRequest, UserByScreenNameResponse>(
    userByScreenNamePath,
    payload
  );
}
