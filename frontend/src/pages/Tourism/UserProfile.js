import React, { useState, useEffect } from "react";
import c4 from "../../images/c4.webp";
import c2 from "../../images/c3.jpg";
import { Link, useNavigate } from "react-router-dom";

const styles = {
    container: {
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
        background: `url(${c4})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
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
        color: '#25007c',
        marginBottom: '10px',
    },
    inputFocused: {
        border: '1px solid #25007c',
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

export default function UserProfile() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      // Get user ID from the cookie
      const userId = getCookie("userId");

      try {
        const response = await fetch(`http://localhost:8070/user/get/${userId}`, {
          method: "GET",
          headers: {
            // Include any necessary headers
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Failed to fetch user profile data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Function to get cookie by name
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };

    fetchUserProfile();
  }, []); // Empty dependency array means the effect runs once after the initial render

  return (
    <div>
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <div style={styles.imgContainer}></div>
          <div style={styles.form} className="text-start">
            <div className="col-12 d-flex justify-content-end">
            <Link to="/mybookings"className="btn btn-primary col-6">My Bookings</Link>

            </div>
            <h1 style={styles.heading}>User Profile</h1>
            <div style={styles.name}>
              <p>
                <strong>First Name:</strong> {userData.firstname}
              </p>
              <p>
                <strong>Last Name:</strong> {userData.lastname}
              </p>
            </div>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Phone No:</strong> {userData.contact}
            </p>
            <p>
              <strong>Type:</strong> {userData.type}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
