import React, { ComponentPropsWithoutRef, FC, ReactElement, useEffect } from "react";

import { FocusTrap } from "@mui/base";
import { AnimatePresence, motion } from "framer-motion";
import { Portal } from "shared/Portal";
import styled from "styled-components";

import { ModalOverlay } from "../Modal";
import { MenuModalItem } from "./MenuModalItem";

interface MenuModalProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactElement | ReactElement[];
  isOpen: boolean;
  onClose: () => void;
  preventClosingOnOutside?: boolean;
}

export const MenuModal: FC<MenuModalProps> = ({
  children,
  isOpen,
  onClose,
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

      return () => window.removeEventListener("keydown", handleEscape, false);
    }
  }, [isOpen]);

  return (
    <Portal rootId="modal">
      <AnimatePresence>
        {isOpen && (
          <ModalOverlay onClose={() => !preventClosingOnOutside && onClose()} {...props}>
            <FocusTrap open>
              <Content onClick={e => e.stopPropagation()} variants={contentVariants} tabIndex={-1}>
                {children}
                <MenuModalItem onClick={onClose}>Cancel</MenuModalItem>
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
  width: 100%;
  max-width: 260px;
  margin: 12px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.background};
  overflow: hidden;
  outline: none;

  @media ${({ theme }) => theme.breakpoints.md} {
    max-width: 400px;
  }
`;
