import { signUpPath, SignUpRequest, SignUpResponse } from "api/auth/signUp";
import axios from "axios";

export const signUp = async (payload: SignUpRequest) => {
  return axios.post<SignUpRequest, SignUpResponse>(signUpPath, payload);
};
