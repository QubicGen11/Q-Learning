import { create } from "zustand";
import Cookies from "js-cookie";
import { addToWishlist, getWishlist, removeFromWishlist } from "../utils/wishlist";
import { displayToast } from "../Components/Common/Toast/Toast";

const useWishlistStore = create((set, get) => ({
  favorites: new Set(),
  showLoginModal: false, // Modal visibility state
  openLoginModal: () => set({ showLoginModal: true }), // Open modal
  closeLoginModal: () => set({ showLoginModal: false }), // Close modal

  fetchWishlist: async () => {
    try {
      const response = await getWishlist();
      if (response?.wishlist) {
        const wishlistSet = new Set(response.wishlist.map((item) => item.courseId));
        set({ favorites: wishlistSet });
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  },

  toggleWishlist: async (courseId, e) => {
    e.stopPropagation(); // Prevent card click event

    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      // Save courseId to localStorage if user is not logged in
      const localWishlist = JSON.parse(localStorage.getItem("localWishlist")) || [];
      if (!localWishlist.includes(courseId)) {
        localWishlist.push(courseId);
        localStorage.setItem("localWishlist", JSON.stringify(localWishlist));
        displayToast("info", "Saved to wishlist. Log in to sync.");
      } else {
        displayToast("info", " Please Log in to save to wishlist.");
      }
      set({ showLoginModal: true }); // Show login modal
      return;
    }

    // If logged in, update server-side wishlist
    set((state) => {
      const updatedFavorites = new Set(state.favorites);
      if (updatedFavorites.has(courseId)) {
        removeFromWishlist(courseId);
        updatedFavorites.delete(courseId);
        displayToast("success", "Course removed from wishlist");
      } else {
        addToWishlist(courseId);
        updatedFavorites.add(courseId);
        displayToast("success", "Course added to wishlist");
      }
      return { favorites: updatedFavorites };
    });
  },

  syncLocalWishlist: async () => {
    // Sync local wishlist to server after login
    const localWishlist = JSON.parse(localStorage.getItem("localWishlist")) || [];
    if (localWishlist.length > 0) {
      for (const courseId of localWishlist) {
        await addToWishlist(courseId); // Add each course to server-side wishlist
      }
      displayToast("success", "Wishlist synced successfully.");
      localStorage.removeItem("localWishlist"); // Clear local wishlist
    }
    // Fetch updated wishlist from server
    get().fetchWishlist();
  },
}));

export default useWishlistStore;
