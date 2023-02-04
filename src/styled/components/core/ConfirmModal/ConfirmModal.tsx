import type { ComponentPropsWithoutRef } from "react";
import React from "react";
import FocusLock from "react-focus-lock";

import { AnimatePresence, motion } from "framer-motion";
import { Portal } from "shared/Portal";
import styled from "styled-components";

import { Heading } from "../Heading";
import { ModalPanel } from "../Modal";
import { Text } from "../Text";
import { ConfirmModalActions } from "./ConfirmModalActions";

interface ConfirmModalProps extends ComponentPropsWithoutRef<"div"> {
  isOpen: boolean;
  heading: string;
  text: string;
  onClose: () => void;
  onAccept: () => void;
  loading?: boolean;
  onCancel?: () => void;
  acceptButtonText?: string;
  cancelButtonText?: string;
}

export const ConfirmModal = ({
  isOpen,
  text,
  onClose,
  onAccept,
  loading = false,
  heading,
  onCancel,
  acceptButtonText = "Save",
  cancelButtonText = "Cancel"
}: ConfirmModalProps) => {
  const handleCancelClick = () => {
    if (onCancel) {
      onCancel();
    }

    onClose();
  };

  return (
    <Portal rootId="modal">
      <AnimatePresence>
        {isOpen && (
          <FocusLock autoFocus={false}>
            <ModalPanel isOpen={isOpen} onClose={onClose}>
              <Content
                initial="inactive"
                animate="active"
                exit="inactive"
                variants={contentVariants}
                tabIndex={-1}
              >
                <Header>
                  <Heading>{heading}</Heading>
                  <Text color="secondary">{text}</Text>
                </Header>
                <ConfirmModalActions
                  onAccept={onAccept}
                  onCancel={handleCancelClick}
                  loading={loading}
                  acceptButtonText={acceptButtonText}
                  cancelButtonText={cancelButtonText}
                />
              </Content>
            </ModalPanel>
          </FocusLock>
        )}
      </AnimatePresence>
    </Portal>
  );
};

const contentVariants = {
  inactive: {
    scale: 0.9,
    opacity: 0,
    transition: { duration: 0.2 }
  },
  active: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.2 }
  }
};

const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 16px;
  text-align: center;
  max-width: 320px;
  width: 90%;
  background-color: ${({ theme }) => theme.background};
  outline: none;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px 24px 0;
`;
