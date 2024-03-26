import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import c3 from "../../images/c3.jpg";
import { useCookies } from 'react-cookie'; 

const styles = {
    container: {
        height: '100vh',
        background: `url(${c3})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
    },

}
const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [packages, setPackages] = useState([]);
    const [cookies] = useCookies(['userId']);
    const userId = cookies.userId;
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user bookings
        const fetchBookings = async () => {
            try {
                const response = await fetch(`http://localhost:8070/booking/user/${userId}`);
                if (response.ok) {
                    console.log(response.data)
                    const data = await response.json();
                    setBookings(data); // Set booking data to state

                    // Fetch package details for each booking
                    const packageData = {};
                    await Promise.all(data.map(async (booking) => {
                        const packageResponse = await fetch(`http://localhost:8070/package/get/${booking.packageId}`);
                        if (packageResponse.ok) {
                            console.log(packageResponse.data)
                            const packageItem = await packageResponse.json();
                            packageData[booking._id] = packageItem;
                        }
                    }));
                    setPackages(packageData);
                } else {
                    console.error('Failed to fetch user bookings');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchBookings(); // Call the fetch function when the component mounts
    }, [userId]);
    return (
        <div className="container-fluid mt-5 h-100"style={{minHeight:'120vh'}}>
            <div className="row" style={styles.container}>
                {Object.keys(packages).map((bookingId) => (
                    <div key={bookingId} className="col-lg-4 mb-4 mt-4">
                        <div className="card bg-light" style={{minWidth:'120px'}}>
                            <div className="card-body">
                                <div className='d-flex justify-content-end'>
                                    <div className='bg-danger text-light rounded-2 py-1 col-3'>
                                        Rs {packages[bookingId].price}
                                    </div>
                                </div>
                                <h5 className="card-title">{packages[bookingId].name}</h5>
                                <p className="card-text">{packages[bookingId].description}</p>
                                <ul className="list-group mb-3 text-start">
                                    <li className="list-group-item">Duration: {packages[bookingId].duration} days</li>
                                    <li className="list-group-item">Amenities: {packages[bookingId].amenities}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBookings;
