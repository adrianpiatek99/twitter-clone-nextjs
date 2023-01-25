import React from "react";

import CloseIcon from "icons/CloseIcon";
import styled from "styled-components";

import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { LinearProgress } from "../LinearProgress";

interface ModalHeaderProps {
  onClose: () => void;
  acceptButtonText: string;
  acceptButtonDisabled: boolean;
  title?: string;
  loading?: boolean;
  onAccept?: () => void;
  formId?: string;
}

export const ModalHeader = ({
  onClose,
  acceptButtonText,
  acceptButtonDisabled,
  title,
  loading = false,
  onAccept,
  formId
}: ModalHeaderProps) => {
  return (
    <Wrapper>
      <IconButton title="Close" color="white" onClick={onClose}>
        <CloseIcon />
      </IconButton>
      {title && <HeaderTitle>{title}</HeaderTitle>}
      {!!onAccept && (
        <ButtonRow>
          <Button
            onClick={onAccept}
            color="secondary"
            size="small"
            loading={loading}
            disabled={acceptButtonDisabled}
            form={formId}
          >
            {acceptButtonText}
          </Button>
        </ButtonRow>
      )}
      {loading && <LinearProgress />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 53px;
  width: 100%;
  padding: 0 16px;
`;

const HeaderTitle = styled.h2`
  ${({ theme }) => theme.heading.xs};
  font-weight: 700;
`;

const ButtonRow = styled.div`
  display: flex;
  margin-left: auto;
`;
