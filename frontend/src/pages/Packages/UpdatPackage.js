import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePackage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [packageData, setPackageData] = useState({
        name: "",
        description: "",
        price: "",
        duration: "",
        amenities: "",
    });

    useEffect(() => {
        const fetchPackageDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8070/package/get/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setPackageData({
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        duration: data.duration,
                        amenities: data.amenities,
                    });
                } else {
                    console.error('Failed to fetch package details');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchPackageDetails();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPackageData({ ...packageData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8070/package/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(packageData),
            });

            if (response.ok) {
                console.log("Package updated successfully");
                navigate("/adminviewpackages");
            } else {
                console.error("Failed to update package");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Edit Package</h1>
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
                        Update Package
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePackage;
