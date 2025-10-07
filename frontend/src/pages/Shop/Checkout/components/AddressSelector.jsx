import React from "react";
import { getAddressDisplayString } from "../../../../components/FormateAddress";


const AddressSelector = ({
  addresses,
  shippingAddress,
  setShippingAddress,
  billingAddress,
  setBillingAddress,
}) => {
  if (!addresses.length) {
    return (
      <div className="text-center mb-6 text-gray-500">
        No saved addresses found.
        <br />
        <a
          href="/address/new"
          className="text-teal-600 hover:underline font-medium"
        >
          + Add New Address
        </a>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-4 mb-6">
      <div>
        <label className="block font-medium mb-2">Shipping Address</label>
        <select
          className="border p-2 rounded w-full"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        >
          <option value="">Select shipping address</option>
          {addresses.map((addr) => (
            <option key={addr._id} value={addr._id}>
              {getAddressDisplayString(addr)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium mb-2">Billing Address</label>
        <select
          className="border p-2 rounded w-full"
          value={billingAddress}
          onChange={(e) => setBillingAddress(e.target.value)}
        >
          <option value="">Select billing address</option>
          {addresses.map((addr) => (
            <option key={addr._id} value={addr._id}>
              {getAddressDisplayString(addr)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AddressSelector;
