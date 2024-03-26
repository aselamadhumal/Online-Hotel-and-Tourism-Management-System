import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Modal, Form } from 'react-bootstrap';

const items = [
    {
        id: 1,
        name: 'Croissant',
        price: 2.5,
        image: 'https://via.placeholder.com/150',
      },
      {
        id: 2,
        name: 'Baguette',
        price: 3.0,
        image: 'https://via.placeholder.com/150',
      },
      {
        id: 3,
        name: 'Sourdough Bread',
        price: 4.5,
        image: 'https://via.placeholder.com/150',
      },
      {
        id: 4,
        name: 'Cinnamon Roll',
        price: 2.0,
        image: 'https://via.placeholder.com/150',
      },
      {
        id: 5,
        name: 'Chocolate Chip Cookie',
        price: 1.5,
        image: 'https://via.placeholder.com/150',
      },
];

const ClientOrderManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [orderDetails, setOrderDetails] = useState({
    name: '', // Allow user to input their name
    item: '',
    quantity: 1,
  });

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setOrderDetails({
      name: 'Test',
      item: '',
      quantity: 1,
    });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setOrderDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // API call to add the order
    fetch('http://localhost:8070/kitchen/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the new order data returned from the API
        console.log('Order added successfully:', data);
      })
      .catch((error) => {
        console.error('Error adding order:', error);
      });

    handleCloseModal();
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {items.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Price: ${item.price}</Card.Text>
                <Button variant="primary" onClick={() => handleShowModal(item)}>
                  Order Now
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Modal for adding orders */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Place Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="itemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                name="item"
                value={selectedItem ? selectedItem.name : ''}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={orderDetails.quantity}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Place Order
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ClientOrderManagement;
