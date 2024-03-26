import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const ViewPackages = () => {
    const [packages, setPackages] = useState([]);
    const [cookies] = useCookies(['userId']);
    const navigate = useNavigate();
    const [bookingData, setBookingData] = useState({}); // Use an object for bookingData

    useEffect(() => {
        // Redirect to sign-in page if there is no userId in cookies
        if (!cookies.userId) {
            navigate('/signin');
        }

        // Fetch packages data from the backend
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8070/package/');
                if (response.ok) {
                    const data = await response.json();
                    // Initialize bookingData object with default quantities
                    const initialBookingData = {};
                    data.forEach((packageItem) => {
                        initialBookingData[packageItem._id] = { quantity: 1 };
                    });
                    setBookingData(initialBookingData);
                    setPackages(data); // Set packages data to state
                } else {
                    console.error('Failed to fetch packages data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData(); // Call the fetch function when the component mounts
    }, [cookies.userId, navigate]);

    const handleInputChange = (packageId, quantity) => {
        // Update the specific bookingData object for the given packageId
        setBookingData({
            ...bookingData,
            [packageId]: {
                ...bookingData[packageId],
                quantity: parseInt(quantity, 10),
            },
        });
    };

    const handleSubmit = (packageId, quantity) => {
        // Send a POST request to add the booking for the specific packageId and quantity
        fetch('http://localhost:8070/booking/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: cookies.userId,
                packageId,
                quantity,
            }),
        })
            .then(async (response) => {
                if (response.ok) {
                    navigate("/")
                    console.log('Booking added successfully');
                } else {
                    const errorData = await response.json();
                    console.error('Failed to add booking:', errorData.error);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {packages.map((packageItem) => (
                    <div key={packageItem._id} className="col-lg-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <div className='d-flex justify-content-end'>
                                    <div className='bg-danger text-light rounded-2 py-1 col-3'>
                                        Rs {packageItem.price}
                                    </div>
                                </div>
                                <h5 className="card-title">{packageItem.name}</h5>
                                <p className="card-text">{packageItem.description}</p>
                                <ul className="list-group mb-3 text-start">
                                    <li className="list-group-item">Duration: {packageItem.duration} days</li>
                                    <li className="list-group-item">Amenities: {packageItem.amenities}</li>
                                </ul>
                                <div className='row'>
                                    <div className='col-6'>
                                        <div className="form-group">
                                            <label htmlFor={`quantity-${packageItem._id}`}>Quantity:</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id={`quantity-${packageItem._id}`}
                                                value={bookingData[packageItem._id].quantity}
                                                onChange={(e) => handleInputChange(packageItem._id, e.target.value)}
                                                min="1"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <button
                                            type="button"
                                            className="btn mt-4 col-12 btn-primary btn-block"
                                            onClick={() => handleSubmit(packageItem._id, bookingData[packageItem._id].quantity)}
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewPackages;
