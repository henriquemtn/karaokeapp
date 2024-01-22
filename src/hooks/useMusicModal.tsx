import { create } from 'zustand';

interface MusicModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useMusicModal = create<MusicModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));