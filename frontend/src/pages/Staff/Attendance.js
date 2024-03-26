import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
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

const Attendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [showPresent, setShowPresent] = useState(true);
    const [showAbsent, setShowAbsent] = useState(true);
    
    const labels = [];
    const presentData = [];
    const absentData = [];

    const chartRef = useRef(null);
    const handleStatusChange = async (id, newStatus) => {
        await updateAttendanceStatus(id, newStatus);
        fetchData(); // Fetch data again after updating status
    };
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8070/staff/attendance');
          const data = await response.json();
          setAttendanceData(data);
          setFilteredData(data); // Initialize filteredData with fetched data
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      useEffect(() => {
        // Filter data based on showPresent and showAbsent flags
        let newData = attendanceData;
        if (!showPresent) {
          newData = newData.filter((data) => data.status !== 'present');
        }
        if (!showAbsent) {
          newData = newData.filter((data) => data.status !== 'absent');
        }
        setFilteredData(newData);
      }, [showPresent, showAbsent, attendanceData]);
      const presentCount = filteredData.filter((data) => data.status === 'present').length;
      const absentCount = filteredData.filter((data) => data.status === 'absent').length;
    
      const chartData = {
        labels: ['Present', 'Absent'],
        datasets: [
          {
            label: 'Attendance',
            data: [presentCount, absentCount],
            backgroundColor: ['#2348ff', 'red'],
          },
        ],
      };
    
      const chartOptions = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
    const updateAttendanceStatus = async (id, newStatus) => {
        try {
            await fetch(`http://localhost:8070/staff/attendance/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
            fetchData();
        } catch (error) {
            console.error('Error updating attendance status:', error);
        }
    };


    const generateReport = () => {
        const doc = new jsPDF();
        doc.text('Attendance Report', 10, 10);
        let yPos = 30;
        filteredData.forEach((data, index) => {
            const rowData = `${index + 1}. Name: ${data.name}, Date: ${data.date}, Status: ${data.status}`;
            doc.text(rowData, 10, yPos);
            yPos += 10;
        });
        doc.save('attendance_report.pdf');
    };
    const handleFilter = () => {
        let newData = attendanceData;
        if (!showPresent) {
            newData = newData.filter((data) => data.status !== 'present');
        }
        if (!showAbsent) {
            newData = newData.filter((data) => data.status !== 'absent');
        }
        setFilteredData(newData);
        
    }; 
     const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };

    return (
        <div className="bg-dark d-flex justify-content-center align-items-center py-5" style={{ minHeight: '100vh' }}>
            <div style={styles.box} className='col-10'>
                <div className="my-5" style={{height:'200px'}}>
                    <Bar data={chartData} options={chartOptions}/>
                </div>
                <div style={styles.boxAfter}></div>
                <h1 className="text-light">Attendance</h1>
                <div className='d-flex justify-content-between'>
                    <div className='col-4'>
                        <label className="form-check-label text-light me-2 mx-2">
                            Show Present
                            <input type="checkbox" className="form-check-input mx-1" checked={showPresent} onChange={() => setShowPresent(!showPresent)} />
                        </label>
                        <label className="form-check-label text-light mx-2">
                            Show Absent
                            <input type="checkbox" className="form-check-input mx-1" checked={showAbsent} onChange={() => setShowAbsent(!showAbsent)} />
                        </label>
                        <button className='btn btn-primary my-3' onClick={handleFilter}>Apply Filters</button>
                    </div>
                    <button className='btn btn-primary my-3' onClick={generateReport}>Generate Report</button>
                </div>
                <Link className='btn btn-primary'to="/staff/attendance/add">Add Attendance</Link>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">NIC</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((data, index) => (
                            <tr key={data.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.name}</td>
                                <td>{data.nic}</td>
                                <td>{formatDate(data.date)}</td>
                                <td>{data.status}</td>
                                <td>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            id={`present-${data._id}`}
                                            checked={data.status === 'present'}
                                            onChange={() => handleStatusChange(data._id, 'present')}
                                        />
                                        <label className="form-check-label text-light" htmlFor={`present-${data._id}`}>Present</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            id={`absent-${data._id}`}
                                            checked={data.status === 'absent'}
                                            onChange={() => handleStatusChange(data._id, 'absent')}
                                        />
                                        <label className="form-check-label text-light" htmlFor={`absent-${data._id}`}>Absent</label>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Attendance;
