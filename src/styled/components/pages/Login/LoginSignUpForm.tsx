import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, InputType } from "components/core";
import { signUp } from "network/auth/signUp";
import { setDefaultPageFormLoading } from "store/slices/pagesSlice";
import { useAppDispatch } from "store/store";
import styled from "styled-components";

import { LoginTabs } from "./LoginPage";
import { signUpSchema, SignUpValues } from "./loginValidator";

interface LoginSignUpFormProps {
  handleChangeTab: (tab: LoginTabs) => void;
}

type InputData = {
  name: keyof SignUpValues;
  label: string;
  type?: InputType;
};

const inputs: InputData[] = [
  { name: "screenName", label: "@Screen Name" },
  { name: "name", label: "Name" },
  { name: "email", label: "Email Address" },
  { name: "password", type: "password", label: "Password" },
  { name: "repeatPassword", type: "password", label: "Repeat password" }
];

export const LoginSignUpForm = ({ handleChangeTab }: LoginSignUpFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<SignUpValues>({
    resolver: yupResolver(signUpSchema)
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<SignUpValues> = async data => {
    try {
      setIsLoading(true);
      dispatch(setDefaultPageFormLoading(true));

      const { screenName, repeatPassword } = data;

      await signUp({
        screen_name: screenName,
        repeat_password: repeatPassword,
        ...data
      });

      handleChangeTab("sign in");
    } catch (error) {
      console.error(error);
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
        Sign Up
      </Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px 0;
`;
