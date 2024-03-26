import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

const AddStaff = () => {
    
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    mobile: '',
    nic: '',
    salary: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:8070/staff/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            navigate(`/viewstaff`);
        } else {
            console.error('Payment failed');
        }
    } catch (error) {
        console.error('Error occurred:', error);
    }
    console.log(formData);
  };

  return (
    <div className="bg-dark d-flex justify-content-center align-items-center py-5" style={{ minHeight: '100vh' }}>
      <div style={styles.box}>
        <div style={styles.boxAfter}></div>
        <div className="col-lg-12">
          <div className="border-light">
            <h1 className="text-center mb-4 text-light">Staff Assignment</h1>
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
              <button type="submit" className="btn btn-primary col-12">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStaff;
