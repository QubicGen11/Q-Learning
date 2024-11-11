import React from 'react';
import { useCart } from '../../context/CartContext';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Navbar_main from '../Navbar Components/Navbar_main';

const Cart = () => {
  const { cartItems, removeFromCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar_main />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <FiShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">Your cart is empty</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Start adding courses to your cart!
            </p>
            <div className="mt-6">
              <Link
                to="/courses"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium 
                         rounded-md text-white bg-[#A435F0] hover:bg-[#8710ED]"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar_main />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div 
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-start gap-4"
              >
                <img 
                  src={item.courseImage || item.logo} 
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.instructor}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-gray-900 dark:text-white">₹{item.price}</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Total</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                  <span className="font-medium text-gray-900 dark:text-white">₹{getCartTotal()}</span>
                </div>
                <button
                  className="w-full bg-[#A435F0] hover:bg-[#8710ED] text-white font-bold py-3 px-4 
                           rounded-lg transition-all duration-300"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;