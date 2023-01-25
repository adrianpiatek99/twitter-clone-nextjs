import type { EditProfileRequest, EditProfileResponse } from "api/user/editProfile";
import { editProfilePath } from "api/user/editProfile";
import { patchPromise } from "network/basePromises";

export async function editProfile(payload: EditProfileRequest) {
  return patchPromise<EditProfileRequest, EditProfileResponse>(editProfilePath, payload);
}
