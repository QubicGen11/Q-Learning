import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSidebarStore = create(
  persist(
    (set) => ({
      isCollapsed: false,
      toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
    }),
    {
      name: 'sidebar-storage', // unique name for localStorage key
    }
  )
);

export default useSidebarStore; 