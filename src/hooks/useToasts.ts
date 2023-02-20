import type { ToastType } from "store/toastsStore";
import useToastsStore from "store/toastsStore";

const DEFAULT_TOAST_DURATION = 4000;

export const useToasts = () => {
  const addToast = useToastsStore(state => state.addToast);
  const removeToast = useToastsStore(state => state.removeToast);

  const handleAddToast = (type: ToastType, message: string, duration = DEFAULT_TOAST_DURATION) => {
    addToast({ type, message, duration });
  };

  const handleRemoveToast = (toastId: string) => {
    removeToast(toastId);
  };

  return { handleAddToast, handleRemoveToast };
};
