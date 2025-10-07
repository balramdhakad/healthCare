import React from "react";

const AddressCard = ({ title, address }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      {address ? (
        <>
          <p className="text-gray-800 font-medium">{address.fullname}</p>
          {address.address_line1 && (
            <p className="text-gray-600">{address.address_line1}</p>
          )}
          {address.address_line2 && (
            <p className="text-gray-600">{address.address_line2}</p>
          )}
          {address.street_address && (
            <p className="text-gray-600">{address.street_address}</p>
          )}
          <p className="text-gray-600">
            {address.city}, {address.state} {address.zip_code}
          </p>
          <p className="text-gray-600">{address.country}</p>
          {address.phone_number && (
            <p className="text-gray-600 mt-2 font-medium">
              Phone: {address?.phone_number}
            </p>
          )}
        </>
      ) : (
        <p className="text-gray-500">Address details not available.</p>
      )}
    </div>
  );
};

export default AddressCard;
