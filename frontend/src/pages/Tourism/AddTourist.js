import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import c2 from '../../images/c3.jpg';

const styles = {
    container: {
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
    },
    formContainer: {
        backgroundColor: '#ffffffa1',
        backdropFilter: 'blur(10px)',
        border: '2px solid #ffffff6d',
        width: '760px',
        borderRadius: '10px',
        boxShadow: '3px 3px 11px 1.5px #0000002b',
        padding: '10px',
        height: 'max-content',

        display: 'grid',
        gridTemplateColumns: '50% 50%',
    },
    heading: {
        padding: '20px',
        color: '#2348ff',
        fontSize: '2.1rem',
        fontWeight: 800,
        gridColumn: '1/span 2',
    },
    imgContainer: {
        overflow: 'hidden',
        borderRadius: '10px',
        background: `url(${c2})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
    },
    name: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 50%)',
    },
    listItem: {
        listStyleType: 'none',
        display: 'flex',
        flexDirection: 'column',
        padding: '0px 5px',
        textAlign: 'left',
    },
    label: {
        fontSize: '0.8rem',
        fontWeight: 600,
        width: '100%',
        padding: '5px 15px',
        color: '#2348ff',
    },
    input: {
        padding: '10px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#ffffff6d',
        width: '100%',
        outline: 'none',
        color: '#25007c', // Updated color
        marginBottom: '10px',
    },
    inputFocused: {
        border: '1px solid #25007c', // Updated color
    },
    select: {
        width: '100%',
    },
    phone: {
        display: 'grid',
        gridTemplateColumns: '35% 65%',
    },
    phoneInput: {
        flex: 1,
        width: '100%',
    },
    subscribe: {
        display: 'flex',
        flexDirection: 'row',
        padding: '10px',
        alignItems: 'center',
    },
    checkBoxCont: {
        width: '25px',
        borderRadius: '5px',
        height: '25px',
        position: 'relative',
        border: '1px solid #25007c',
        transitionDuration: '0.2s',
    },
    checkBoxContHover: {
        backgroundColor: '#25007c',
    },
    tickLine: {
        backgroundColor: '#25007c', // Updated color
        borderRadius: '20px',
        height: '3px',
        position: 'absolute',
        width: '20px',
        transitionDuration: '0.3s',
        border: 'none',
    },
    tickLine1: {
        transform: 'rotate(-45deg)',
        top: '10px',
        left: '5px',
        opacity: 0,
        width: '18px',
        animation: '1s car linear infinite',
    },
    tickLine2: {
        transform: 'rotate(50deg)',
        top: '12px',
        width: '8px',
        opacity: 0,
        left: '2px',
    },
    subscribeLabel: {
        padding: '10px',
        width: 'fit-content',
    },
    button: {
        width: 'fit-content',
        borderRadius: '5px',
        padding: '10px 20px',
        fontSize: '1.1rem',
        color: 'white',
        backgroundColor: '#2348ff',
        border: 'none',
        cursor: 'pointer',
        margin: 'auto',
    },
};

export default function AddTourist() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        contact: '',
        password: '',
        confirmPassword: '',
    });

    const [passwordMismatch, setPasswordMismatch] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8070/user/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                navigate('/tourists');
            } else {
                alert('This email is already registered');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <div>
                <div style={styles.container}>
                    <div style={styles.formContainer}>
                        <div style={styles.imgContainer}></div>
                        <form id="Form" style={styles.form} onSubmit={handleSubmit}>
                            <h1 style={styles.heading}>Add a Tourist</h1>
                            <div style={styles.name}>
                                <li style={styles.listItem}>
                                    <label style={styles.label}>First Name:</label>
                                    <input
                                        type="text"
                                        name="firstname"
                                        placeholder="First"
                                        style={styles.input}
                                        onChange={handleInputChange}
                                    />
                                </li>
                                <li style={styles.listItem}>
                                    <label style={styles.label}>Last Name:</label>
                                    <input
                                        type="text"
                                        name="lastname"
                                        placeholder="Last"
                                        style={styles.input}
                                        onChange={handleInputChange}
                                    />
                                </li>
                            </div>
                            <li style={styles.listItem}>
                                <label style={styles.label}>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    style={styles.input}
                                    onChange={handleInputChange}
                                />
                            </li>
                            <div>
                                <li style={styles.listItem}>
                                    <label style={styles.label}>Phone No:</label>
                                    <input
                                        type="number"
                                        name="contact"
                                        placeholder="Phone Number"
                                        style={styles.input}
                                        onChange={handleInputChange}
                                    />
                                </li>
                            </div>
                            <div style={styles.password}>
                                <li style={styles.listItem}>
                                    <label style={styles.label}>Password:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        style={styles.input}
                                        placeholder="Password"
                                        onChange={handleInputChange}
                                    />
                                </li>
                            </div>
                            <button type="submit" style={styles.button}>
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
