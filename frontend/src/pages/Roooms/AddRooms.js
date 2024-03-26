import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AddRoom = () => {
    
    const navigate = useNavigate();
    const roomData = [
        {
            title: 'Luxurious Suite',
            description: 'Indulge in our luxurious suites and experience the epitome of comfort and elegance.',
        },
        {
            title: 'Deluxe Room',
            description: 'Our deluxe rooms offer a perfect blend of style, comfort, and modern amenities.',
        },
        {
            title: 'Ocean View Room',
            description: 'Enjoy breathtaking ocean views from our specially designed ocean view rooms.',
        },
        {
            title: 'Family Suite',
            description: 'Spacious family suites, ideal for families looking for a memorable staycation.',
        },
        {
            title: 'Cozy Retreat',
            description: 'Find solace in our cozy retreat rooms, designed for a peaceful and relaxing stay.',
        },
        {
            title: 'Executive Suite',
            description: 'Experience sheer luxury in our executive suites, tailored for a lavish experience.',
        },
    ];
    const roomPrices = [5000, 8000, 12000, 16000, 22000, 25000];
    const additionalPersonCost = 2500;
    const dailyReservationCharge = 3000;

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        roomType: '',
        capacity: 1,
        startDate: '',
        endDate: '',
        total:0
    });
    const [roomCost, setRoomCost] = useState(0);
    const [additionalCost, setAdditionalCost] = useState(0);
    const [reservationCost, setReservationCost] = useState(0);
    const [total, setTotal] = useState(0);
    
    const handleEndDateChange = (date) => {
    const selectedStartDate = new Date(formData.startDate);
    const selectedEndDate = new Date(date);

    if (selectedStartDate <= selectedEndDate) {
        setFormData({ ...formData, endDate: date });
        calculateTotal(formData.startDate, date);
    }
};
    const calculateTotal = (startDate, endDate) => {
        if (formData.roomType && startDate && endDate) {
            const roomIndex = roomData.findIndex((room) => room.title === formData.roomType);
            const roomPrice = roomPrices[roomIndex];
            const start = new Date(startDate);
            const end = new Date(endDate);
            const totalNights = Math.floor((end - start) / (1000 * 60 * 60 * 24));
            const roomCost = roomPrice * totalNights;
            const additionalCost = formData.capacity > 1 ? additionalPersonCost * (formData.capacity - 1) : 0;
            const reservationCost = dailyReservationCharge * totalNights;
            const totalAmount = roomCost + additionalCost + reservationCost;
            setTotal(totalAmount);
        setRoomCost(roomPrice * totalNights);
        setAdditionalCost(formData.capacity > 1 ? additionalPersonCost * (formData.capacity - 1) : 0);
        setReservationCost(dailyReservationCharge * totalNights);
        setFormData({ ...formData, total: totalAmount });

        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8070/rooms/add', formData);
            console.log(response.data);
            navigate("/viewrooms")
        } catch (error) {
            console.error('Error adding room:', error);
        }
    };

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'endDate') {
        handleEndDateChange(value);
    }
    setFormData({ ...formData, [name]: value });
    calculateTotal(formData.startDate, value); 
};


    return (
        <div className="container mt-1">
            <form onSubmit={handleSubmit} className='text-start'>
                <div className='row'>
                    <div className='col-6'>
                        <h3>Personal Data</h3>
                        <div className="mb-3">
                            <label htmlFor="firstname" className="form-label">
                                First Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstname"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastname" className="form-label">
                                Last Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastname"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">
                                Phone
                            </label>
                            <input
                                type="tel"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <div className='col-6'>
                        {/* Room Data Section */}
                        <h3>Room Data</h3>
                        <div className="mb-3">
                            <label htmlFor="roomType" className="form-label">
                                Room Type
                            </label>
                            <select
                                className="form-select"
                                id="roomType"
                                name="roomType"
                                value={formData.roomType}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Room Type</option>
                                {/* Options dynamically generated based on roomData */}
                                {roomData.map((room, index) => (
                                    <option key={index} value={room.title}>
                                        {room.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="capacity" className="form-label">
                                Capacity
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="capacity"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleInputChange}
                                required
                                min="1"
                                max="10"
                            />
                        </div>
                        <h3>Date Selection</h3>
                        <div className='row'>
                            <div className='col-6'>
                                <div className="mb-3">
                                    <label htmlFor="startDate" className="form-label">
                                        Start Date
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="startDate"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="mb-3">
                                    <label htmlFor="endDate" className="form-label">
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="endDate"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleInputChange}
                                        min={formData.startDate}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Total Calculation Section */}
                <div className="total-calculation">
                    <h3>Total Calculation</h3>
                    <div className="receipt-item">
                        <label htmlFor="roomCost" className="label">
                            Room Cost
                        </label>
                        <div className="value">{roomCost}</div>
                    </div>
                    <div className="receipt-item">
                        <label htmlFor="additionalCost" className="label">
                            Additional Cost
                        </label>
                        <div className="value">{additionalCost}</div>
                    </div>
                    <div className="receipt-item">
                        <label htmlFor="reservationCost" className="label">
                            Reservation Cost
                        </label>
                        <div className="value">{reservationCost}</div>
                    </div>
                </div>
                <style>
                    {`
          .total-calculation {
            background-color: #f9f9f9;
            padding: 20px;
            border: 1px solid #ccc;
            margin-top: 20px;
          }

          .receipt-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          }

          .label {
            font-weight: bold;
          }

          .value {
            font-style: italic;
          }
        `}
                </style>

                <button type="submit" className="btn btn-primary mt-1 mb-1">
                    Reserve
                </button>
            </form>
        </div>
    );
};

export default AddRoom;
