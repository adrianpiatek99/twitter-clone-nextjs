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
      <Button onClick={onAccept} loading={loading} color="secondary" fullWidth>
        {acceptButtonText}
      </Button>
      <Button onClick={onCancel} disabled={loading} variant="outlined" fullWidth>
        {cancelButtonText}
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 24px;
  margin-bottom: 12px;
`;
