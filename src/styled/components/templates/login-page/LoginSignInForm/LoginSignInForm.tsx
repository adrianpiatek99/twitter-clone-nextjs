import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import type { InputType } from "components/core";
import { Button, Input } from "components/core";
import { useToasts } from "hooks/useToasts";
import { signIn } from "network/auth/signIn";
import { useRouter } from "next/router";
import {
  type SignInValues,
  PROFILE_EMAIL_MAX_LENGTH,
  PROFILE_PASSWORD_MAX_LENGTH
} from "schema/authSchema";
import { signInSchema } from "schema/authSchema";
import { setDefaultPageFormLoading } from "store/slices/pagesSlice";
import { useAppDispatch } from "store/store";
import styled from "styled-components";

type InputData = {
  name: keyof SignInValues;
  label: string;
  type?: InputType;
  maxLength: number;
};

const inputs: InputData[] = [
  { name: "email", label: "Email Address", maxLength: PROFILE_EMAIL_MAX_LENGTH },
  { name: "password", type: "password", label: "Password", maxLength: PROFILE_PASSWORD_MAX_LENGTH }
];

export const LoginSignInForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<SignInValues>({
    resolver: yupResolver(signInSchema)
  });
  const { replace } = useRouter();
  const dispatch = useAppDispatch();
  const { handleAddToast } = useToasts();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<SignInValues> = async data => {
    try {
      setIsLoading(true);
      dispatch(setDefaultPageFormLoading(true));

      const response = await signIn({ ...data });

      const ok = response?.ok;

      if (!ok) throw Error(response?.error);

      replace("/home");
    } catch (error: any) {
      handleAddToast("error", error?.message);
    } finally {
      setIsLoading(false);
      dispatch(setDefaultPageFormLoading(false));
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {inputs.map(({ name, ...props }) => (
        <Input
          key={name}
          {...register(name)}
          value={watch(name)}
          error={errors[name]?.message}
          loading={isLoading}
          {...props}
        />
      ))}
      <Button type="submit" loading={isLoading}>
        Sign In
      </Button>
      <LinkWrapper>
        <a href="/">Forgot Your Password?</a>
      </LinkWrapper>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px 0;
`;

const LinkWrapper = styled.div`
  color: ${({ theme }) => theme.primary05};
  font-weight: 500;
  text-align: center;
`;
