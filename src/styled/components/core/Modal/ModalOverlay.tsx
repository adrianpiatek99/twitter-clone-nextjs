import React, { FC, ReactElement } from "react";
import { RemoveScrollBar } from "react-remove-scroll-bar";

import { motion } from "framer-motion";
import styled from "styled-components";

interface ModalOverlayProps {
  children: ReactElement | ReactElement[];
  onClose: () => void;
  duration?: number;
}

export const ModalOverlay: FC<ModalOverlayProps> = ({ children, onClose, duration, ...props }) => {
  return (
    <Overlay
      variants={overlayVariants(duration)}
      initial="inactive"
      animate="active"
      exit="inactive"
      onClick={onClose}
      {...props}
    >
      <RemoveScrollBar />
      {children}
    </Overlay>
  );
};

const overlayVariants = (duration = 0.15) => {
  return {
    inactive: { opacity: 0, transition: { duration } },
    active: { opacity: 1, transition: { duration } }
  };
};

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(91, 112, 131, 0.4);
  z-index: 1400;
`;
