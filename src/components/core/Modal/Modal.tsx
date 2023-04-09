import type { ComponentPropsWithoutRef, FC, ReactElement } from "react";
import React from "react";
import FocusLock from "react-focus-lock";

import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "hooks/useMediaQuery";
import { Portal } from "shared/Portal";
import styled, { useTheme } from "styled-components";

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
  acceptButtonDisabled?: boolean;
  preventClosingOnOutside?: boolean;
  formId?: string;
}

export const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  onAccept,
  loading = false,
  headerTitle,
  acceptButtonText = "Save",
  acceptButtonDisabled = false,
  preventClosingOnOutside = false,
  formId,
  ...props
}) => {
  const {
    breakpoints: { sm }
  } = useTheme();
  const isMobile = useMediaQuery(sm);

  return (
    <Portal rootId="modal">
      <AnimatePresence>
        {isOpen && (
          <FocusLock autoFocus={false}>
            <ModalPanel
              isOpen={isOpen}
              onClose={onClose}
              preventClosingOnOutside={preventClosingOnOutside}
              loading={loading}
            >
              <Content
                initial="inactive"
                animate="active"
                exit="inactive"
                variants={isMobile ? mobileContentVariants : contentVariants}
                tabIndex={-1}
                {...props}
              >
                <ModalHeader
                  key="modal"
                  formId={formId}
                  onClose={onClose}
                  title={headerTitle}
                  loading={loading}
                  acceptButtonText={acceptButtonText}
                  acceptButtonDisabled={acceptButtonDisabled}
                  onAccept={onAccept}
                />
                {children}
              </Content>
            </ModalPanel>
          </FocusLock>
        )}
      </AnimatePresence>
    </Portal>
  );
};

const mobileContentVariants = {
  inactive: {
    y: "100%",
    opacity: 0,
    transition: { duration: 0.2 }
  },
  active: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.2 }
  }
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
  position: absolute;
  bottom: calc(env(safe-area-inset-bottom));
  display: flex;
  flex-direction: column;
  max-width: 450px;
  width: 98%;
  min-height: 250px;
  padding-bottom: 53px;
  max-height: 90vh;
  background-color: ${({ theme }) => theme.background};
  border-radius: 16px 16px 0px 0px;
  overflow-y: overlay;
  outline: none;

  &::-webkit-scrollbar-track {
    margin: 10px 0;
  }

  @media ${({ theme }) => theme.breakpoints.sm} {
    position: static;
    max-width: 600px;
    width: 95%;
    border-radius: 16px;
  }
`;
