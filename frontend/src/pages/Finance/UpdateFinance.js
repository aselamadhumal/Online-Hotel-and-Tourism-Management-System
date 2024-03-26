import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateFinanceModal = ({ isOpen, onClose, initialValues }) => {
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');

    useEffect(() => {
        if (initialValues) {
            setCategory(initialValues.category);
            setAmount(initialValues.amount.toString());
            setType(initialValues.type);
        }
    }, [initialValues]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!category || !amount) {
                alert('Category and amount are required fields.');
                return;
            }

            const parsedAmount = parseFloat(amount);

            // Perform the update request with the updated data
            await axios.put(`http://localhost:8070/finance/update/${initialValues._id}`, {
                category: category,
                amount: parsedAmount,
                type: type,
            });

            // Close the modal after successful update
            onClose();
            alert('Data updated successfully!');
        } catch (error) {
            console.error('Error updating data:', error);
            alert('Error updating data. Please try again later.');
        }
    };

    return (
        <div className="modal fade" style={{ display: isOpen ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-hidden={!isOpen}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update Income | Expenses</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="amount" className="form-label">
                                    Amount
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Type</label>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="type"
                                        value="expense"
                                        checked={type === 'expense'}
                                        onChange={() => setType('expense')}
                                    />
                                    <label className="form-check-label">Expense</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="type"
                                        value="income"
                                        checked={type === 'income'}
                                        onChange={() => setType('income')}
                                    />
                                    <label className="form-check-label">Income</label>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateFinanceModal;
