import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// Importing CSS
import styles from './style.module.css';

import { Link } from 'react-router-dom';

// Importing Logo
import logo from '../../assets/Images/Login/login_logo.png';

interface LoginProps {
    setShowHeader: any,
    currentTab: any,
    setCurrentTab: any,
    mobileViewContainer: any,

    // Sidebar Apps List
    sidebarAppsListArray: any,
    setSidebarAppsListArray: any
}

const Login: React.FC<LoginProps> = ({
    setShowHeader,
    currentTab,
    setCurrentTab,
    mobileViewContainer,

    // Sidebar Apps List
    sidebarAppsListArray,
    setSidebarAppsListArray
}) => {
    const location = useLocation();

    useEffect(() => {
        // The current location.
        // console.clear();
        console.log('The current location is: ', location.pathname);
        const url = location.pathname;

        if ((url === '/login' || url === '/' || url === '/forgetpassword')) {
            setShowHeader(true);
        } else {
            setShowHeader(false);
        }
    }, [location, setShowHeader]);


    return (
        <div className={styles.containerCustom}>
            <div className={styles.leftSide}>
                <h3 className={styles.left_heading_about}>About Us</h3>
                <p className={styles.desc_left_login}>EQA is a web based application to automate</p>
                <h1 className={styles.heading_info_login}>
                    Education Quality Assurance (EQA) an <br />
                    Accreditation Framework for NCAA & ABET
                </h1>
                <p className={styles.bottom_desc_login}>
                    EQA is a web based application to automate the end to end Academic Accreditation
                    Activities and strictly enforcing compliance requirements outlined by the
                    Accreditation Agencies around the globe to improvise educational delivery methods
                    and practices.
                </p>
                <button
                    type="button"
                    className={`btn btn-outline-warning ${styles.btn_learn_more}`}
                    data-mdb-ripple-color="dark"
                >
                    Learn More
                </button>
            </div>
            <div className={styles.rightSide}>
                <form action="">
                    <img
                        className={styles.logoRight}
                        src={logo}
                        alt={"EQA University"}
                        title={"EQA University"}
                    />
                    <h2 className={styles.titleLoginAccount}>Login With Your Account</h2>
                    <section className={styles.form_inputs}>
                        <div>
                            <label className={styles.label_info}>User Name</label>
                            <input
                                className={`form-control ${styles.email}`}
                                type="email"
                                required={true}
                                placeholder='Enter User Name'
                            />
                        </div>
                        <div>
                            <label className={styles.label_info}>Password</label>
                            <input
                                className={`form-control ${styles.password}`}
                                type="password"
                                required={true}
                                placeholder='Enter Password'
                            />
                        </div>
                        {/* Default radio */}
                        <div className={`form-check ${styles.rememberMeBlock}`}>
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">&nbsp; Remember me for the next 30 days</label>
                        </div>
                        <button type='submit' className={`btn ${styles.btn_login}`}>
                            Login
                        </button>
                        <div className={styles.forgotPassword}>
                            Forgot Password?
                            <Link to="/forgetpassword">click here</Link>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    )
}
export default Login;