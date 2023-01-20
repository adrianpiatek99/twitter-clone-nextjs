import { signUpPath, SignUpRequest, SignUpResponse } from "api/auth/signUp";
import { postPromise } from "network/basePromises";

export async function signUp(payload: SignUpRequest) {
  return postPromise<SignUpRequest, SignUpResponse>(signUpPath, payload);
}
