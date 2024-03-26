import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faStreetView } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const PAGE_SIZE = 5;

const inputStyle = {
    borderWidth: '0',
    borderBottomWidth: '1px',
    borderRadius: '0',
    paddingLeft: '0',
    outline: 'none',
    fontSize: '1rem',
    color: '#000',
};

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
};

const paginationItemStyle = {
    listStyle: 'none',
    margin: '0 5px',
    cursor: 'pointer',
};

const activePageStyle = {
    fontWeight: 'bold',
    backgroundColor: '#007bff',
    borderRadius: '5px',
    padding: '8px 15px',
    color: 'white',
};

const disabledPageStyle = {
    pointerEvents: 'none',
    opacity: '0.5',
};

const pageLinkStyle = {
    textDecoration: 'none',
    color: '#007bff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30px',
    height: '30px',
    border: '1px solid #007bff',
    borderRadius: '50%',
};

const activePageLinkStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: '1px solid #007bff',
};

const HomeTourists = () => {
    const navigate = useNavigate();
    const [tourists, setTourists] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTouristId, setSelectedTouristId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedTourist, setSelectedTourist] = useState(null);
    const [filteredTourists, setFilteredTourists] = useState([]);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    useEffect(() => {
        fetchTourists();
    }, []); // Fetch tourists when the component mounts

    const fetchTourists = () => {
        fetch('http://localhost:8070/user/')
            .then(response => response.json())
            .then(data => {
                setTourists(data);
                setFilteredTourists(data); // Set initial filtered data
            })
            .catch(error => console.error('Error fetching tourists:', error));
    };

    const handleRemoveClick = (touristId) => {
        setSelectedTouristId(touristId);
        setShowModal(true);
        // Rest of your remove logic
    };
    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
    
        const filtered = tourists.filter((tourist) =>
            tourist.firstname.toLowerCase().includes(query) ||
            tourist.lastname.toLowerCase().includes(query) ||
            tourist.email.toLowerCase().includes(query) ||
            tourist.contact.includes(query)
        );
    
        setFilteredTourists(filtered);
        setSearchTerm(query);
    };
    const handleConfirmRemove = () => {
        fetch(`http://localhost:8070/tourists/user/delete/${selectedTouristId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    setShowModal(false);
                    setSelectedTouristId(null);
                    // Rest of your confirmation logic
                } else {
                    console.error('Error removing tourist');
                }
            })
            .catch(error => {
                console.error('Error removing tourist:', error);
            });
    };
    console.log("Filtered Tourists:", filteredTourists);

    const offset = currentPage * PAGE_SIZE;
    const paginatedTourists = filteredTourists.slice(offset, offset + PAGE_SIZE);

    return (
        <div className="my-5 container">
            <div className="text-center my-3">
                <h2 className="text-primary">Manage Tourists</h2>
            </div>
            <div className='row d-flex justify-content-between'>
                <div className="col-4">
                    <form>
                        <div className="row mb-4">
                            <div className="form-group col-md-9">
                                <input
                                    type="text"
                                    placeholder="Search a Tourist"
                                    className="form-control form-control-underlined"
                                    style={inputStyle}
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <button type="button" className="btn btn-primary rounded-pill btn-block shadow-sm">
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='col-3'>
                    <Link to="/addtourist"><button className='btn btn-primary'>Add +</button></Link>
                </div>
            </div>
            <table className="table table-dark">
                <thead className="thead-dark bg-dark text-light">
                    <tr className="bg-dark">
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone No</th>
                        <th scope="col">Logs</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTourists.map((tourist) => (
                        <tr key={tourist._id}>
                            <th scope="row">{tourist._id}</th>
                            <td>{tourist.firstname}</td>
                            <td>{tourist.lastname}</td>
                            <td>{tourist.email}</td>
                            <td>{tourist.contact}</td>
                            <td>
                                <Link to="/touristslog"><FontAwesomeIcon icon={faStreetView} className="text-primary m-1" style={{ fontSize: 25 }} /></Link>
                            </td>
                            <td>
                                <button className="btn btn-primary mx-1">
                                    <FontAwesomeIcon icon={faEdit} /> Update
                                </button>
                                <button className="btn btn-danger mx-1" onClick={() => handleRemoveClick(tourist)}>
                                    <FontAwesomeIcon icon={faTrash} /> Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination-container">
                <div style={containerStyle}>
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={Math.ceil(filteredTourists.length / PAGE_SIZE)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        nextClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextLinkClassName={'page-link'}
                        disabledClassName={'disabled'}
                        activeLinkClassName={'active'}
                        style={paginationItemStyle}
                        pageStyle={paginationItemStyle}
                        activeStyle={activePageStyle}
                        disabledStyle={disabledPageStyle}
                        pageLinkStyle={pageLinkStyle}
                        activeLinkStyle={activePageLinkStyle}
                    />
                </div>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to remove {selectedTourist?.firstName}?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={handleConfirmRemove}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default HomeTourists;