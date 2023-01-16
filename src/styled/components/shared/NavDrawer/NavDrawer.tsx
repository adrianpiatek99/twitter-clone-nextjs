import React, { useEffect } from "react";

import FocusTrap from "@mui/base/FocusTrap";
import { ModalOverlay } from "components/core/Modal";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSession } from "hooks/useAppSession";
import { Portal } from "shared/Portal";
import { setNavDrawerOpen } from "store/slices/modalsSlice";
import { useAppDispatch, useAppSelector } from "store/store";
import styled from "styled-components";

import { NavDrawerHeader } from "./NavDrawerHeader";
import { NavDrawerPrimaryList } from "./NavDrawerPrimaryList";
import { NavDrawerSecondaryList } from "./NavDrawerSecondaryList";

export const NavDrawer = () => {
  const { isAuthenticated } = useAppSession();
  const { isOpen } = useAppSelector(state => state.modals.navDrawer);
  const dispatch = useAppDispatch();

  const onClose = () => dispatch(setNavDrawerOpen(false));

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
    <>
      <AnimatePresence>
        {isOpen && (
          <Portal rootId="modal">
            <ModalOverlay onClose={onClose} duration={0.25}>
              <FocusTrap open>
                <DrawerWrapper
                  variants={drawerVariants}
                  onClick={e => e.stopPropagation()}
                  tabIndex={-1}
                >
                  <NavDrawerHeader onClose={onClose} />
                  {isAuthenticated && (
                    <>
                      <NavDrawerPrimaryList onClose={onClose} />
                      <Divider />
                      <NavDrawerSecondaryList onClose={onClose} />
                    </>
                  )}
                </DrawerWrapper>
              </FocusTrap>
            </ModalOverlay>
          </Portal>
        )}
      </AnimatePresence>
    </>
  );
};

const drawerVariants = {
  inactive: {
    x: "-100%",
    transition: { duration: 0.25 }
  },
  active: {
    x: 0,
    transition: { duration: 0.25 }
  }
};

const DrawerWrapper = styled(motion.div)`
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  max-width: 320px;
  width: 90%;
  background-color: ${({ theme }) => theme.background};
  border-right: 1px solid ${({ theme }) => theme.border};
  outline: none;
`;

const Divider = styled.div`
  height: 1px;
  margin: 2px auto;
  width: 89%;
  background-color: ${({ theme }) => theme.border};
`;
