import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utilus/axiosInstance";
import toast from "react-hot-toast";

const Products = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);



  return (
    <div>Product Components</div>
  );
};

export default Products;
