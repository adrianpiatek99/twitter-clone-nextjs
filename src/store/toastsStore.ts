import { v4 } from "uuid";
import { create } from "zustand";

export type ToastType = "success" | "information" | "error" | "warning";

export type ToastProps = {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
};

interface ToastsStore {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, "id">) => void;
  removeToast: (toastId: string) => void;
  removeAllToasts: () => void;
}

const initialState = {
  toasts: []
};

const useToastsStore = create<ToastsStore>(set => ({
  ...initialState,
  addToast: toast => {
    const newToast = {
      id: v4(),
      ...toast
    };

    set(state => ({ toasts: [newToast, ...state.toasts] }));
  },
  removeToast: toastId =>
    set(state => ({ toasts: state.toasts.filter(({ id }) => id !== toastId) })),
  removeAllToasts: () => set({ toasts: [] })
}));

export default useToastsStore;
