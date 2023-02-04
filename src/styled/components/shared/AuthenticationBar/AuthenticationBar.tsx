import React from "react";

import { ButtonLink, Text } from "components/core";
import { useRouter } from "next/router";
import styled from "styled-components";
import { hexToRGBA } from "utils/colors";

export const AuthenticationBar = () => {
  const { asPath } = useRouter();
  const redirect = `redirect=${asPath}`;

  return (
    <Bar>
      <Inner>
        <Content>
          <TextWrapperColumn>
            <Text size="xxl" weight={700}>
              Stay up to date
            </Text>
            <Text size="s">Sign in or create a new account.</Text>
          </TextWrapperColumn>
          <Buttons>
            <ButtonLink href={`/?${redirect}`} color="secondary" size="small">
              Sign in
            </ButtonLink>
            <ButtonLink
              href={`/?tab=sign-up&${redirect}`}
              variant="outlined"
              color="secondary"
              size="small"
            >
              Created Account
            </ButtonLink>
          </Buttons>
        </Content>
      </Inner>
    </Bar>
  );
};

const Bar = styled.div`
  display: none;

  @media ${({ theme }) => theme.breakpoints.sm} {
    display: flex;
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    min-height: 53px;
    padding: 12px 32px;
    background-color: ${({ theme }) => theme.primary05};
    border-radius: 16px 16px 0px 0px;
    box-shadow: ${({ theme }) => hexToRGBA(theme.white, 0.2)} 0px 0px 15px,
      ${({ theme }) => hexToRGBA(theme.white, 0.15)} 0px 0px 3px 1px;
    opacity: 0.95;
  }
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const TextWrapperColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
