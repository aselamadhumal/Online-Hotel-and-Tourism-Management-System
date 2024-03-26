import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faComments, faEnvelope, faStar, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    return (
        <div>
            <footer className='bg-dark text-light'>
                <div className="container " style={{bottom:0}}>
                    <div className="row">
                        <div className="col-md-4 footer-column">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <span className="footer-title">The Kings Bay</span>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Our Rooms</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Frequently asked questions</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4 footer-column">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <span className="footer-title">Company</span>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">About us</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Job postings</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">News and articles</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4 footer-column">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <span className="footer-title">Contact & Support</span>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link"><FontAwesomeIcon icon={faPhone} />+47 45 80 80 80</span>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><FontAwesomeIcon icon={faComments} />Live chat</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><FontAwesomeIcon icon={faEnvelope} />Contact us</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#"><FontAwesomeIcon icon={faStar} />Give feedback</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="text-center"><FontAwesomeIcon icon={faEllipsisH} /></div>

                    <div className="row text-center">
                        <div className="col-md-4 box">
                            <span className="copyright quick-links">Copyright &copy; Coloxo {new Date().getFullYear()}
                            </span>
                        </div>
                        <div className="col-md-4 box">
                            <ul className="list-inline quick-links">
                                <li className="list-inline-item">
                                    <a href="#">Privacy Policy</a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#">Terms of Use</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
