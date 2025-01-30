import { create } from "zustand";
import Cookies from "js-cookie";
import { addToWishlist, getWishlist, removeFromWishlist } from "../utils/wishlist";
import { displayToast } from "../Components/Common/Toast/Toast";

const useWishlistStore = create((set) => ({
  favorites: new Set(),

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
      displayToast("error", "Please login to add to wishlist");
      return;
    }

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
}));

export default useWishlistStore;
