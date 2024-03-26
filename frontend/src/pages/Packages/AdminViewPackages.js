import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AdminViewPackages = () => {
    const [packages, setPackages] = useState([]);
    const [filteredPackages, setFilteredPackages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleDeleteConfirmation = (packageId) => {
        setSelectedPackage(packageId);
        setIsModalVisible(true);
    };

    const handleDeletePackage = async () => {
        try {
            const response = await fetch(`http://localhost:8070/package/delete/${selectedPackage}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const updatedPackages = packages.filter((item) => item._id !== selectedPackage);
                setPackages(updatedPackages);
                setFilteredPackages(updatedPackages);
            } else {
                console.error('Failed to delete package');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsModalVisible(false);
            setSelectedPackage(null);
        }
    };

    useEffect(() => {
        // Fetch packages data from the backend
        fetch('http://localhost:8070/package/')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch package data');
                }
                return response.json();
            })
            .then((data) => {
                setPackages(data);
                setFilteredPackages(data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query === '') {
            setFilteredPackages([...packages]);
        } else {
            const filtered = packages.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredPackages(filtered);
        }
    };
    const generatePDFReport = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Name', 'Description', 'Price', 'Duration', 'Amenities']],
            body: filteredPackages.map((item) => [item.name, item.description, item.price, item.duration, item.amenities]),
        });
        doc.save('packages-report.pdf');
    };

    return (
        <div className="container mt-5">
            <h2 className="text-start mb-4">Packages</h2>
            <div className='d-flex justify-content-lg-start'>
                <Link to="/addpackage" className='btn btn-primary my-1'>Add a Package</Link>
            </div>
            <div className="col-3 mb-4">
                <form>
                    <div className="input-group">
                        <input
                            type="search"
                            placeholder="Search Package Name"
                            className="form-control"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <div className="input-group-append">
                            <button type="submit" className="btn btn-primary">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='d-flex justify-content-end'>
                <button className="btn btn-success mx-2" onClick={generatePDFReport}>
                    <FontAwesomeIcon icon={faFilePdf} /> Generate PDF Report
                </button>
            </div>
            <div className="row">
                {filteredPackages.map((item) => (
                    <div key={item._id} className="col-lg-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">{item.description}</p>
                                <ul className="list-group mb-3">
                                    <li className="list-group-item">Price: Rs {item.price}</li>
                                    <li className="list-group-item">Duration: {item.duration} days</li>
                                    <li className="list-group-item">Amenities: {item.amenities}</li>
                                </ul>
                                <Link to={`/editpackage/${item._id}`} className="btn btn-primary mr-2 mx-2">
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-danger mx-2"
                                    onClick={() => handleDeleteConfirmation(item._id)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#deleteModal"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Delete Confirmation Modal */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">
                                Confirm Delete
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this package?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button type="button" className="btn btn-danger" onClick={handleDeletePackage}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {error && <div className="alert alert-danger mt-4">{error}</div>}
        </div>
    );
};

export default AdminViewPackages;
