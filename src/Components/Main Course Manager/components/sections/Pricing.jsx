import React, { useState } from 'react';
import { FiDollarSign, FiUsers, FiPercent } from 'react-icons/fi';
import useCourseStore from '../../../../store/courseStore';

const Pricing = () => {
  const courseData = useCourseStore((state) => state.courseData);
  const updateCourseData = useCourseStore((state) => state.updateCourseData);
  const [pricingModel, setPricingModel] = useState('one-time');

  const handlePricingChange = (field, value) => {
    if (field === 'price' && value > courseData.originalPrice) {
      alert('Sale price cannot be greater than original price');
      return;
    }
    
    updateCourseData({ [field]: value });
  };

  // Calculate discount percentage
  const calculateDiscount = () => {
    if (!courseData.originalPrice || !courseData.price) return null;
    const discount = ((courseData.originalPrice - courseData.price) / courseData.originalPrice) * 100;
    return Math.round(discount);
  };

  // Update discount when prices change
  const updateDiscount = () => {
    if (courseData.originalPrice > 0 && courseData.price >= 0) {
      const discount = ((courseData.originalPrice - courseData.price) / courseData.originalPrice) * 100;
      if (discount > 0) {
        updateCourseData({ discount: `${Math.round(discount)}%` });
      } else {
        updateCourseData({ discount: null });
      }
    } else {
      updateCourseData({ discount: null });
    }
  };

  return (
    <div className="space-y-8">
      {/* Pricing Model Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Pricing Model</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setPricingModel('one-time')}
            className={`p-4 border rounded-lg text-center ${
              pricingModel === 'one-time'
                ? 'border-purple-500 bg-purple-50'
                : 'hover:border-gray-300'
            }`}
          >
            <FiDollarSign className="mx-auto h-6 w-6 mb-2" />
            <div className="font-medium">One-time Payment</div>
            <div className="text-sm text-gray-500">Single payment for lifetime access</div>
          </button>

          <button
            onClick={() => setPricingModel('free')}
            className={`p-4 border rounded-lg text-center ${
              pricingModel === 'free'
                ? 'border-purple-500 bg-purple-50'
                : 'hover:border-gray-300'
            }`}
          >
            <FiUsers className="mx-auto h-6 w-6 mb-2" />
            <div className="font-medium">Free</div>
            <div className="text-sm text-gray-500">Open access for everyone</div>
          </button>
        </div>
      </div>

      {/* Price Settings */}
      {pricingModel !== 'free' && (
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Price Settings</h3>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Original Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price (₹)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  value={courseData.originalPrice || ''}
                  onChange={(e) => {
                    handlePricingChange('originalPrice', e.target.value ? Number(e.target.value) : '');
                    updateDiscount();
                  }}
                  className="pl-10 w-full p-3 border rounded-lg"
                  placeholder="0.00"
                  min="0"
                />
              </div>
            </div>

            {/* Sale Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sale Price (₹)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  value={courseData.price || ''}
                  onChange={(e) => {
                    handlePricingChange('price', e.target.value ? Number(e.target.value) : '');
                    updateDiscount();
                  }}
                  className="pl-10 w-full p-3 border rounded-lg"
                  placeholder="0.00"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Discount Display */}
          {courseData.discount && (
            <div className="flex items-center gap-2 text-green-600">
              <FiPercent />
              <span>Discount: {courseData.discount}</span>
            </div>
          )}
        </div>
      )}

      {/* Access Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Access Settings</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Access Duration
          </label>
          <select
            value={courseData.accessDuration}
            onChange={(e) => handlePricingChange('accessDuration', e.target.value)}
            className="w-full p-3 border rounded-lg"
          >
            <option value="lifetime">Lifetime</option>
            <option value="limited">Limited Time</option>
          </select>
        </div>

        {courseData.accessDuration === 'limited' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (Days)
            </label>
            <input
              type="number"
              value={courseData.accessDays}
              onChange={(e) => handlePricingChange('accessDays', e.target.value)}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter number of days"
              min="1"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Pricing; 