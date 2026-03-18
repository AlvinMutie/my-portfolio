import { create } from "zustand";

interface ScrollState {
  progress: number;
  currentSection: number;
  mouse: { x: number; y: number };
  setProgress: (progress: number) => void;
  setCurrentSection: (section: number) => void;
  setMouse: (x: number, y: number) => void;
}

export const useStore = create<ScrollState>((set) => ({
  progress: 0,
  currentSection: 0,
  mouse: { x: 0, y: 0 },
  setProgress: (progress) => set({ progress }),
  setCurrentSection: (currentSection) => set({ currentSection }),
  setMouse: (x, y) => set({ mouse: { x, y } }),
}));
