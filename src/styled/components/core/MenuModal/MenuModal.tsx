import React, { ComponentPropsWithoutRef, ReactElement } from "react";

import FocusTrap from "focus-trap-react";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "hooks/useMediaQuery";
import CloseIcon from "icons/CloseIcon";
import { Portal } from "shared/Portal";
import styled, { useTheme } from "styled-components";

import { ModalPanel } from "../Modal";
import { MenuModalItem } from "./MenuModalItem";

interface MenuModalProps extends ComponentPropsWithoutRef<typeof motion.div> {
  children: ReactElement | ReactElement[];
  isOpen: boolean;
  onClose: () => void;
}

export const MenuModal = ({ children, isOpen, onClose, ...props }: MenuModalProps) => {
  const {
    breakpoints: { sm }
  } = useTheme();
  const isMobile = useMediaQuery(sm);

  return (
    <Portal rootId="modal">
      <AnimatePresence>
        {isOpen && (
          <ModalPanel isOpen={isOpen} onClose={onClose}>
            <FocusTrap>
              <Content
                variants={isMobile ? mobileContentVariants : contentVariants}
                initial="inactive"
                animate="active"
                exit="inactive"
                tabIndex={-1}
                {...props}
              >
                {children}
                <MenuModalItem startIcon={<CloseIcon />} onClick={onClose}>
                  Cancel
                </MenuModalItem>
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
  bottom: calc(12px + env(safe-area-inset-bottom));
  display: flex;
  flex-direction: column;
  max-width: 375px;
  width: 95%;
  margin: 0 12px;
  border-radius: 16px;
  padding: 12px 0;
  background-color: ${({ theme }) => theme.background};
  overflow: hidden;
  outline: none;

  @media ${({ theme }) => theme.breakpoints.sm} {
    position: static;
    max-width: 260px;
    margin: 12px;
    width: 100%;
  }

  @media ${({ theme }) => theme.breakpoints.md} {
    max-width: 400px;
  }
`;
