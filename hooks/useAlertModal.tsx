import { create } from 'zustand';

type AlertModalState = {
  isOpen: boolean;
  loading: boolean;
  onOpen: () => void,
  onClose: () => void,
  setLoading: (val: boolean) => void;
};

export const useAlertModal = create<AlertModalState>((set) => ({
    isOpen: false,
    loading: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => {
      set((state) => ({...state, isOpen: false}))
    },
    setLoading: (val) => set({ loading: val }),
}));