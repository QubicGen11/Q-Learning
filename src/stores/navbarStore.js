import { create } from 'zustand';

const useNavbarStore = create((set) => ({
  isMenuOpen: false,
  isExploreOpen: false,
  isProfileDropdownOpen: false,
  isNotificationOpen: false,
  isWishlistOpen: false,
  selectedCategory: null,

  toggleMenu: () => set(state => ({ isMenuOpen: !state.isMenuOpen })),
  toggleExplore: () => set(state => ({ isExploreOpen: !state.isExploreOpen })),
  toggleProfileDropdown: () => set(state => ({ 
    isProfileDropdownOpen: !state.isProfileDropdownOpen,
    isNotificationOpen: false,
    isWishlistOpen: false
  })),
  toggleNotification: () => set(state => ({ 
    isNotificationOpen: !state.isNotificationOpen,
    isProfileDropdownOpen: false,
    isWishlistOpen: false
  })),
  toggleWishlist: () => set(state => ({ 
    isWishlistOpen: !state.isWishlistOpen,
    isProfileDropdownOpen: false,
    isNotificationOpen: false
  })),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  closeAll: () => set({
    isMenuOpen: false,
    isExploreOpen: false,
    isProfileDropdownOpen: false,
    isNotificationOpen: false,
    isWishlistOpen: false,
    selectedCategory: null
  })
}));

export default useNavbarStore;
