import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import type { InputType } from "components/core";
import { Button, Input } from "components/core";
import { useToasts } from "hooks/useToasts";
import { signUp } from "network/auth/signUp";
import {
  type SignUpValues,
  PROFILE_EMAIL_MAX_LENGTH,
  PROFILE_NAME_MAX_LENGTH,
  PROFILE_PASSWORD_MAX_LENGTH,
  PROFILE_SCREEN_NAME_MAX_LENGTH,
  signUpSchema
} from "schema/authSchema";
import { setDefaultPageFormLoading } from "store/slices/pagesSlice";
import { useAppDispatch } from "store/store";
import styled from "styled-components";

import type { DefaultTabs } from "../DefaultPage";

interface DefaultSignUpFormProps {
  handleChangeTab: (tab: DefaultTabs) => void;
}

type InputData = {
  name: keyof SignUpValues;
  label: string;
  type?: InputType;
  maxLength: number;
};

const inputs: InputData[] = [
  { name: "screenName", label: "Username", maxLength: PROFILE_SCREEN_NAME_MAX_LENGTH },
  { name: "name", label: "Name", maxLength: PROFILE_NAME_MAX_LENGTH },
  { name: "email", label: "Email Address", maxLength: PROFILE_EMAIL_MAX_LENGTH },
  { name: "password", type: "password", label: "Password", maxLength: PROFILE_PASSWORD_MAX_LENGTH },
  {
    name: "repeatPassword",
    type: "password",
    label: "Repeat password",
    maxLength: PROFILE_PASSWORD_MAX_LENGTH
  }
];

export const DefaultSignUpForm = ({ handleChangeTab }: DefaultSignUpFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<SignUpValues>({
    resolver: yupResolver(signUpSchema)
  });
  const { handleAddToast } = useToasts();
  const dispatch = useAppDispatch();
  const signUpMutation = useMutation({
    mutationFn: signUp,
    onMutate: () => {
      dispatch(setDefaultPageFormLoading(true));
    },
    onError: (error: any) => {
      handleAddToast("error", error?.message);
    },
    onSuccess: () => {
      handleChangeTab("sign in");
    },
    onSettled: () => {
      dispatch(setDefaultPageFormLoading(false));
    }
  });

  const onSubmit: SubmitHandler<SignUpValues> = async data => {
    signUpMutation.mutate(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {inputs.map(({ name, ...props }) => (
        <Input
          key={name}
          {...register(name)}
          value={watch(name)}
          error={errors[name]?.message}
          loading={signUpMutation.isLoading}
          {...props}
        />
      ))}
      <Button type="submit" loading={signUpMutation.isLoading}>
        Sign Up
      </Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
