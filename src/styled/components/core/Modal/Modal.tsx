import React, { ComponentPropsWithoutRef, ReactElement } from "react";

import FocusTrap from "@mui/base/FocusTrap";
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
  const {
    breakpoints: { sm }
  } = useTheme();
  const isMobile = useMediaQuery(sm);

  return (
    <Portal rootId="modal">
      <AnimatePresence>
        {isOpen && (
          <ModalPanel
            isOpen={isOpen}
            onClose={onClose}
            preventClosingOnOutside={preventClosingOnOutside}
          >
            <FocusTrap open>
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
  min-height: 350px;
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
