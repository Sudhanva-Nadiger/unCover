import { create } from 'zustand'

type UploadModal = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useUploadModal = create<UploadModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false})
}))