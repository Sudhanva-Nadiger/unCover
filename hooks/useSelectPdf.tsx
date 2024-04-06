import { create } from 'zustand'

type Data = {
    url: string;
    fileName: string;
    resumeId: string;
}

type SelectResume = {
    data: Data;
    onSelect: (value: Data) => void
}

export const useSelectResume = create<SelectResume>((set) => ({
    data: {
        url: '',
        fileName: '',
        resumeId: ''
    },
    onSelect: (value: Data) => set({ data: value}) 
}))