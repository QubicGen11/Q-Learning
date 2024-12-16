// Cart.jsx
import React from 'react';
import { FiX } from 'react-icons/fi';
import Newnavbar from './Newnavbar';
import RelatedCourses from './RelatedCourses';
import Footer from '../Footer/Footer';

const Cart = () => {
  const cartItems = [
    {
      title: "REAL WORLD UX | LEARN USER EXPERIENCE & START YOUR CAREER",
      instructor: "Instructor Name",
      duration: "12 HOURS OF LEARNING",
      lectures: "344 LECTURES",
      level: "ALL LEVELS",
      rating: "4.2",
      reviews: "326",
      price: "₹649/-",
      originalPrice: "₹3,099/-",
      discount: "79% off",
      image: "https://images.unsplash.com/photo-1555967522-37949fc21dcb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3N8ZW58MHx8MHx8fDA%3D"
    }
  ];



  return (
    <>
      <Newnavbar />
      <div className="max-w-[1200px] mx-auto px-4 py-4 ">
        {/* Header with count and total */}
        <div className="flex justify-between items-start mb-6  w-full p-3">
          <div className="flex items-center">
            <span className="bg-[#0056B3] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2">1</span>
            <h1 className="text-3xl font-semibold " >Course(s) in Cart</h1>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <div className="text-xs text-right text-gray-600">Total</div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">₹649</span>
                <span className="text-black font-semibold line-through text-xs">₹3,099</span>
                <span className="text-xs text-black font-semibold">79% off</span>
              </div>
            </div>
            <button className="bg-[#0056B3] text-white px-4 py-1.5 rounded text-sm">
              Checkout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-6">
          {/* Cart Item */}
          <div className="flex gap-4">
            <img 
              src={cartItems[0].image}
              alt={cartItems[0].title}
              className="w-32 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="text-sm font-medium">{cartItems[0].title}</h3>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                <span>{cartItems[0].duration}</span>
                <span>•</span>
                <span>{cartItems[0].lectures}</span>
                <span>•</span>
                <span>{cartItems[0].level}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-yellow-400 text-xs">★★★★★</span>
                <span className="text-xs text-gray-600">({cartItems[0].rating} | {cartItems[0].reviews})</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-[#0056B3] font-bold text-2xl">{cartItems[0].price}</span>
                <span className="text-gray-500 line-through text-xs">{cartItems[0].originalPrice}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <button className="text-blue-600 text-xs hover:underline hover:bg-[#F3F4F6] p-2 rounded-lg">Remove</button>
                <span className="text-gray-300">|</span>
                <button className="text-[#0056B3] text-xs hover:underline hover:bg-[#F3F4F6] p-2 rounded-lg">Save For Later</button>
              </div>
            </div>
          </div>

          {/* Apply Coupon */}
          <div>
            <h3 className="text-sm mb-2">Apply Coupon</h3>
            <div className="flex  max-w-sm">
              <input 
                type="text" 
                value="STRPMT122224"
                readOnly
                className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm"
              />
              <button className="bg-[#0056B3] text-white px-4 py-1.5 rounded text-sm">
                Apply
              </button>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-xs text-gray-600">QubiNext coupon</span>
              <button>
                <FiX size={14} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Related Courses */}
          
          <div>
            <RelatedCourses/>
          </div>
         
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Cart;