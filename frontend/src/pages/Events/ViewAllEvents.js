import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function ViewAllEvents() {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
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
    const handleDelete = async (eventId) => {
        try {
            const response = await fetch(`http://localhost:8070/events/delete/${eventId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // Refresh events after successful deletion
                const updatedEvents = events.filter(event => event._id !== eventId);
                setEvents(updatedEvents);
                setDeleteConfirmation(null); // Close delete confirmation modal
            } else {
                console.error('Error deleting event');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const generateReport = () => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Define the table headers and rows
        const headers = [['Title', 'Venue', 'Date']];
        const rows = filteredEvents.map(event => [
            event.title,
            event.venue,
            formatDate(event.date, 'custom') // Format the date as needed
        ]);

        // Add the table to the PDF document
        doc.autoTable({
            head: headers,
            body: rows,
            startY: 20,
            margin: { horizontal: 10 },
        });

        // Save the PDF file with a specific name
        doc.save('events_report.pdf');
    };

    const handleDeleteConfirmation = (eventId) => {
        setDeleteConfirmation(eventId);
    };
    useEffect(() => {
        // Fetch events from the API endpoint
        fetch('http://localhost:8070/events/')
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='container'>
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
                        <button className='btn btn-primary my-3' onClick={generateReport}>Generate Report</button>
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
                                            <div className="card-footer">
                                                <span className="badge rounded-pill text-bg-time">
                                                    <Link to={`/updateevent/${event._id}`} ><button className='btn btn-primary mx-2'>Update</button></Link>
                                                    <button className='btn btn-danger mx-2' onClick={() => handleDeleteConfirmation(event._id)}>Delete</button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                        {deleteConfirmation && (
                            <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <p>Are you sure you want to delete this event?</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setDeleteConfirmation(null)}>Cancel</button>
                                            <button type="button" className="btn btn-danger" onClick={() => handleDelete(deleteConfirmation)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            )}
        </div>
    );
}
