import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    mobile: '',
    nic: '',
    salary: ''
  });

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await fetch(`http://localhost:8070/staff/get/${id}`);
        const data = await response.json();
        // Update the state with fetched staff data
        setFormData({
          name: data.name,
          role: data.role,
          email: data.email,
          mobile: data.mobile,
          nic: data.nic,
          salary: data.salary.toString() // Assuming salary is a number, convert it to a string for input field
        });
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };

    fetchStaffData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8070/staff/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Staff data updated successfully.');
        // Handle redirection or any other actions after successful update
        navigate('/viewstaff'); // Redirect to the staff list page after update
      } else {
        console.error('Failed to update staff data.');
      }
    } catch (error) {
      console.error('Error updating staff data:', error);
    }
  };

  return (
    <div className="bg-dark d-flex justify-content-center align-items-center py-5" style={{ minHeight: '100vh' }}>
      <div style={styles.box}>
        <div style={styles.boxAfter}></div>
        <div className="col-lg-12">
          <div className="border-light">
            <h1 className="text-center mb-4 text-light">Update Staff</h1>
            <form onSubmit={handleSubmit} className='text-start'>
              <div className="mb-3">
                <label htmlFor="name" className="form-label text-light">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label text-light">Role</label>
                <input type="text" className="form-control" id="role" name="role" value={formData.role} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-light">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label text-light">Mobile</label>
                <input type="tel" className="form-control" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="nic" className="form-label text-light">NIC</label>
                <input type="text" className="form-control" id="nic" name="nic" value={formData.nic} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label htmlFor="salary" className="form-label text-light">Salary</label>
                <input type="text" className="form-control" id="salary" name="salary" value={formData.salary} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary col-12">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  box: {
    position: 'relative',
    padding: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '6px',
    boxShadow: '0 5px 35px rgba(0,0,0,0.2)',
    minWidth:'500px'
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

export default UpdateStaff;
