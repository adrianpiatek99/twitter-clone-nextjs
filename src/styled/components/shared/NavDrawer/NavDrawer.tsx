import React from "react";
import FocusLock from "react-focus-lock";

import { ModalPanel } from "components/core/Modal";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSession } from "hooks/useAppSession";
import { Portal } from "shared/Portal";
import { setNavDrawerOpen } from "store/slices/globalSlice";
import { useAppDispatch, useAppSelector } from "store/store";
import styled from "styled-components";

import { NavDrawerHeader } from "./NavDrawerHeader";
import { NavDrawerPrimaryList } from "./NavDrawerPrimaryList";
import { NavDrawerSecondaryList } from "./NavDrawerSecondaryList";

export const NavDrawer = () => {
  const { isAuthenticated } = useAppSession();
  const isOpen = useAppSelector(state => state.global.isNavDrawerOpen);
  const dispatch = useAppDispatch();

  const onClose = () => dispatch(setNavDrawerOpen(false));

  return (
    <AnimatePresence>
      {isOpen && (
        <Portal rootId="modal">
          <FocusLock autoFocus={false}>
            <ModalPanel isOpen={isOpen} onClose={onClose} duration={0.25}>
              <DrawerWrapper
                variants={drawerVariants}
                onClick={e => e.stopPropagation()}
                initial="inactive"
                animate="active"
                exit="inactive"
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
            </ModalPanel>
          </FocusLock>
        </Portal>
      )}
    </AnimatePresence>
  );
};

const drawerVariants = {
  inactive: {
    x: "-100%",
    transition: { duration: 0.2 }
  },
  active: {
    x: 0,
    transition: { duration: 0.2 }
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
  border-radius: 0 16px 16px 0;
  outline: none;
  overflow: hidden;
`;

const Divider = styled.div`
  height: 1px;
  margin: 2px auto;
  width: 89%;
  background-color: ${({ theme }) => theme.border};
`;
