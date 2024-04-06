import { create } from 'zustand'

type Data = {
    url: string;
    fileName: string;
}

type SelectResume = {
    data: Data;
    onSelect: (value: Data) => void
}

export const useSelectResume = create<SelectResume>((set) => ({
    data: {
        url: '',
        fileName: ''
    },
    onSelect: (value: Data) => set({ data: value}) 
}))