import type { ToastType } from "store/toastsStore";
import useToastsStore from "store/toastsStore";
import { shallow } from "zustand/shallow";

const DEFAULT_TOAST_DURATION = 4000;

export const useToasts = () => {
  const { addToast, removeToast } = useToastsStore(
    state => ({
      addToast: state.addToast,
      removeToast: state.removeToast
    }),
    shallow
  );

  const handleAddToast = (type: ToastType, message: string, duration = DEFAULT_TOAST_DURATION) => {
    addToast({ type, message, duration });
  };

  const handleRemoveToast = (toastId: string) => {
    removeToast(toastId);
  };

  return { handleAddToast, handleRemoveToast };
};
