import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const AddPackage = () => {
    
    const navigate = useNavigate();
  const [packageData, setPackageData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    amenities: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPackageData({ ...packageData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to add the new package
    try {
      const response = await fetch("http://localhost:8070/package/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(packageData),
      });

      if (response.ok) {
        console.log("Package added successfully");
        navigate("/adminviewpackages")
      } else {
        console.error("Failed to add package");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Add New Package</h1>
      <div className="d-flex justify-content-center border-primary border-2 rounded p-5">
      <form onSubmit={handleSubmit} className="text-start col-6">
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={packageData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea
            className="form-control"
            name="description"
            value={packageData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={packageData.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Duration (in days):</label>
          <input
            type="number"
            className="form-control"
            name="duration"
            value={packageData.duration}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Amenities (comma-separated):</label>
          <input
            type="text"
            className="form-control"
            name="amenities"
            value={packageData.amenities}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Package
        </button>
      </form>
      </div>
      
    </div>
  );
};

export default AddPackage;
