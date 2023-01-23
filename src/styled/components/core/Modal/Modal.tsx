import React, { ComponentPropsWithoutRef, ReactElement } from "react";

import FocusTrap from "focus-trap-react";
import { AnimatePresence, motion } from "framer-motion";
import { Portal } from "shared/Portal";
import styled from "styled-components";

import { ModalHeader } from "./ModalHeader";
import { ModalPanel } from "./ModalPanel";

interface ModalProps extends ComponentPropsWithoutRef<typeof motion.div> {
  children: ReactElement | ReactElement[];
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
  loading?: boolean;
  headerTitle?: string;
  acceptButtonText?: string;
  preventClosingOnOutside?: boolean;
}

export const Modal = ({
  children,
  isOpen,
  onClose,
  onAccept,
  loading = false,
  headerTitle,
  acceptButtonText = "Save",
  preventClosingOnOutside = false,
  ...props
}: ModalProps) => {
  return (
    <Portal rootId="modal">
      <AnimatePresence>
        {isOpen && (
          <ModalPanel
            isOpen={isOpen}
            onClose={onClose}
            preventClosingOnOutside={preventClosingOnOutside}
          >
            <FocusTrap>
              <Content
                onClick={e => e.stopPropagation()}
                variants={contentVariants}
                tabIndex={-1}
                {...props}
              >
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
          </ModalPanel>
        )}
      </AnimatePresence>
    </Portal>
  );
};

const contentVariants = {
  inactive: {
    scale: 0.9,
    opacity: 0,
    transition: { duration: 0.15 }
  },
  active: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.15 }
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
