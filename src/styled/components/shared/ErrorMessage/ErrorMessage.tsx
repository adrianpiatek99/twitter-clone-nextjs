import React from "react";

import { Text } from "components/core";
import styled from "styled-components";

interface ErrorMessageProps {
  message: string | undefined;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <ErrorContent>
      <Text weight={700}>{message}</Text>
    </ErrorContent>
  );
};

const ErrorContent = styled.div`
  max-width: 400px;
  padding: 40px 20px;
  margin: 32px auto;

  & > span {
    ${({ theme }) => theme.heading.s}
  }
`;
