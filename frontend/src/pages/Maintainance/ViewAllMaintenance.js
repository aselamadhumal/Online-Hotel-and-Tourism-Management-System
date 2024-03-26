import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload, faTrash,faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";

export default function AllMaintenance() {
  const [columns, setColumns] = useState([]);
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);

  useEffect(() => {
    function getMaintenanceData() {
      axios
      
        .get("http://localhost:8070/maintenance/")
        .then((res) => {
          setColumns(Object.keys(res.data[0]));
          setMaintenanceData(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getMaintenanceData();
  }, []);

  const filteredMaintenanceData = maintenanceData.filter((data) =>
    data._id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  function generateReport() {
    const doc = new jsPDF();
    const columnStyles = {
      0: { columnWidth: 20 },
      1: { columnWidth: 20 },
      2: { columnWidth: 20 },
      3: { columnWidth: 20 },
      4: { columnWidth: 20 },
      5: { columnWidth: 20 },
      6: { columnWidth: 20 },
      7: { columnWidth: 20 },
    };

    doc.autoTable({
      head: [columns],
      body: filteredMaintenanceData.map((data) => Object.values(data)),
      columnStyles: columnStyles,
    });

    doc.save("maintenance_report.pdf");
  }

  const handleDeleteClick = (data) => {
    setSelectedMaintenance(data);
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (selectedMaintenance) {
      axios
        .delete(`http://localhost:8070/maintenance/delete/${selectedMaintenance._id}`)
        .then(() => {
          // Remove deleted entry from the UI
          setMaintenanceData(maintenanceData.filter((data) => data._id !== selectedMaintenance._id));
          setDeleteModalVisible(false);
          setSelectedMaintenance(null);
        })
        .catch((error) => {
          console.error(error);
          alert("Error deleting maintenance record.");
        });
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center">All Maintenance Records</h1>
        <div className="d-flex justify-content-end">
          <a href="/addmaintainance" className="btn btn-secondary btn-lg">
            + Add Maintenance
          </a>
        </div>
        <div className="input-group mb-4 mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Category"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="btn btn-primary" type="button">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredMaintenanceData.map((data, index) => (
              <tr key={index}>
                {columns.map((col, i) => (
                  <td key={i}>{data[col]}</td>
                ))}
                <td>
                  <Link to={`/updatemaintainance/${data._id}`} className="btn btn-warning me-2">
                    Update
                  </Link>
                  <button className="btn btn-danger" onClick={() => handleDeleteClick(data)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary" onClick={generateReport}>
          Download Report <FontAwesomeIcon icon={faFileDownload} />
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalVisible && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setDeleteModalVisible(false);
                    setSelectedMaintenance(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this maintenance record?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setDeleteModalVisible(false);
                    setSelectedMaintenance(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
