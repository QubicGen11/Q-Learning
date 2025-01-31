import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";
import Newnavbar from "./Newnavbar";
import RelatedCourses from "./RelatedCourses";
import Footer from "../Footer/Footer";
import useCartStore from "../../../stores/useCartStore"; // ✅ Ensure correct import
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const Cart = () => {
  const { cartItems, fetchCart, removeFromCart, loading } = useCartStore(); // ✅ Correct hook usage
  const navigate = useNavigate(); // ✅ Initialize useNavigate hook

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return <div>Loading cart...</div>;
  }

  const handleRemove = (courseId) => {
    console.log("Removing course with ID:", courseId);
    removeFromCart(courseId);
  };

  const handleNavigate = (courseId) => {
    if (!courseId) return;
    navigate(`/course/${courseId}`);
  };

  console.log("Cart items:", cartItems); // Debug cart items

  return (
    <>
      <Newnavbar />
      <div className="max-w-[1200px] mx-auto px-4 py-4">
        {/* If cart is empty */}
        {!loading && (!cartItems || cartItems.length === 0) && (
          <div className="flex flex-col items-center justify-center min-h-[600px] bg-white">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Cart (0)</h1>
            <p className="text-sm md:text-base text-gray-500 mt-2">Empty cart, no course has been added to purchase</p>
            <img
              src="https://res.cloudinary.com/defsu5bfc/image/upload/v1738318712/Group_hbebvm.png"
              alt="Empty Cart Illustration"
              className="w-36 md:w-80 mt-6"
            />
            <button className="mt-8 bg-[#0056B3] hover:bg-[#003F89] text-white px-8 py-3 rounded-lg text-sm md:text-base font-medium">
              Explore Courses
            </button>
            <div className="mt-4">
              <a href="/" className="text-sm md:text-base text-[#0056B3] hover:underline">
                Keep Shopping, Home
              </a>
            </div>
          </div>
        )}

        {/* If cart has items */}
        {!loading && cartItems && cartItems.length > 0 && (
          <>
            <div className="flex justify-between items-start mb-6 w-full p-3">
              <div className="flex items-center">
                <span className="bg-[#0056B3] text-3xl text-white rounded-full w-10 h-10 flex items-center justify-center mr-2">
                  {cartItems.length}
                </span>
                <h1 className="text-3xl font-semibold">Course(s) in Cart</h1>
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-xs text-right text-gray-600">Total</div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold">
                      ₹
                      {cartItems.reduce(
                        (total, item) => total + parseFloat(item?.course?.price || 0),
                        0
                      )}
                    </span>
                  </div>
                </div>
                <button className="bg-[#0056B3] text-white px-4 py-1.5 rounded text-sm">Checkout</button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex flex-col gap-6 p-2">
              {cartItems.map((item, index) => {
                if (!item.course) {
                  console.warn(`Cart item at index ${index} has no course property:`, item);
                  return null; // Skip rendering if course is undefined
                }

                return (
                  <div
                    key={item.course.id}
                    className="flex gap-4 p-3 cursor-pointer hover:bg-gray-100 transition-all rounded-md"
                    onClick={() => handleNavigate(item.course.id)}
                  >
                    <img
                      src={item.course.courseImage}
                      alt={item.course.courseName}
                      className="w-32 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{item.course.courseName}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <span>{item.course.courseDuration} HOURS</span>
                        <span>•</span>
                        <span>{item.course.difficultyLevel}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent navigation when clicking remove
                            handleRemove(item.courseId);
                          }}
                          className="text-[#0056b3] text-xs hover:underline hover:bg-[#F3F4F6] p-2 rounded-lg"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center gap-5 justify-between">
                        <div className="flex items-center gap-2">

                        <button className=" text-[#0056b3]  py-1.5 rounded text-2xl ">₹{item.courseSettings?.[0]?.offeredPrice || "N/A"}</button>
                        <button className=" text-black  py-1.5 rounded text-lg font-bold ">23232</button>
                        </div>
                        <div className="flex items-center gap-2">

                        <button className=" text-[#0056b3]  py-1.5 rounded text-md  ">Remove</button>
                        <button className=" text-[#0056b3]  py-1.5 rounded text-md  bg-[#f3f4f6] p-2">Save For Later</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Apply Coupon */}
            <div>
              <h3 className="text-sm mb-2">Apply Coupon</h3>
              <div className="flex max-w-sm">
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm"
                />
                <button className="bg-[#0056B3] text-white px-4 py-1.5 rounded text-sm">Apply</button>
              </div>
            </div>

            {/* Related Courses */}
            <div>
              <RelatedCourses />
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
