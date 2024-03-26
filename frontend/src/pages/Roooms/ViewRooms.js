import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

const ViewRooms = () => {
  const navigate = useNavigate();
  const [submittedData, setSubmittedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8070/rooms/'); // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint URL
        const result = await response.json();
        setSubmittedData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }
  const filteredData = submittedData.filter((data) =>
    Object.values(data).some(
      (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }
  const handleDelete = async (id) => {
    try {
      // Send DELETE request to your API endpoint with the reservation ID
      await fetch(`http://localhost:8070/rooms/delete/${id}`, {
        method: 'DELETE',
      });
      const response = await fetch('http://localhost:8070/rooms/');
      const result = await response.json();
      setShowModal(false);
      setSubmittedData(result);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };
  const generatePDF = () => {
    const doc = new jsPDF();
    const tableData = [];
    filteredData.forEach((data, index) => {
      tableData.push([
        index + 1,
        data.name,
        data.email,
        data.phone,
        data.roomType,
        data.capacity,
        formatDate(data.startDate),
        formatDate(data.endDate),
        `Rs ${data.total}`
      ]);
    });
    
    doc.autoTable({
      head: [['#', 'Name', 'Email', 'Phone', 'Room Type', 'Capacity', 'Start Date', 'End Date', 'Total Cost']],
      body: tableData,
    });

    doc.save('reservations.pdf');
  };

  return (
    <div className="container mt-5">
      <h1>Submitted Reservations</h1>
      <div className='row'>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link to="/addrooms" className='btn btn-success col-3 mx-2 my-2'>Add Reservations</Link>
        <button className='btn btn-success col-3 my-1' onClick={generatePDF}>
          Generate PDF Report
        </button>
      </div>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Room Type</th>
            <th scope="col">Capacity</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Total Cost</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.phone}</td>
              <td>{data.roomType}</td>
              <td>{data.capacity}</td>
              <td>{formatDate(data.startDate)}</td>
              <td>{formatDate(data.endDate)}</td>
              <td>Rs {data.total}</td>
              <td>
                <button className='btn btn-primary mx-1' onClick={() => navigate(`/updaterooms/${data._id}`)}>
                  Update
                </button>
                <button className='btn btn-danger mx-1' data-toggle="modal" data-target="#confirmationModal" onClick={() => handleDeleteClick(data._id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this reservation?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(selectedId)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </table>
    </div>
  );
};

export default ViewRooms;
