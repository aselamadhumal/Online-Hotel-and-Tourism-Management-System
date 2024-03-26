import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const KitchenManagement = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isConfirmedView, setIsConfirmedView] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        orderId: '',
        name: '',
        item: '',
        quantity: '',
        status: 'pending',
        prepare: 'pending'
    });
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [isRemoveConfirmationVisible, setIsRemoveConfirmationVisible] = useState(false);

    const [selectedOrderId, setSelectedOrderId] = useState(null);
    useEffect(() => {
        fetchOrders();
    }, []);
    const handleSearch = event => {
        setSearchTerm(event.target.value);
    };

    const filteredOrders = orders.filter(order =>
        order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const fetchOrders = () => {
        fetch('http://localhost:8070/kitchen/')
            .then(response => response.json())
            .then(data => setOrders(data))
            .catch(error => console.error(error));
    };
    const handleUpdateOrder = (orderId) => {
        setSelectedOrderId(orderId);
        setIsUpdateModalVisible(true);

        fetch(`http://localhost:8070/kitchen/get/${orderId}`)
            .then(response => response.json())
            .then(orderData => {
                setFormData({ name: orderData.name, item: orderData.item, quantity: orderData.quantity });
            })
            .catch(error => console.error(error));
    };
    const generateReport = () => {
        const unit = 'pt';
        const size = 'A4'; // Use A4 size for the PDF

        const marginLeft = 40;
        const doc = new jsPDF('p', unit, size);

        doc.setFontSize(16);
        const title = 'Kitchen Orders Report';
        const headers = [['Order ID', 'Name', 'Item', 'Quantity', 'Status', 'Prepare']];
        const data = orders.map(order => [order._id, order.name, order.item, order.quantity, order.status, order.prepare]);

        let content = {
            startY: 50,
            head: headers,
            body: data,
            theme: 'grid'
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save('kitchen_orders_report.pdf');
    };

    const confirmRemove = (orderId) => {
        setSelectedOrderId(orderId);
        setIsRemoveConfirmationVisible(true);
    };
    const handleUpdateSubmit = (event) => {
        event.preventDefault();

        fetch(`http://localhost:8070/kitchen/update/${selectedOrderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((updatedOrder) => {
                fetchOrders(); // Refresh orders after updating
                setIsUpdateModalVisible(false); // Close the update modal
            })
            .catch((error) => console.error(error));
    };

    const handleRemoveOrder = () => {
        fetch(`http://localhost:8070/kitchen/delete/${selectedOrderId}`, {
            method: 'DELETE',
        })
            .then(() => {
                fetchOrders();
            })
            .catch(error => console.error(error));

        setIsRemoveConfirmationVisible(false);
    };


    const handleConfirmToggle = () => {
        setIsConfirmedView(prevState => !prevState);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({
            name: '',
            item: '',
            quantity: '',
            status: 'pending',
            prepare: 'pending'
        });
    };

    const handleFormChange = event => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleConfirmOrder = orderId => {
        fetch(`http://localhost:8070/kitchen/update/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'confirmed' })
        })
            .then(response => response.json())
            .then(updatedOrder => {
                // Handle the updated order if necessary
                // ...
                fetchOrders(); // Refresh orders after updating
            })
            .catch(error => console.error(error));
    };

    const handleMarkPrepared = orderId => {
        // Send API request to mark the order as prepared with orderId
        fetch(`http://localhost:8070/kitchen/update/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prepare: 'prepared' })
        })
            .then(response => response.json())
            .then(updatedOrder => {
                // Handle the updated order if necessary
                // ...
                fetchOrders(); // Refresh orders after updating
            })
            .catch(error => console.error(error));
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        // Send formData to the API for adding/updating orders
        fetch(`http://localhost:8070/kitchen/${formData.orderId ? 'update/' + formData.orderId : 'add'}`, {
            method: formData.orderId ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(newOrder => {
                // Handle the new or updated order if necessary
                // ...
                fetchOrders(); // Refresh orders after updating
            })
            .catch(error => console.error(error));

        handleCloseModal();
    };

    return (
        <div className="container mt-5">
            <div className='d-flex justify-content-center'>
            <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="form-control col-3 mb-2"
                />

            </div>
            <div className="mb-3 mx-1">
                <Button variant="success" className="mx-1" onClick={handleShowModal}>
                    Add Order
                </Button>
                <Button variant="primary" className="mx-2" onClick={generateReport}>
                    Generate Report
                </Button>
            </div>

            {/* Table displaying orders */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Name</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {filteredOrders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.name}</td>
                                <td>{order.item}</td>
                                <td>{order.quantity}</td>
                                <td>{order.status} & Order {order.prepare}</td>
                                <td>
                                    <Button
                                        variant="info"
                                        className="mx-2"
                                        onClick={() => handleConfirmOrder(order._id)}
                                        disabled={order.status === 'confirmed'}
                                    >
                                        Confirm
                                    </Button>
                                    <Button
                                        variant="success"
                                        className="mx-2"
                                        onClick={() => handleMarkPrepared(order._id)}
                                        disabled={order.prepare === 'prepared'}
                                    >
                                        Prepared
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        variant="primary"
                                        className="mx-2"
                                        onClick={() => handleUpdateOrder(order._id)}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="danger"
                                        className="mx-2"
                                        onClick={() => confirmRemove(order._id)}
                                    >
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            <Modal show={isUpdateModalVisible} onHide={() => setIsUpdateModalVisible(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdateSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleFormChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="item">
                            <Form.Label>Item</Form.Label>
                            <Form.Control
                                type="text"
                                name="item"
                                value={formData.item}
                                onChange={handleFormChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="quantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="text"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleFormChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Update Order
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={isRemoveConfirmationVisible} onHide={() => setIsRemoveConfirmationVisible(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Removal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to remove this order?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsRemoveConfirmationVisible(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleRemoveOrder}>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for adding/updating orders */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Order Mannually</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleFormChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="item">
                            <Form.Label>Item</Form.Label>
                            <Form.Control
                                type="text"
                                name="item"
                                value={formData.item}
                                onChange={handleFormChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="quantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="text"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleFormChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={formData.status}
                                onChange={handleFormChange}
                                required
                            >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                            </Form.Control>
                        </Form.Group>
                        {formData.status === 'confirmed' && (
                            <Form.Group controlId="prepare">
                                <Form.Label>Prepare</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="prepare"
                                    value={formData.prepare}
                                    onChange={handleFormChange}
                                    required
                                >
                                    <option value="pending">Pending</option>
                                    <option value="prepared">Prepared</option>
                                </Form.Control>
                            </Form.Group>
                        )}
                        <Button variant="primary" type="submit">
                            Save Order
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default KitchenManagement;
