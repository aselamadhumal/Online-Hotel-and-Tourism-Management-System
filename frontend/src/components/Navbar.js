import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/the kings bay logo.png";

const styles = {
    header: {
        width: '100%',
        height: '86px',
        padding: '15px 0px 15px 0px',
        background: '#fff',
    },
    logo: {
        maxWidth: '150px',
    },
    navigation: {
        float: 'right',
        paddingTop: '14px',
        padding: '0',
    },
    navLink: {
        padding: '7px 0px 27px 0px',
        margin: '0 22px',
        color: '#010101',
        fontSize: '16px',
        lineHeight: '20px',
        fontWeight: '500',
        textTransform: 'uppercase',
        borderBottom: '#fff solid 3px',
        textDecoration: 'none',
    },
    activeNavLink: {
        color: '#fe0000',
        borderBottom: '#fe0000 solid 3px',
    },
};
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
export default function Navbar() {
    const userId = getCookie('userId');
    return (
        <div>
            <div>
                <div style={styles.header}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
                                <div className="full">
                                    <div className="center-desk">
                                        <div style={styles.logo}>
                                            <a href="/">
                                                <img src={logo} style={styles.logo} alt="#" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
                                <nav style={styles.navigation} className="navbar navbar-expand-md navbar-dark">
                                    <button
                                        className="navbar-toggler"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target="#navbarsExample04"
                                        aria-controls="navbarsExample04"
                                        aria-expanded="false"
                                        aria-label="Toggle navigation"
                                    >
                                        <span className="navbar-toggler-icon" />
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarsExample04">
                                        <ul className="navbar-nav mr-auto">
                                            <li className="nav-item active">
                                                <Link style={styles.navLink} className="nav-link" to="/">
                                                    Home
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link style={styles.navLink} className="nav-link" to="/event">
                                                    Events
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link style={styles.navLink} className="nav-link" to="/rooms">
                                                    Our room
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link style={styles.navLink} className="nav-link" to="/order">
                                                    Bakery
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link style={styles.navLink} className="nav-link" to="/viewpackages">
                                                    Packages
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link style={styles.navLink} className="nav-link" to="">
                                                    Contact Us
                                                </Link>
                                            </li>
                                        </ul>
                                        {userId ? (
                                            <Link to="/userprofile">
                                                <button className='btn btn-primary'>Profile</button>
                                            </Link>
                                        ) : (
                                            <Link to="/signin">
                                                <button className='btn btn-primary'>Sign In</button>
                                            </Link>
                                        )}
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
