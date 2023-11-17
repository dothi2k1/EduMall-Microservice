"use client";
import React, { useState, useRef } from "react";
import axios from "axios";

const UploadFile = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  const [alert, setAlert] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("description", productData.description);

    try {
      const response = await axios.post(process.env.DOMAIN + "/admin/editProducts", formData);

      if (response.status === 200) {
        setAlert("Thành công");
        // Reset form or show success message
      } else {
        setAlert("Error adding product");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={productData.name} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" name="price" value={productData.price} onChange={handleInputChange} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={productData.description} onChange={handleInputChange} />
      </div>
      <div>
        <input type="file" ref={fileInputRef} />
      </div>
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        type="submit "
      >
        Add Product
      </button>
      <p>{alert}</p>
    </form>
  );
};

export default UploadFile;
