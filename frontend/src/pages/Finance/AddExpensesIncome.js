import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const AddExpensesIncome = () => {
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!category || !amount) {
                alert('Category and amount are required fields.');
                return;
            }

            const parsedAmount = parseFloat(amount);

            await axios.post('http://localhost:8070/finance/add/', {
                category: category,
                amount: parsedAmount,
                type: type,
            });
            setCategory('');
            setAmount('');

            alert('Data submitted successfully!');
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('Error submitting data. Please try again later.');
        }
    };


    return (
        <div className="container mt-4">
            <h2>Add Expenses/Income</h2>
            <div className='d-flex justify-content-center'>
                <form onSubmit={handleSubmit} className='text-start col-4'>
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
                    <button type="submit" className="btn btn-primary" onClick={() => setIsModalOpen(false)}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );


};

export default AddExpensesIncome;
