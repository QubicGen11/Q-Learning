import { create } from 'zustand';

const useNavbarStore = create((set) => ({
  isMenuOpen: false,
  isExploreOpen: false,
  isProfileDropdownOpen: false,
  selectedCategory: null,

  toggleMenu: () => set(state => ({ isMenuOpen: !state.isMenuOpen })),
  toggleExplore: () => set(state => ({ isExploreOpen: !state.isExploreOpen })),
  toggleProfileDropdown: () => set(state => ({ isProfileDropdownOpen: !state.isProfileDropdownOpen })),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  closeAll: () => set({
    isMenuOpen: false,
    isExploreOpen: false,
    isProfileDropdownOpen: false,
    selectedCategory: null
  })
}));

export default useNavbarStore;
