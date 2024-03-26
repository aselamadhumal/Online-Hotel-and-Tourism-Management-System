import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const categories = [
    'Room Maintenance',
    'Common Areas',
    'Exterior and Grounds',
    'Safety and Security',
    'Infrastructure',
    'Cleaning and Sanitation',
    'Guest Amenities',
    'Energy Efficiency',
    'Sustainability',
    'Compliance and Regulations'
];

const subCategories = {
    'Room Maintenance': ['Furniture', 'Appliances', 'Plumbing', 'Electrical'],
    'Common Areas': ['Lobby', 'Hallways', 'Elevators'],
    'Exterior and Grounds': ['Landscaping', 'Parking Lot', 'Exterior Walls'],
    'Safety and Security': ['Fire Safety', 'Security Systems', 'Door Locks'],
    'Infrastructure': ['Roofing', 'HVAC Systems', 'Structural Integrity'],
    'Cleaning and Sanitation': ['Housekeeping', 'Laundry Facilities', 'Pest Control'],
    'Guest Amenities': ['Pool and Spa', 'Fitness Center', 'Business Center'],
    'Energy Efficiency': ['Lighting', 'Insulation'],
    'Sustainability': ['Water Conservation', 'Waste Management'],
    'Compliance and Regulations': ['ADA Compliance', 'Health and Safety Regulations']
};

const UpdateMaintenance = () => {
    const { id } = useParams();
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState('');
    const [costOfLost, setCostOfLost] = useState('');
    const [costToReplace, setCostToReplace] = useState('');

    useEffect(() => {
        // Fetch data by ID and populate the form fields
        axios.get(`http://localhost:8070/maintenance/get/${id}`)
            .then(response => {
                const data = response.data;
                setCategory(data.category);
                setSubCategory(data.subCategory);
                setItem(data.item);
                setQuantity(data.quantity);
                setCostOfLost(data.costOfLost);
                setCostToReplace(data.costToReplace);
            })
            .catch(error => {
                console.error('Error fetching maintenance data:', error);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare data object
        const maintenanceData = {
            category,
            subCategory,
            item,
            quantity: parseInt(quantity),
            costOfLost: parseFloat(costOfLost),
            costToReplace: parseFloat(costToReplace),
        };

        try {
            // Send data to the endpoint for updating
            await axios.put(`http://localhost:8070/maintenance/update/${id}`, maintenanceData);
            alert('Maintenance details updated successfully!');
        } catch (error) {
            console.error('Error updating maintenance details:', error);
            alert('Error updating maintenance details. Please try again later.');
        }
    };

    return (
        <div className="container mt-5">
            <div className='mx-5 px-5 rounded border border-4 py-3 my-1'>
                <h2>Update Maintenance Details</h2>
                <div className='d-flex justify-content-center'>
                    <form onSubmit={handleSubmit} className='text-start col-6'>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Category</label>
                            <select className="form-select" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        {category && (
                            <div className="mb-3">
                                <label htmlFor="subCategory" className="form-label">Sub Category</label>
                                <select className="form-select" id="subCategory" value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
                                    <option value="">Select Sub Category</option>
                                    {subCategories[category].map(subCat => (
                                        <option key={subCat} value={subCat}>{subCat}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div className="mb-3">
                            <label htmlFor="item" className="form-label">Item</label>
                            <input type="text" className="form-control" id="item" value={item} onChange={(e) => setItem(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Quantity</label>
                            <input type="number" className="form-control" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="costOfLost" className="form-label">Cost of Lost</label>
                            <input type="number" className="form-control" id="costOfLost" value={costOfLost} onChange={(e) => setCostOfLost(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="costToReplace" className="form-label">Cost to Replace</label>
                            <input type="number" className="form-control" id="costToReplace" value={costToReplace} onChange={(e) => setCostToReplace(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateMaintenance;
