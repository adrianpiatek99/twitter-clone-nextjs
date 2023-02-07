import React from "react";

import { Text } from "components/core";
import styled from "styled-components";

interface ErrorMessageProps {
  title: string | undefined;
  text?: string;
}

export const ErrorMessage = ({ title, text }: ErrorMessageProps) => {
  if (!title) return null;

  return (
    <Wrapper>
      <Content>
        <Text size="xxl" weight={700}>
          {title} <br />
          (┛ಠ_ಠ)┛彡┻━┻
        </Text>
        {text && <Text color="secondary">{text}</Text>}
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  max-width: 400px;
  padding: 40px 20px;
  margin: 32px auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media ${({ theme }) => theme.breakpoints.sm} {
    & > span:nth-child(1) {
      ${({ theme }) => theme.heading.s}
    }
  }
`;
