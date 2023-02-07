import React from "react";

import { Text } from "components/core";
import styled from "styled-components";

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
`;
