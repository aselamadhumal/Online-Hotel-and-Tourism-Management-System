import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateEvent() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        title: '',
        date: '',
        venue: '',
        time: '',
        hasTicket: true,
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Fetch event data from the server
        const fetchEvent = async () => {
            try {
                const response = await fetch(`http://localhost:8070/events/get/${id}`);
                if (response.ok) {
                    const eventData = await response.json();
                    setFormData(eventData);
                } else {
                    console.error('Error fetching event data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchEvent();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: null, // Clear validation errors when input changes
        });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
            isValid = false;
        }

        if (!formData.date) {
            newErrors.date = 'Date is required';
            isValid = false;
        }

        if (!formData.venue.trim()) {
            newErrors.venue = 'Venue is required';
            isValid = false;
        }

        if (!formData.time) {
            newErrors.time = 'Time is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                // Perform form submission logic here (e.g., using fetch or Axios)
                const response = await fetch(`http://localhost:8070/events/update/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    // Navigate to the viewevents page on successful form submission
                    navigate('/viewevents');
                } else {
                    console.error('Error occurred during form submission');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className='d-flex justify-content-center'>
            <div className="container ml-5">
                <div className="card my-3 col-lg-8">
                    <div className="card-body">
                        <h3>Update Event</h3>
                        <div className='d-flex justify-content-center'>
                            <form className="needs-validation col-lg-8 mt-5 text-start" noValidate onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Event Title</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                        name="title"
                                        id="title"
                                        placeholder="Event Title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="date" className="form-label">Event Date</label>
                                    <input
                                        type="date"
                                        className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                                        name="date"
                                        id="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="venue" className="form-label">Venue</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.venue ? 'is-invalid' : ''}`}
                                        name="venue"
                                        id="venue"
                                        placeholder="Venue"
                                        value={formData.venue}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errors.venue && <div className="invalid-feedback">{errors.venue}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="time" className="form-label">Time</label>
                                    <input
                                        type="time"
                                        className={`form-control ${errors.time ? 'is-invalid' : ''}`}
                                        name="time"
                                        id="time"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errors.time && <div className="invalid-feedback">{errors.time}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="hasTicket" className="form-label">Has a Ticket</label>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="hasTicket"
                                            id="gridRadios1"
                                            value="true"
                                            checked={formData.hasTicket}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label" htmlFor="gridRadios1">
                                            True
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="hasTicket"
                                            id="gridRadios2"
                                            value="false"
                                            checked={!formData.hasTicket}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label" htmlFor="gridRadios2">
                                            False
                                        </label>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <button className="btn btn-primary" type="submit">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
