import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, InputType } from "components/core";
import { useToasts } from "hooks/useToasts";
import { signUp } from "network/auth/signUp";
import { setDefaultPageFormLoading } from "store/slices/pagesSlice";
import { useAppDispatch } from "store/store";
import styled from "styled-components";

import { DefaultTabs } from "../DefaultPage";
import { signUpSchema, SignUpValues } from "../defaultValidator";

interface DefaultSignUpFormProps {
  handleChangeTab: (tab: DefaultTabs) => void;
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
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<SignUpValues> = async data => {
    try {
      setIsLoading(true);
      dispatch(setDefaultPageFormLoading(true));

      await signUp(data);

      handleChangeTab("sign in");
    } catch (error: any) {
      handleAddToast("error", error?.response?.data?.message);
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
