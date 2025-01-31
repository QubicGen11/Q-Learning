import { create } from "zustand";
import Cookies from "js-cookie";
import axios from "axios";
import { displayToast } from "../Components/Common/Toast/Toast";

const useCartStore = create((set, get) => ({
  cartItems: [],
  loading: false,
  showLoginModal: false, // ✅ State to control login modal visibility

  // ✅ Function to show or hide the modal
  toggleLoginModal: (value) => set({ showLoginModal: value }),

  fetchCart: async () => {
    set({ loading: true });

    try {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        console.error("Access token is missing.");
        set({ showLoginModal: true, loading: false }); // ✅ Trigger login modal
        return;
      }

      const response = await axios.get("http://localhost:8089/qlms/cartItems", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("API Response:", response.data);

      console.log("API Response:", response.data);
      const cart = response.data?.cart || []; // Ensure cart exists
      set({ cartItems: cart, loading: false });
    } catch (error) {
      console.error("Error fetching cart items:", error);
      set({ loading: false });
    }
  },

  addToCart: async (courseId) => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      console.error("Access token is missing.");
      set({ showLoginModal: true }); // ✅ Trigger login modal
      displayToast("info", "Please log in to add this course to your cart.");
      return;
    }

    try {
      // Add the course to the cart
      await axios.post(
        "http://localhost:8089/qlms/addToCart",
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Update Zustand state after adding the course
      set((state) => ({
        cartItems: [...state.cartItems, { courseId }], // Add the new course
      }));

      displayToast("success", "Course added to cart successfully.");
      console.log(`Course ${courseId} added to cart successfully.`);
    } catch (error) {
      console.error("Error adding course to cart:", error);
      displayToast("error", "Failed to add course to cart. Please try again.");
    }
  },

  removeFromCart: async (courseId) => {
    try {
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        console.error("Access token is missing.");
        set({ showLoginModal: true }); // Show login modal
        return;
      }
  
      // ✅ Optimistically update the state before API call
      set((state) => ({
        cartItems: state.cartItems.filter((item) => item.courseId !== courseId),
      }));
  
      // 🛑 Make sure to send the correct request payload
      await axios.delete("http://localhost:8089/qlms/removecart", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        data: { courseId }, // ✅ Send courseId in the request body
      });
  
      console.log(`Course ${courseId} removed from cart successfully.`);
    } catch (error) {
      console.error("Error removing course from cart:", error);
    }
  },
  

  toggleCartItem: async (courseId) => {
    // Check if the course is already in the cart
    const isAddedToCart = get().cartItems.some((item) => item.courseId === courseId);

    if (isAddedToCart) {
      await get().removeFromCart(courseId); // Remove from cart
    } else {
      await get().addToCart(courseId); // Add to cart
    }
  },
}));

export default useCartStore;
