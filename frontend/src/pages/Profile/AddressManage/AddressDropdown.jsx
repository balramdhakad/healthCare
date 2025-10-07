import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../../utilus/axiosInstance";
import {
  formatAddress,
  getAddressDisplayString,
} from "../../../components/FormateAddress";

const AddressDropdown = ({ token }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  const fetchAddresses = async () => {
    try {
      const res = await axiosInstance.get("/addresses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data.data || [];
      setAddresses(data);

      const defaultAddr = data.find((addr) => addr.is_default);
      setSelectedAddressId(defaultAddr?._id || data[0]?._id || "");
    } catch (err) {
      toast.error("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  const setDefault = async ({ id, addressType }) => {
    try {
      await axiosInstance.put(
        `/addresses/${id}/default`,
        { addressType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Set as default");
      fetchAddresses();
    } catch (err) {
      toast.error("Failed to set default address");
      console.log(err);
    }
  };

  const deleteAddress = async (id) => {
    if (!window.confirm("Delete this address?")) return;
    try {
      await axiosInstance.delete(`/addresses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Address deleted");
      fetchAddresses();
    } catch (err) {
      toast.error("Failed to delete address");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  if (loading) return <p>Loading addresses...</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-5 text-red-500">
        Note: These Addresses Are Only for Managing Shopping Addresses
      </h2>

      {addresses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">No addresses found.</p>
          <Link
            to="/address/new"
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md"
          >
            + Add New Address
          </Link>
        </div>
      ) : (
        <>
          {/* Dropdown */}
          <select
            className="border p-2 rounded w-full mb-4"
            value={selectedAddressId}
            onChange={(e) => setSelectedAddressId(e.target.value)}
          >
            {addresses.map((addr) => (
              <option key={addr._id} value={addr._id}>
                {getAddressDisplayString(addr)}
              </option>
            ))}
          </select>

          {(() => {
            const addr = addresses.find((a) => a._id === selectedAddressId);
            if (!addr) return null;

            return (
              <div
                className={`border rounded-lg p-3 flex justify-between items-center ${
                  addr.is_default ? "border-green-500 bg-green-50" : ""
                }`}
              >
                <div>
                  <p className="font-semibold">{addr.fullname}</p>
                  <p className="text-sm text-gray-600">{formatAddress(addr)}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      setDefault({
                        id: addr._id,
                        addressType: addr.address_type,
                      })
                    }
                    className={` ${
                      addr.is_default ? "opacity-60 cursor-not-allowed text-yellow-500 hover:text-yellow-600 " : ""
                    }`}
                    disabled={addr.is_default}
                  >
                    <FaStar />
                  </button>

                  <Link
                    to={`/address/edit/${addr._id}`}
                    className="text-blue-500"
                  >
                    <FaEdit />
                  </Link>

                  <button
                    onClick={() => deleteAddress(addr._id)}
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })()}

          <div className="mt-5 text-center">
            <Link
              to="/address/new"
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md"
            >
              + Add New Address
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default AddressDropdown;
