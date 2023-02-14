import React from "react";

import styled from "styled-components";

import { Button } from "../Button";

interface ConfirmModalActionsProps {
  onAccept: () => void;
  onCancel: () => void;
  loading: boolean;
  acceptButtonText: string;
  cancelButtonText: string;
}

export const ConfirmModalActions = ({
  onAccept,
  onCancel,
  loading,
  acceptButtonText,
  cancelButtonText
}: ConfirmModalActionsProps) => {
  return (
    <Wrapper>
      <Button
        variant="text"
        onClick={onCancel}
        disabled={loading}
        color="primary"
        size="large"
        fullWidth
      >
        {cancelButtonText}
      </Button>
      <Divider />
      <Button
        variant="text"
        onClick={onAccept}
        loading={loading}
        color="danger"
        size="large"
        fullWidth
      >
        {acceptButtonText}
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  border-top: 1px solid ${({ theme }) => theme.border};

  & button {
    &:first-of-type {
      border-bottom-left-radius: 16px;
    }

    &:last-of-type {
      border-bottom-right-radius: 16px;
    }
  }
`;

const Divider = styled.div`
  width: 2px;
  background-color: ${({ theme }) => theme.border};
`;
