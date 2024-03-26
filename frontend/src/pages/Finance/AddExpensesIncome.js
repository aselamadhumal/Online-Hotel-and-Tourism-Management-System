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


}