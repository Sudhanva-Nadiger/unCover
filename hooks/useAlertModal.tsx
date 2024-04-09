import { create } from 'zustand';

type AlertModalState = {
  isOpen: boolean;
  loading: boolean
  open: () => void;
  close: () => void;
  setLoading: (val: boolean) => void;
};

export const useAlertModal = create<AlertModalState>((set) => ({
    isOpen: false,
    loading: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    setLoading: (val) => set({ loading: val }),
}));