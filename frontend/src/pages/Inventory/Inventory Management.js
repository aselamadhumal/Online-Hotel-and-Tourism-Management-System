import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Table, Spinner } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: 0,
    price: 0,
    description: '',
    manufacturer: '',
    expiryDate: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch('http://localhost:8070/inventory/');
      const data = await response.json();
      if (data && data.length > 0) {
        setInventory(data);
      } else {
        console.error('Empty or undefined data received from the server.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const generatePDF = () => {
    const unit = 'pt';
    const size = 'A4';
    const orientation = 'portrait';
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(12);
    doc.text('Inventory Report', marginLeft, 40);

    const headers = [['Name', 'Category', 'Quantity', 'Price', 'Description', 'Manufacturer', 'Expiry Date']];
    const data = inventory.map(item => [
      item.name,
      item.category,
      item.quantity,
      `Rs ${item.price}`, 
      item.description,
      item.manufacturer,
      formatDate(item.expiryDate),
    ]);

    doc.autoTable({
      startY: 60,
      head: headers,
      body: data,
    });

    doc.save('inventory_report.pdf');
  };
  const handleClose = () => {
    setShowModal(false);
    setFormData({
      name: '',
      category: '',
      quantity: 0,
      price: 0,
      description: '',
      manufacturer: '',
      expiryDate: '',
    });
    setIsEditMode(false);
    setItemToEdit(null);
  };

  const handleShow = () => setShowModal(true);

  const handleEditInventory = (id) => {
    const itemToEdit = inventory.find((item) => item._id === id);
    if (itemToEdit) {
      setFormData({
        name: itemToEdit.name,
        category: itemToEdit.category,
        quantity: itemToEdit.quantity,
        price: itemToEdit.price,
        description: itemToEdit.description,
        manufacturer: itemToEdit.manufacturer,
        expiryDate: itemToEdit.expiryDate,
      });
      setIsEditMode(true);
      setItemToEdit(itemToEdit);
      handleShow();
    }
  };

  const handleSaveInventory = () => {
    if (isEditMode) {
      // Handle edit
      fetch(`http://localhost:8070/inventory/update/${itemToEdit._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((updatedItem) => {
          const updatedInventory = inventory.map((item) =>
            item._id === itemToEdit._id ? updatedItem : item
          );
          setInventory(updatedInventory);
          handleClose();
          window.location.reload(); // Refresh the page after successful update
        })
        .catch((error) => console.error(error));
    } else {
      // Handle add
      fetch('http://localhost:8070/inventory/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          setInventory([...inventory, data]);
          handleClose();
          window.location.reload(); // Refresh the page after successful addition
        })
        .catch((error) => console.error(error));
    }
  };
  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }
  const categoryOptions = [
    'Electronics',
    'Kitchen Appliances',
    'Bedroom Furnishings',
    'Bathroom Supplies',
    'Cleaning Supplies',
    'Toiletries',
    'Food and Beverages',
    'Decorative Items'
  ];
  const handleDeleteInventory = (id) => {
    // Handle delete
    fetch(`http://localhost:8070/inventory/delete/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedInventory = inventory.filter((item) => item._id !== id);
        setInventory(updatedInventory);
      })
      .catch((error) => console.error(error));
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      handleDeleteInventory(itemToDelete);
      setItemToDelete(null);
    } else {
      console.error('Item to delete not specified.');
    }

    setDeleteConfirmationModal(false);
  };
  const handleDeleteConfirmation = (id) => {
    setItemToDelete(id);
    setDeleteConfirmationModal(true); 
  };
  const filteredInventory = inventory.filter((item) => {
    const itemName = item.name ? item.name.toLowerCase() : '';
    const itemCategory = item.category ? item.category.toLowerCase() : '';

    return (
      itemName.includes(searchTerm.toLowerCase()) ||
      itemCategory.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container mt-5">
      {inventory.length === 0 && <Spinner animation="border" variant="primary" />}
      {inventory.length > 0 && (
        <div className="container mt-5">
          <div className="mb-3">
            <Button variant="success" onClick={handleShow} className="my-3 mx-2">
              Add Inventory
            </Button>
            <Button variant="primary" onClick={generatePDF} className="my-3 mx-2">
              Generate PDF
            </Button>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Description</th>
                <th>Manufacturer</th>
                <th>Expiry Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>Rs {item.price}</td>
                  <td>{item.description}</td>
                  <td>{item.manufacturer}</td>
                  <td>{formatDate(item.expiryDate)}</td>
                  <td>
                    <Button variant="primary" className="mx-1" onClick={() => handleEditInventory(item._id)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteConfirmation(item._id)} className="mx-1">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Inventory</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    {categoryOptions.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="quantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter quantity"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="manufacturer">
                  <Form.Label>Manufacturer</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter manufacturer"
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="expiryDate">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSaveInventory}>
                Save Inventory
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={deleteConfirmationModal} onHide={() => setDeleteConfirmationModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this item?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setDeleteConfirmationModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
