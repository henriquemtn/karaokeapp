import { create } from 'zustand';

interface AllMusicusAllMusicsModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAllMusicsModal = create<AllMusicusAllMusicsModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));