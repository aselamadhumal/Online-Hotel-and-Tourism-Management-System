import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import AddExpensesIncome from './AddExpensesIncome';
import jsPDF from 'jspdf';

ChartJS.register(ArcElement, Tooltip, Legend);


const ViewFinance = () => {
    const [incomeData, setIncomeData] = useState([]);
    const [expensesData, setExpensesData] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState('');
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedFinanceEntry, setSelectedFinanceEntry] = useState(null);
    const [updateCategory, setUpdateCategory] = useState('');
    const [updateAmount, setUpdateAmount] = useState('');
    const [searchCategory, setSearchCategory] = useState('');

    const [roomIncome, setRoomIncome] = useState(0);
    const [kitchenIncome, setKitchenIncome] = useState(0);
    const [staffExpenses, setStaffExpenses] = useState(0);
    const [maintenanceExpenses, setMaintenanceExpenses] = useState(0);
    const [inventoryExpenses, setInventoryExpenses] = useState(0);


    useEffect(() => {

        fetchData();
        fetchAllData();
    }, []);
    const fetchAllData = async () => {
        try {
            const response = await axios.get('http://localhost:8070/finance/');
            const financeData = response.data;
            const income = financeData.filter(item => item.type === 'income');
            const expenses = financeData.filter(item => item.type === 'expense');
            console.log(financeData)
            setIncomeData(income);
            setExpensesData(expenses);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleOpenUpdateModal = (item) => {
        setUpdateCategory(item.category);
        setUpdateAmount(item.amount);
        setIsUpdateModalOpen(true);
        setSelectedFinanceEntry(item);
    };
    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8070/finance/update/${selectedFinanceEntry._id}`, {
                category: updateCategory,
                amount: updateAmount,
            });
            console.log('Finance entry updated successfully:', response.data);
            fetchAllData();
            setIsUpdateModalOpen(false);
        } catch (error) {
            console.error('Error updating finance entry:', error);
        }
    };
    const filteredIncomeData = incomeData.filter((item) =>
        item.category.toLowerCase().includes(searchCategory.toLowerCase())
    );
    const filteredExpensesData = expensesData.filter((item) =>
        item.category.toLowerCase().includes(searchCategory.toLowerCase())
    );

    // Update the searchCategory state as the user types
    const handleCategorySearch = (e) => {
        setSearchCategory(e.target.value);
    };

    const generatePDF = () => {
        const doc = new jsPDF();

        // Add content to the PDF
        doc.text('Income Report', 10, 10);

        // Define columns and rows for the income table
        const incomeColumns = ['Category', 'Amount'];
        const incomeRows = filteredIncomeData.map((item) => [item.category, item.amount]);

        // Set the position and dimensions for the income table
        const incomeTableX = 10;
        const incomeTableY = 20;

        // Add the income table to the PDF
        doc.autoTable({
            startX: incomeTableX,
            startY: incomeTableY,
            head: [incomeColumns],
            body: incomeRows,
            theme: 'plain',
        });

        // Add a new page for the expenses report
        doc.addPage();

        // Add content to the PDF for expenses
        doc.text('Expenses Report', 10, 10);

        // Define columns and rows for the expenses table
        const expensesColumns = ['Category', 'Amount'];
        const expensesRows = filteredExpensesData.map((item) => [item.category, item.amount]);

        // Set the position and dimensions for the expenses table
        const expensesTableX = 10;
        const expensesTableY = 20;

        // Add the expenses table to the PDF
        doc.autoTable({
            startX: expensesTableX,
            startY: expensesTableY,
            head: [expensesColumns],
            body: expensesRows,
            theme: 'plain',
        });

        // Save the PDF
        doc.save('finance_report.pdf');
    };

    const fetchData = async () => {
        try {
            const [roomResponse, kitchenResponse, staffResponse, maintenanceResponse, inventoryResponse] =
                await Promise.all([ 
                    axios.get('http://localhost:8070/rooms/'),
                    axios.get('http://localhost:8070/kitchen/'),
                    axios.get('http://localhost:8070/staff/'),
                    axios.get('http://localhost:8070/maintenance/'),
                    axios.get('http://localhost:8070/inventory/')  
                ]);
            // Calculate total income without using reduce
            const calculatedRoomIncome = roomResponse.data.reduce((total, item) => total + item.total, 0);
            const calculatedKitchenIncome = kitchenResponse.data.reduce((total, item) => total + item.price, 0);
            const calculatedStaffExpenses = staffResponse.data.reduce((total, item) => total + item.salary, 0);
            const calculatedMaintenanceExpenses = maintenanceResponse.data.reduce(
                (total, item) => total + item.costOfLost + item.costToReplace,
                0
            );
            const calculatedInventoryExpenses = inventoryResponse.data.reduce((total, item) => total + item.price, 0);

            setRoomIncome(calculatedRoomIncome);
            setKitchenIncome(calculatedKitchenIncome);
            setStaffExpenses(calculatedStaffExpenses);
            setMaintenanceExpenses(calculatedMaintenanceExpenses);
            setInventoryExpenses(calculatedInventoryExpenses);

            const totalIncome = roomIncome + kitchenIncome;
            const totalExpenses = staffExpenses + maintenanceExpenses + inventoryExpenses;

            setTotalIncome(totalIncome);
            setTotalExpenses(totalExpenses);


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleDelete = (id, category) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the ${category} entry?`);
        if (confirmDelete) {
            handleConfirmDelete(id);
        }
    };

    const handleConfirmDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/finance/delete/${id}`);
            // Refetch data after deletion
            fetchAllData();
        } catch (error) {
            console.error('Error deleting finance entry:', error);
        }
    };
    const data = {
    labels: ['Income', 'Expenses'], 
    datasets: [
        {
            data: [totalIncome, totalExpenses],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1,
        },
    ],
};
    const handleUpdateFinance = async () => {
        try {
            const response = await axios.put('http://localhost:8070/finance/fetched', {
                room: roomIncome,
                kitchen: kitchenIncome,
                staff: staffExpenses,
                maintenance: maintenanceExpenses,
                inventory: inventoryExpenses
            });
            fetchAllData();
            console.log('Finance updated successfully:', response.data);
            // Call fetchData again to update the UI with new data
            fetchData();
        } catch (error) {
            console.error('Error updating finance data:', error);
        }
    };
    return (
        <div className="container mt-4">
            <h2>Finance Overview</h2>
            <div className="row">
                <div className="col-md-6 d-flex justify-content-center" style={{ height: 300 }}>
                    <Pie data={data} />
                </div>
                <div className="col-md-6">
                    <div class="card my-3" style={{ width: '18rem' }}>
                        <div class="card-body">
                            <h5 class="card-title">Income: </h5>
                            <p class="card-text">Rs {totalIncome}</p>
                        </div>
                    </div>
                    <div class="card my-2" style={{ width: '18rem' }}>
                        <div class="card-body">
                            <h5 class="card-title">Expenses:</h5>
                            <p class="card-text">Rs {totalExpenses}</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-start'>
                        <button className="btn btn-primary col-4" onClick={generatePDF}>
                            Generate PDF
                        </button>
                    </div>

                </div>
                <button className='btn btn-primary mt-2 mb-5' onClick={handleUpdateFinance}>Update for Finance</button>
            </div>
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                Add Income | Expenses
            </button>
            <div className="mb-3 my-2  col-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by category..."
                    value={searchCategory}
                    onChange={handleCategorySearch}
                />
            </div>
            <h3 className="mt-4">Income</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredIncomeData.map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.category}</td>
                            <td>{item.amount}</td>
                            <td>
                                <button className="btn btn-primary mx-1" onClick={() => handleOpenUpdateModal(item)}>Update</button>
                                <button className="btn btn-danger mx-1" onClick={() => {
                                    setDeleteItemId(item._id);
                                    handleDelete(item._id, item.category);
                                }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3 className="mt-4">Expenses</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredExpensesData.map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.category}</td>
                            <td>{item.amount}</td>
                            <td>
                                <button className="btn btn-primary mx-1" onClick={() => handleOpenUpdateModal(item)}>
                                    Update
                                </button>
                                <button className="btn btn-danger mx-1" onClick={() => {
                                    setDeleteItemId(item._id);
                                    handleDelete(item._id, item.category);
                                }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isUpdateModalOpen && selectedFinanceEntry && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Income | Expenses</h5>
                                <button type="button" className="close" onClick={() => setIsUpdateModalOpen(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-start">
                                <div className="mb-3">
                                    <label htmlFor="updateCategory" className="form-label">
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="updateCategory"
                                        value={updateCategory}
                                        onChange={(e) => setUpdateCategory(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="updateAmount" className="form-label">
                                        Amount
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="updateAmount"
                                        value={updateAmount}
                                        onChange={(e) => setUpdateAmount(e.target.value)}
                                    />
                                </div>
                                <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="modal fade" id="confirmationModal" tabIndex="-1" role="dialog" aria-labelledby="confirmationModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="confirmationModalLabel">Confirm Deletion</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this entry?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Income | Expenses</h5>
                                <p type="button" className="close text-danger" onClick={() => setIsModalOpen(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </p>
                            </div>
                            <div className="modal-body">
                                <AddExpensesIncome />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewFinance;
