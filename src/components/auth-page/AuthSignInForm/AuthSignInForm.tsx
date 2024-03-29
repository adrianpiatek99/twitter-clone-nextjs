import React from "react";
import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import type { InputType } from "components/core";
import { Button, Input } from "components/core";
import { HOME_PAGE_ROUTE } from "constants/routes";
import { useToasts } from "hooks/useToasts";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import {
  type SignInValues,
  PROFILE_EMAIL_MAX_LENGTH,
  PROFILE_PASSWORD_MAX_LENGTH
} from "schema/authSchema";
import { signInSchema } from "schema/authSchema";
import useAuthPageStore from "store/authPageStore";
import styled from "styled-components";
import { shallow } from "zustand/shallow";

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

export const AuthSignInForm = () => {
  const { email, password, isLoading, setIsLoading, resetStore } = useAuthPageStore(
    state => ({
      email: state.email,
      password: state.password,
      isLoading: state.isLoading,
      setIsLoading: state.setIsLoading,
      resetStore: state.resetStore
    }),
    shallow
  );
  const { replace, query } = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email,
      password
    }
  });
  const { handleAddToast } = useToasts();

  const onSubmit: SubmitHandler<SignInValues> = async data => {
    try {
      setIsLoading(true);

      const response = await signIn("credentials", {
        ...data,
        redirect: false
      });

      const ok = response?.ok;

      if (!ok) throw Error(response?.error);

      if (typeof query.redirect === "string") {
        replace(query.redirect);

        return;
      }

      replace(HOME_PAGE_ROUTE);
    } catch (error: any) {
      handleAddToast("error", error?.message);
    } finally {
      resetStore();
    }
  };

  useEffect(() => {
    if (email && password) {
      onSubmit({ email, password });
    }
  }, [email, password]);

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
        <Link href="/">Forgot Your Password?</Link>
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
