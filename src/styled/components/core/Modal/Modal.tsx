import React, { ComponentPropsWithoutRef, FC, ReactElement, useEffect } from "react";

import FocusTrap from "@mui/base/FocusTrap";
import { AnimatePresence, motion } from "framer-motion";
import { Portal } from "shared/Portal";
import styled from "styled-components";

import { ModalHeader } from "./ModalHeader";
import { ModalOverlay } from "./ModalOverlay";

interface ModalProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactElement | ReactElement[];
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
  loading?: boolean;
  headerTitle?: string;
  acceptButtonText?: string;
  preventClosingOnOutside?: boolean;
}

export const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  onAccept,
  loading = false,
  headerTitle,
  acceptButtonText = "Save",
  preventClosingOnOutside = false,
  ...props
}) => {
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
          <ModalOverlay onClose={() => !preventClosingOnOutside && onClose()} {...props}>
            <FocusTrap open>
              <Content onClick={e => e.stopPropagation()} variants={contentVariants}>
                <ModalHeader
                  key="modal"
                  onClose={onClose}
                  title={headerTitle}
                  loading={loading}
                  acceptButtonText={acceptButtonText}
                  onAccept={onAccept}
                />
                {children}
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
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  min-height: 400px;
  background-color: ${({ theme }) => theme.background};
  border-radius: 16px;
  overflow-y: overlay;
  outline: none;
`;
