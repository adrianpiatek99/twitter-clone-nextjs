import type { FC, ReactNode} from "react";
import React, { useEffect } from "react";
import { RemoveScrollBar } from "react-remove-scroll-bar";

import { motion } from "framer-motion";
import styled from "styled-components";

interface ModalPanelProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
  preventClosingOnOutside?: boolean;
}

export const ModalPanel: FC<ModalPanelProps> = ({
  children,
  isOpen,
  onClose,
  duration,
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
    <Panel>
      <Overlay
        variants={overlayVariants(duration)}
        initial="inactive"
        animate="active"
        exit="inactive"
        onClick={() => !preventClosingOnOutside && onClose()}
        {...props}
      />
      <RemoveScrollBar />
      {children}
    </Panel>
  );
};

const overlayVariants = (duration = 0.2) => {
  return {
    inactive: { opacity: 0, transition: { duration } },
    active: { opacity: 1, transition: { duration } }
  };
};

const Panel = styled.div`
  display: grid;
  place-items: center;
  position: fixed;
  inset: 0px;
  padding: 12px;
  z-index: 1400;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0px;
  background-color: rgba(91, 112, 131, 0.3);
  z-index: -1;
  backdrop-filter: blur(5px);
`;
