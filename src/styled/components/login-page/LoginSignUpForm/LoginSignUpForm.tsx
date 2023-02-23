import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import type { InputType } from "components/core";
import { Button, Input } from "components/core";
import { useToasts } from "hooks/useToasts";
import {
  type SignUpValues,
  PROFILE_EMAIL_MAX_LENGTH,
  PROFILE_NAME_MAX_LENGTH,
  PROFILE_PASSWORD_MAX_LENGTH,
  PROFILE_SCREEN_NAME_MAX_LENGTH,
  signUpSchema
} from "schema/authSchema";
import useLoginStore from "store/loginStore";
import styled from "styled-components";
import { api } from "utils/api";

import type { LoginTabs } from "../LoginPage";

interface LoginSignUpFormProps {
  handleChangeTab: (tab: LoginTabs) => void;
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

export const LoginSignUpForm = ({ handleChangeTab }: LoginSignUpFormProps) => {
  const { isLoading, setIsLoading, setEmail, setPassword } = useLoginStore(store => store);
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors }
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema)
  });
  const { handleAddToast } = useToasts();
  const signUpMutation = api.auth.signUp.useMutation({
    onMutate: () => {
      setIsLoading(true);
    },
    onError: (error: any) => {
      handleAddToast("error", error?.message);
    },
    onSuccess: () => {
      handleChangeTab("sign in");
      setEmail(getValues("email"));
      setPassword(getValues("password"));
    },
    onSettled: () => {
      setIsLoading(false);
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
          error={errors[name]?.message}
          loading={isLoading}
          value={watch(name)}
          {...props}
          {...register(name)}
        />
      ))}
      <Button type="submit" loading={isLoading}>
        Create Account
      </Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
