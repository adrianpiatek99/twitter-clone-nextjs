import React from "react";

import { Text } from "components/core";
import styled, { keyframes } from "styled-components";

interface EmptyMessageProps {
  text: string;
}

export const EmptyMessage = ({ text }: EmptyMessageProps) => {
  return (
    <Wrapper>
      <Content>
        <Text size="l" color="secondary" weight={500}>
          {text} <br />
          (╯°□°)╯︵ ┻━┻
        </Text>
      </Content>
    </Wrapper>
  );
};

const enterAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 400px;
  padding: 40px 20px;
  margin: 32px auto;
  animation: ${enterAnimation} 0.3s ease-out;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
