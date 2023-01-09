import React, { useEffect } from "react";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IconButton } from "components/core";
import { motion } from "framer-motion";
import { useToasts } from "hooks/useToasts";
import type { ToastProps } from "store/slices/toastsSlice";
import styled from "styled-components";

export const Toast = ({ id, message, duration }: ToastProps) => {
  const { handleRemoveToast } = useToasts();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleRemoveToast(id);
    }, duration);

    return () => clearTimeout(timeoutId);
  }, [id, duration]);

  return (
    <ToastWrapper
      layout
      initial={{
        scale: 0.3,
        opacity: 0,
        y: 50
      }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{
        scale: 0.3,
        opacity: 0,
        y: 25
      }}
      transition={{ duration: 0.15 }}
    >
      <Left>
        <span>{message}</span>
      </Left>
      <Right>
        <CloseIconButton
          title="Close"
          color="secondary"
          onClick={() => handleRemoveToast(id)}
          disableFocus
        >
          <CloseRoundedIcon />
        </CloseIconButton>
      </Right>
    </ToastWrapper>
  );
};

const ToastWrapper = styled(motion.div)`
  display: flex;
  gap: 12px;
  align-items: center;
  min-width: 250px;
  width: 100%;
  padding: 12px 15px;
  background-color: ${({ theme }) => theme.background3};
  border-radius: 16px;
  pointer-events: all;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.2);

  @media ${({ theme }) => theme.breakpoints.xs} {
    width: max-content;
  }
`;

const Left = styled.div`
  display: flex;
  flex-grow: 1;
  user-select: none;

  & > span {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    max-width: 375px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Right = styled.div`
  display: flex;
`;

const CloseIconButton = styled(IconButton)`
  &&& {
    margin-right: -7px;
    margin-top: -7px;
    margin-bottom: -7px;
  }
`;
