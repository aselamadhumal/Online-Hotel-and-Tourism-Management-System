import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Link } from 'react-router-dom';

const styles = {
    box: {
        position: 'relative',
        padding: '50px',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '6px',
        boxShadow: '0 5px 35px rgba(0,0,0,0.2)',
        minWidth: '500px'
    },
    boxAfter: {
        content: '',
        position: 'absolute',
        top: '5px',
        left: '5px',
        right: '5px',
        bottom: '5px',
        borderRadius: '5px',
        pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 15%, transparent 50%, transparent 85%, rgba(255,255,255,0.3) 100%)'
    }
};

const ViewStaff = () => {
    const [submittedData, setSubmittedData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedStaffId, setSelectedStaffId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8070/staff/');
                const data = await response.json();
                setSubmittedData(data);
            } catch (error) {
                console.error('Error fetching staff data:', error);
            }
        };

        fetchData();
    }, []);
    const filteredData = submittedData.filter((data) =>
        Object.values(data).some(
            (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8070/staff/delete/${selectedStaffId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const fetchData = async () => {
                    try {
                        const response = await fetch('http://localhost:8070/staff/');
                        const data = await response.json();
                        setSubmittedData(data);
                    } catch (error) {
                        console.error('Error fetching staff data:', error);
                    }
                };

                fetchData();
            } else {
                console.error('Failed to delete staff member.');
            }
        } catch (error) {
            console.error('Error deleting staff member:', error);
        }
        setShowDeleteModal(false);
    };

    const generateReport = () => {
        const doc = new jsPDF();
        doc.text('Staff Report', 10, 10);

        const columns = ['#', 'Name', 'Role', 'Email', 'Mobile', 'NIC', 'Salary'];
        const data = filteredData.map((item, index) => [
            index + 1,
            item.name,
            item.role,
            item.email,
            item.mobile,
            item.nic,
            `Rs ${item.salary}`
        ]);

        doc.autoTable({
            head: [columns],
            body: data,
            startY: 20
        });

        doc.save('staff_report.pdf');
    };

    return (
        <div className="bg-dark d-flex justify-content-center align-items-center py-5" style={{ minHeight: '100vh' }}>
            <div style={styles.box} className='col-10'>
                <div style={styles.boxAfter}></div>
                <h1 className="text-light">View Staff</h1>
                <div className='d-flex justify-content-between'>
                    <div className='col-4'>
                        <input
                            type="text"
                            className="form-control  mb-3"
                            placeholder="Search..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className='btn btn-primary my-3' onClick={generateReport}>Generate a Report</button>
                </div>

                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Role</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">NIC</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((data, index) => (
                            <tr key={data.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.name}</td>
                                <td>{data.role}</td>
                                <td>{data.email}</td>
                                <td>{data.mobile}</td>
                                <td>{data.nic}</td>
                                <td>Rs {data.salary}</td>
                                <td>
                                    <Link to={`/updatestaff/${data._id}`} className="btn btn-primary mx-1 my-1">Edit</Link>
                                    <button
                                        className="btn btn-danger mx-1 my-1"
                                        onClick={() => {
                                            setSelectedStaffId(data._id);
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <div
                        className={`modal ${showDeleteModal ? 'show' : ''}`}
                        tabIndex="-1"
                        role="dialog"
                        style={{ display: showDeleteModal ? 'block' : 'none' }}
                    >
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirm Delete</h5>
                                </div>
                                <div className="modal-body">
                                    Are you sure you want to delete this staff member?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowDeleteModal(false)}>
                                        Close
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={handleDelete}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </table>

                <Link to='/addstaff' className='btn btn-primary mt-5 col-2'>
                    Add Member
                </Link>
            </div>
        </div>
    );
};

export default ViewStaff;
