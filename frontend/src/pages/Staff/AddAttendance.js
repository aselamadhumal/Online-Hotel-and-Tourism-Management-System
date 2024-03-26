import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const styles = {
  // ... (styles remain unchanged)
};

const AddAttendance = () => {
  const [staffData, setStaffData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    nic: '',
    date: new Date().toISOString().slice(0, 10),
    status: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await fetch('http://localhost:8070/staff/');
        const data = await response.json();
        setStaffData(data);
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };

    fetchStaffData();
  }, []);

  const handleNicChange = (e) => {
    const selectedNic = e.target.value;
    const selectedStaff = staffData.find((staff) => staff.nic === selectedNic);
    if (selectedStaff) {
      setFormData({
        ...formData,
        name: selectedStaff.name,
        nic: selectedNic,
      });
    } else {
      setFormData({
        ...formData,
        name: '',
        nic: selectedNic,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8070/staff/attendance/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Attendance added successfully.');
        navigate('/staff/attendance');
      } else {
        console.error('Failed to add attendance.');
      }
    } catch (error) {
      console.error('Error adding attendance:', error);
    }
  };

  return (
    <div className="bg-dark d-flex justify-content-center align-items-center py-5" style={{ minHeight: '100vh' }}>
      <div style={styles.box}>
        <div style={styles.boxAfter}></div>
        <div className="col-lg-12">
          <div className="border-light">
            <h1 className="text-center mb-4 text-light">Add Attendance</h1>
            <form onSubmit={handleSubmit} className='text-start'>
              <div className="mb-3">
                <label htmlFor="nic" className="form-label text-light">NIC</label>
                <select className="form-select" id="nic" name="nic" value={formData.nic} onChange={handleNicChange} required>
                  <option value="" disabled>Select NIC</option>
                  {staffData.map((staff) => (
                    <option key={staff.nic} value={staff.nic}>{staff.nic}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label text-light">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={formData.name} disabled />
              </div>
              <div className="mb-3">
                <label htmlFor="date" className="form-label text-light">Date</label>
                <input type="date" className="form-control" id="date" name="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label text-light">Status</label>
                <select className="form-select" id="status" name="status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} required>
                  <option value="" disabled>Select Status</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary col-12">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAttendance;
