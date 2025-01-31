import React, { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import Newnavbar from "./Newnavbar";
import RelatedCourses from "./RelatedCourses";
import Footer from "../Footer/Footer";
import useCartStore from "../../../stores/useCartStore"; // ✅ Ensure correct import
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const Cart = () => {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [referralCode, setReferralCode] = useState("");
  const [appliedReferral, setAppliedReferral] = useState(null);
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
                  <div className="text-xs  text-gray-600  text-start">Total</div>
                  <div className="flex items-center gap-2">
                    {/* Display the total of all offered prices */}
                    <span className="text-3xl font-bold text-black">
                      ₹
                      {cartItems.reduce((total, item) => {
                        const offeredPrice = item.course?.courseSettings?.[0]?.offeredPrice || 0;
                        return total + parseFloat(offeredPrice);
                      }, 0).toFixed(2)}
                    </span>

                    {/* Display the total of all actual prices */}
                    <span className="text-xl font-bold line-through text-gray-600 mt-3">
                      ₹
                      {cartItems.reduce((total, item) => {
                        const actualPrice = item.course?.courseSettings?.[0]?.price || 0;
                        return total + parseFloat(actualPrice);
                      }, 0).toFixed(2)}
                    </span>
                  </div>

                  {/* Display the total savings percentage */}
                  <div className="text-sm text-gray-500">

                    {(() => {
                      const totalActualPrice = cartItems.reduce((total, item) => {
                        const actualPrice = item.course?.courseSettings?.[0]?.price || 0;
                        return total + parseFloat(actualPrice);
                      }, 0);

                      const totalOfferedPrice = cartItems.reduce((total, item) => {
                        const offeredPrice = item.course?.courseSettings?.[0]?.offeredPrice || 0;
                        return total + parseFloat(offeredPrice);
                      }, 0);

                      // Calculate percentage savings
                      const savingsPercentage = totalActualPrice
                        ? (((totalActualPrice - totalOfferedPrice) / totalActualPrice) * 100).toFixed(2)
                        : 0;

                      return ` ${savingsPercentage} % off`;
                    })()}
                  </div>
                </div>

                <button className="bg-[#0056B3] text-white px-4 py-1.5 rounded text-sm">Checkout</button>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col gap-6 p-2">
                {cartItems.map((item, index) => {
                  if (!item.course) {
                    console.warn(`Cart item at index ${index} has no course property:`, item);
                    return null; // Skip rendering if course is undefined
                  }


                  const courseSettings = item.course.courseSettings?.[0]; // Access courseSettings safely
                  const offeredPrice = courseSettings?.offeredPrice || "N/A"; // Offered price
                  const price = courseSettings?.price || "N/A"; // Regular price


                  return (

                    <>

                      <div
                        key={item.course.id}
                        className="flex gap-4  cursor-pointer  transition-all rounded-md w-[50vw] border-b border-gray-300"
                        onClick={() => handleNavigate(item.course.id)}
                      >
                        <img
                          src={item.course.courseImage}
                          alt={item.course.courseName}
                          className="w-40 h-32 object-cover "
                        />
                        <div className="flex-1 mt-4  justify-center items-center">
                          <h3 className="text-sm font-medium">{item.course.courseName}</h3>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                            <span>{item.course.courseDuration} HOURS OF LEARNING</span>
                            <span>•</span>
                            <span>{item.course.courseDuration} LECTURES</span>
                            <span>•</span>
                            <span>{item.course.difficultyLevel}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                            <span>By {item.course.trainerName}</span>
                            <span>•</span>
                            <span> ⭐⭐⭐⭐⭐ (4.2 | 326)</span>
                            {/* <span>•</span> */}
                            {/* <span>{item.course.courseCategory}</span> */}
                          </div>

                          <div className="flex items-center gap-5 justify-between">
                            <div className="flex items-center gap-4">
                              <button className="text-[#0056b3] py-1.5 rounded text-2xl font-bold">
                                ₹{offeredPrice}/-
                              </button>
                              <button className="text-[#4B5563] py-1.5 rounded text-lg mt-2 line-through  " >
                                ₹{price}/-
                              </button>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                className="text-[#0056b3] py-1.5 px-2 rounded text-md hover:bg-[#f3f4f6]"
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent navigation when clicking remove
                                  handleRemove(item.courseId);
                                }}
                              >
                                Remove
                              </button>
                              <button className="text-[#0056b3] py-1.5 rounded text-md bg-[#f3f4f6] p-2 hover:bg-[#0056b3] hover:text-[#f3f4f6]">
                                Save For Later
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                    </>
                  );
                })}

              </div>

              {/* Apply Coupon */}
              <div className="flex flex-col gap-4">
                {/* Coupon Section */}
                <div>
                  <h3 className="text-sm mb-2 text-gray-600">Apply Coupon</h3>
                  {appliedCoupon && (
                    <div className="flex items-center border border-gray-300 p-2 rounded mb-2" style={{border: "2px dotted #676879"}}>
                      <p className="text-sm flex-1 text-gray-600"><span style={{textTransform:"uppercase"}}>{appliedCoupon}</span> is applied <p className="text-capitalize">QubiNest coupon</p></p>
                      <button
                        className="text-gray-600 text-sm font-bold px-2"
                        onClick={() => {
                          setAppliedCoupon(null); // Remove the coupon
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  <div className="flex max-w-sm">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter Coupon Code"
                      className="flex-1  rounded px-3 py-1.5 text-sm rounded-r-none focus:outline-none"
                      style={{border: "1px solid #676879",  borderRight: "none"  }}
                      disabled={!!appliedReferral} // Disable if a referral is applied
                    />
                    <button
                      onClick={() => {
                        if (couponCode) {
                          setAppliedCoupon(couponCode);
                          setAppliedReferral(null); // Clear referral if coupon is applied
                          setCouponCode("");
                        }
                      }}
                      className={`px-4 py-1.5 rounded text-sm -ml-2 ${appliedReferral ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "border border-[#0056B3] text-[#0056B3]"
                        }`}
                      disabled={!!appliedReferral} // Disable if a referral is applied
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Referral Section */}
                <div>
                    <h3 className="text-sm mb-2 text-gray-600">Referral Code</h3>
                  {appliedReferral && (
                    <div className="flex items-center  p-2 rounded mb-2" style={{border: "2px dotted #676879"}}>
                      <p className="text-sm flex-1 text-gray-600"><span style={{textTransform:"uppercase"}}>{appliedReferral}</span> is applied <p className="text-capitalize">QubiNest referral code</p></p>
                      <button
                        className="text-gray-600 text-sm font-bold px-2"
                        onClick={() => {
                          setAppliedReferral(null); // Remove the referral
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  <div className="flex max-w-sm">
                    <input
                      type="text"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder="Enter Referral Code"
                      className="flex-1  rounded px-3 py-1.5 text-sm rounded-r-none focus:outline-none"
                      style={{border: "1px solid #676879",  borderRight: "none"  }}
                      disabled={!!appliedCoupon} // Disable if a coupon is applied
                    />
                    <button
                      onClick={() => {
                        if (referralCode) {
                          setAppliedReferral(referralCode);
                          setAppliedCoupon(null); // Clear coupon if referral is applied
                          setReferralCode("");
                        }
                      }}
                      className={`px-4 py-1.5 rounded text-sm -ml-2 ${appliedCoupon ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "border border-[#0056B3] text-[#0056B3]"
                        }`}
                      disabled={!!appliedCoupon} // Disable if a coupon is applied
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>



            </div>
            {/* Cart Items */}

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
