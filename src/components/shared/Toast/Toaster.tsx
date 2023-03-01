import React, { useEffect } from "react";

import { AnimatePresence } from "framer-motion";
import { useToasts } from "hooks/useToasts";
import { Portal } from "shared/Portal";
import useToastsStore from "store/toastsStore";
import styled from "styled-components";

import { Toast } from "./Toast";

const MAX_TOASTS_COUNT = 4;

export const Toaster = () => {
  const toasts = useToastsStore(state => state.toasts);
  const { handleRemoveToast } = useToasts();

  useEffect(() => {
    if (toasts.length >= MAX_TOASTS_COUNT) {
      const toastsToRemove = toasts.slice(MAX_TOASTS_COUNT);

      toastsToRemove.forEach(({ id }) => handleRemoveToast(id));
    }
  }, [handleRemoveToast, toasts]);

  return (
    <Portal rootId="toasts">
      <ToastsWrapper>
        <AnimatePresence initial={false}>
          {toasts.map(({ id, ...props }) => (
            <Toast key={id} id={id} {...props} />
          ))}
        </AnimatePresence>
      </ToastsWrapper>
    </Portal>
  );
};

const ToastsWrapper = styled.div`
  position: fixed;
  bottom: 53px;
  right: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 8px;
  padding: 12px;
  pointer-events: none;
  z-index: 1500;

  @media ${({ theme }) => theme.breakpoints.sm} {
    bottom: 0px;
  }
`;
