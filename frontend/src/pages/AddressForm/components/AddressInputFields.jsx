import React from "react";

const AddressInputFields = ({ formData, handleChange }) => {
  return (
    <>
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Full Name
        </label>
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Address Line 1
        </label>
        <input
          type="text"
          name="address_line1"
          value={formData.address_line1}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Address Line 2 (Optional)
        </label>
        <input
          type="text"
          name="address_line2"
          value={formData.address_line2}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Zip Code
          </label>
          <input
            type="text"
            name="zip_code"
            value={formData.zip_code}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Phone Number
        </label>
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          required
          maxLength="10"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Address Type
        </label>
        <select
          name="address_type"
          value={formData.address_type}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
        >
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="shipping">Shipping</option>
          <option value="billing">Billing</option>
        </select>
      </div>
    </>
  );
};

export default AddressInputFields;
