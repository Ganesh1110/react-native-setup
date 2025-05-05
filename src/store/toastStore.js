import {create} from 'zustand';

let id = 0;

export const useToastStore = create(set => ({
  toasts: [],
  showToast: toast => {
    const newToast = {id: id++, ...toast};
    set(state => ({
      toasts: [...state.toasts, newToast],
    }));

    if (toast.duration !== 0) {
      setTimeout(() => {
        set(state => ({
          toasts: state.toasts.filter(t => t.id !== newToast.id),
        }));
      }, toast.duration || 3000);
    }
  },
  hideToast: toastId =>
    set(state => ({
      toasts: state.toasts.filter(t => t.id !== toastId),
    })),
}));
