import React, { useState } from 'react';
import { FiDollarSign, FiClock, FiUsers, FiPercent } from 'react-icons/fi';

const Pricing = ({ formData, setFormData }) => {
  const [pricingModel, setPricingModel] = useState(formData.pricingModel || 'one-time');

  const handlePricingChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  return (
    <div className="space-y-8">
      {/* Pricing Model Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Pricing Model</h3>
        <div className="grid grid-cols-3 gap-4">
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
            onClick={() => setPricingModel('subscription')}
            className={`p-4 border rounded-lg text-center ${
              pricingModel === 'subscription'
                ? 'border-purple-500 bg-purple-50'
                : 'hover:border-gray-300'
            }`}
          >
            <FiClock className="mx-auto h-6 w-6 mb-2" />
            <div className="font-medium">Subscription</div>
            <div className="text-sm text-gray-500">Recurring payment for access</div>
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
            {/* Regular Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Regular Price (₹)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handlePricingChange('price', e.target.value)}
                  className="pl-10 w-full p-3 border rounded-lg"
                  placeholder="0.00"
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
                  value={formData.salePrice}
                  onChange={(e) => handlePricingChange('salePrice', e.target.value)}
                  className="pl-10 w-full p-3 border rounded-lg"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Subscription Details */}
          {pricingModel === 'subscription' && (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Billing Cycle
                </label>
                <select
                  value={formData.billingCycle}
                  onChange={(e) => handlePricingChange('billingCycle', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trial Period (Days)
                </label>
                <input
                  type="number"
                  value={formData.trialPeriod}
                  onChange={(e) => handlePricingChange('trialPeriod', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="0"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Discount Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Discount Settings</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount (%)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiPercent className="text-gray-400" />
              </div>
              <input
                type="number"
                value={formData.discount}
                onChange={(e) => handlePricingChange('discount', e.target.value)}
                className="pl-10 w-full p-3 border rounded-lg"
                placeholder="0"
                min="0"
                max="100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coupon Code
            </label>
            <input
              type="text"
              value={formData.couponCode}
              onChange={(e) => handlePricingChange('couponCode', e.target.value)}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter coupon code"
            />
          </div>
        </div>
      </div>

      {/* Access Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Access Settings</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Access Duration
            </label>
            <select
              value={formData.accessDuration}
              onChange={(e) => handlePricingChange('accessDuration', e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              <option value="lifetime">Lifetime</option>
              <option value="limited">Limited Time</option>
            </select>
          </div>

          {formData.accessDuration === 'limited' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (Days)
              </label>
              <input
                type="number"
                value={formData.accessDays}
                onChange={(e) => handlePricingChange('accessDays', e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter number of days"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pricing; 