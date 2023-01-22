import React from "react";

import CloseIcon from "icons/CloseIcon";
import styled from "styled-components";

import { Button } from "../Button";
import { IconButton } from "../IconButton";

interface ModalHeaderProps {
  onClose: () => void;
  acceptButtonText: string;
  title?: string;
  loading?: boolean;
  onAccept?: () => void;
}

export const ModalHeader = ({
  onClose,
  acceptButtonText,
  title,
  loading = false,
  onAccept
}: ModalHeaderProps) => {
  return (
    <Wrapper>
      <IconButton title="Close" color="white" onClick={onClose}>
        <CloseIcon />
      </IconButton>
      {title && <HeaderTitle>{title}</HeaderTitle>}
      {!!onAccept && (
        <ButtonRow>
          <Button onClick={onAccept} color="secondary" size="small" loading={loading}>
            {acceptButtonText}
          </Button>
        </ButtonRow>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
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
