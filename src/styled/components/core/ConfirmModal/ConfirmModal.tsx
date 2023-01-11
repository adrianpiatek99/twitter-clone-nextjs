import React, { ComponentPropsWithoutRef, FC, useEffect } from "react";

import FocusTrap from "@mui/base/FocusTrap";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "shared/Logo";
import { Portal } from "shared/Portal";
import styled from "styled-components";

import { ModalOverlay } from "../Modal";
import { ConfirmModalActions } from "./ConfirmModalActions";

interface ConfirmModalProps extends ComponentPropsWithoutRef<"div"> {
  isOpen: boolean;
  text: string;
  onClose: () => void;
  onAccept: () => void;
  loading?: boolean;
  heading?: string;
  onCancel?: () => void;
  acceptButtonText?: string;
  cancelButtonText?: string;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  text,
  onClose,
  onAccept,
  loading = false,
  heading,
  onCancel,
  acceptButtonText = "Save",
  cancelButtonText = "Cancel"
}) => {
  const handleCancelClick = () => {
    if (onCancel) {
      onCancel();
    }

    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      const handleEscape = event => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      window.addEventListener("keydown", handleEscape, false);

      return () => {
        window.removeEventListener("keydown", handleEscape, false);
      };
    }
  }, [isOpen]);

  return (
    <Portal rootId="modal">
      <AnimatePresence>
        {isOpen && (
          <ModalOverlay onClose={onClose}>
            <FocusTrap open disableAutoFocus>
              <Content onClick={e => e.stopPropagation()} variants={contentVariants}>
                <LogoWrapper>
                  <Logo size="m" />
                </LogoWrapper>
                {heading && <Heading>{heading}</Heading>}
                <Text>{text}</Text>
                <ConfirmModalActions
                  onAccept={onAccept}
                  onCancel={handleCancelClick}
                  loading={loading}
                  acceptButtonText={acceptButtonText}
                  cancelButtonText={cancelButtonText}
                />
              </Content>
            </FocusTrap>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Portal>
  );
};

const contentVariants = {
  inactive: {
    scale: 0.9,
    opacity: 0,
    transition: { duration: 0.1 }
  },
  active: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.1 }
  }
};

const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  max-width: 320px;
  width: 90%;
  padding: 32px;
  background-color: ${({ theme }) => theme.background};
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 16px;
`;

const Heading = styled.h2`
  ${({ theme }) => theme.heading.xs};
  margin-bottom: 8px;
`;

const Text = styled.span`
  color: ${({ theme }) => theme.neutral100};
`;
