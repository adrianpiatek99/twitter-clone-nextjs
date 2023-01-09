import { addToast, removeToast, ToastType } from "store/slices/toastsSlice";
import { useAppDispatch } from "store/store";

const DEFAULT_TOAST_DURATION = 4000;

export const useToasts = () => {
  const dispatch = useAppDispatch();

  const handleAddToast = (type: ToastType, message: string, duration = DEFAULT_TOAST_DURATION) => {
    dispatch(addToast({ type, message, duration }));
  };

  const handleRemoveToast = (toastId: string) => {
    dispatch(removeToast(toastId));
  };

  return { handleAddToast, handleRemoveToast };
};
