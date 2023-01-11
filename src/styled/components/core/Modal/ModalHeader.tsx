import React from "react";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
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
      <IconButton title="Close" color="secondary" onClick={onClose}>
        <CloseRoundedIcon />
      </IconButton>
      {title && <HeaderTitle>{title}</HeaderTitle>}
      {!!onAccept && (
        <ButtonRow>
          <Button onClick={onAccept} color="secondary" loading={loading}>
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
  height: 53px;
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

  &&& {
    & > button {
      height: 32px;
    }
  }
`;
