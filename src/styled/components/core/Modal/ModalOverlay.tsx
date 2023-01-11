import React, { FC, ReactElement } from "react";

import { motion } from "framer-motion";
import styled from "styled-components";

interface ModalOverlayProps {
  children: ReactElement | ReactElement[];
  onClose: () => void;
}

export const ModalOverlay: FC<ModalOverlayProps> = ({ children, onClose, ...props }) => {
  return (
    <Overlay
      variants={overlayVariants}
      initial="inactive"
      animate="active"
      exit="inactive"
      onClick={onClose}
      {...props}
    >
      {children}
    </Overlay>
  );
};

const overlayVariants = {
  inactive: { opacity: 0, transition: { duration: 0.1, delay: 0.05 } },
  active: { opacity: 1, transition: { duration: 0.1 } }
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
