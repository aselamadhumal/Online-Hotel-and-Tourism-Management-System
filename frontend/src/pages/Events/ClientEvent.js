import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Form, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
export default function ClientEvent() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const userId = Cookies.get('userId');
    const [userData, setUserData] = useState(null);
    const cardStyles = {
        boxShadow: '3px 3px 11px 1.5px #0000002b',
        borderRadius: '10px',
        border: '2px solid #ffffff6d',
        backgroundColor: '#ffffffa1',
        padding: '10px',
        height: 'max-content',
    };

    const topRightIconStyles = {
        position: 'absolute',
        top: '8px',
        right: '16px',
    };

    const cardTitleStyles = {
        lineHeight: '35px',
    };

    const dayStyles = {
        fontWeight: '600',
        fontSize: '1.5rem',
        color: 'var(--tx-color-2)',
        paddingTop: '2px',
        marginRight: '5px',
    };

    const calYStyles = {
        display: 'grid',
        lineHeight: '21px',
    };

    const monthStyles = {
        fontSize: '1.5rem',
        color: 'var(--tx-color-2)',
        fontWeight: '300',
    };

    const yearStyles = {
        fontSize: '1.2rem',
        color: 'var(--tx-color-2)',
        fontWeight: '700',
        paddingTop: '1px',
    };

    const attachedStyles = {
        fontWeight: '300',
        fontSize: '1rem',
    };
    const handleReserveTickets = (event) => {
        if (!userId) {
            navigate('/signin');
        } else {
            setSelectedEvent(event);
            setShowModal(true);
        }
    };
    const handleModalClose = () => {
        setShowModal(false);
        setSelectedEvent(null);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        // Prepare the data for the API call
        const formData = {
            userId: userId,
            eventId: selectedEvent.id,
            quantity: 1, // You can allow the user to input the quantity if needed
        };

        fetch('http://localhost:8070/tickets/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Ticket reservation added successfully:', data);
                handleModalClose();
            })
            .catch((error) => {
                console.error('Error adding ticket reservation:', error);
            });
    };
    const formatDate = (dateString, format = 'default') => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short',
        };

        const date = new Date(dateString);

        if (format === 'day') {
            return date.getDate();
        } else if (format === 'month') {
            return date.toLocaleDateString(undefined, { month: 'long' });
        } else if (format === 'year') {
            return date.getFullYear();
        } else if (format === 'custom') {
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            return formattedDate;
        } else {
            return date.toLocaleDateString(undefined, options);
        }
    };
    useEffect(() => {
        // Fetch events from the API endpoint
        fetch('http://localhost:8070/events/')
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error:', error));
        if (userId) {
            fetch(`http://localhost:8070/user/get/${userId}`)
                .then(response => response.json())
                .then(data => setUserData(data))
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [userId]);
    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='container' style={{ minHeight: '100vh' }}>
            <h3>All Events</h3>
            <div className='d-flex justify-content-start col-12'>
                <form className='form-inline'>
                    <div className='row'>
                        <input
                            className='form-control mr-sm-2 col-8'
                            type='search'
                            placeholder='Search for an Event'
                            aria-label='Search'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </form>
                <div className='row d-flex justify-content-start'>
                    <Link to="/addEvent"><button className=' mx-5 btn btn-primary'>Create Event</button></Link>
                </div>
            </div>
            {filteredEvents.length === 0 ? (
                <p>No events found.</p>
            ) : (
                <div className='row'>
                    <section>
                        <div className="container-lg py-5">
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 cross-card mb-5">
                                {filteredEvents.map(event => (
                                    <div className="col" key={event.id}>
                                        <div className="card box-5 shadow-sm h-100" style={cardStyles}>
                                            <div className="card-body posiction-relative">
                                                <div className="top-right" style={topRightIconStyles}>
                                                    <i title="Condividi box evento" className="bi bi-arrow-up-right-circle-fill grow"></i>
                                                </div>
                                                <div className="card-title d-flex mb-2" style={cardTitleStyles}>

                                                    <div className="cal-y" style={calYStyles}>
                                                        <span className="day" style={dayStyles}>
                                                            {formatDate(event.date, 'day')}
                                                        </span>
                                                        <span className="month text-uppercase" style={monthStyles}>
                                                            {formatDate(event.date, 'month')}
                                                        </span>
                                                        <span className="year text-uppercase" style={yearStyles}>
                                                            {formatDate(event.date, 'year')}
                                                        </span>
                                                    </div>
                                                </div>
                                                <h2 className="card-text my-4">
                                                    <p href={event.link} className="text-primary">
                                                        {event.title}
                                                    </p>
                                                </h2>
                                                <span className="attached" style={attachedStyles}>
                                                    <span className="badge text-bg-town text-uppercase me-1 text-dark">
                                                        <p target="_blank" href={`/citta/${event.venue}`} className="">
                                                            {event.venue}
                                                        </p>
                                                    </span>
                                                    <span className="badge text-uppercase me-1 bg-evento">Evento</span>
                                                    {event.hasTicket && <span className="badge text-uppercase text-bg-danger">Ticket</span>}
                                                    {event.hasTicket && <span className="badge text-uppercase text-bg-primary">Tickets Remaining : {event.ticketAmount}</span>}
                                                </span>
                                            </div>
                                            <div className='card-footer' key={event.id}>
                                                {event.hasTicket && (
                                                    <span className='badge rounded-pill text-bg-time'>
                                                        <button className='btn btn-primary' onClick={() => handleReserveTickets(event)}>
                                                            Reserve Tickets
                                                        </button>
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                        <Modal show={showModal} onHide={handleModalClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Reserve Tickets</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {userData && selectedEvent && (
                                    <div>
                                        <p>User: {userData.firstname+' '+userData.lastname}</p>
                                        <p>Event: {selectedEvent.name}</p>
                                        <Form onSubmit={handleFormSubmit}>
                                            <Form.Group controlId='ticketQuantity'>
                                                <Form.Label>Quantity</Form.Label>
                                                <Form.Control type='number' defaultValue={1} min={1} required />
                                            </Form.Group>
                                            <Button variant='primary' className="mt-2" type='submit'>
                                                Reserve
                                            </Button>
                                        </Form>
                                    </div>
                                )}
                            </Modal.Body>
                        </Modal>

                    </section>
                </div>
            )}
        </div>
    );
}
