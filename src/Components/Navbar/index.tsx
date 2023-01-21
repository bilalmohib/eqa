/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { CgMenu } from 'react-icons/cg';
import styles from './style.module.css';
import { useNavigate } from 'react-router';

import {
    IoIosNotificationsOutline
} from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { RxCube } from "react-icons/rx";

import {
    CircularProgress,
    Box,
    Typography,
    Link,
} from "@mui/material";

interface NavProps {
    setIsOpen: any,
    isOpen: Boolean
}

const Navbar: React.FC<NavProps> = ({
    setIsOpen,
    isOpen
}) => {
    const navigate = useNavigate();
    const logoutUser = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            alert("You have been signed out successfully");
        }
    }

    return (
        <nav className={`navbar navbar-expand-lg navbar-light ${styles.nav_bar} ${(isOpen === true) ? (styles.isSideOpen) : (styles.isSideClose)}`}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    &nbsp;
                    <button onClick={() => setIsOpen(!isOpen)} type="button" className="btn btn-sm btn-outline-primary" style={{ color: "#e09d3b", border: "1px solid #e09d3b" }} data-mdb-ripple-color="dark">
                        <span className={styles.navbarHamburger}> <CgMenu size={25} /> </span>
                    </button>
                    &nbsp; &nbsp;
                    <div>
                        <input
                            type="text"
                            className='form-control'
                            style={{ border: "none" }}
                            placeholder='Search for anything'
                        />
                    </div>
                </a>
                <div>
                    {(true) ? (
                        <div className={`${styles.navItems} navbar-nav`}>
                            {/* Avatar */}
                            <li className="nav-item dropdown">
                                <a className="nav-link d-flex align-items-center" href="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                                    <IoSettingsOutline
                                        size={25}
                                        color="#4f747a"
                                    />
                                </a>
                                <ul className={`dropdown-menu ${styles.dropdown_nav}`} aria-labelledby="navbarDropdownMenuLink">
                                    <li>
                                        <a className="dropdown-item" href="#">My profile</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Settings</a>
                                    </li>
                                    <li onClick={logoutUser}>
                                        <a className="dropdown-item" href="#">Logout</a>
                                    </li>
                                </ul>
                            </li>
                            {/* Avatar */}

                            {/* Avatar */}
                            <li className="nav-item dropdown">
                                <a className="nav-link d-flex align-items-center" href="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                                    <RxCube
                                        size={25}
                                        color="#4f747a"
                                    />
                                </a>
                                <ul className={`dropdown-menu ${styles.dropdown_nav}`} aria-labelledby="navbarDropdownMenuLink">
                                    <li>
                                        <a className="dropdown-item" href="#">My profile</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Settings</a>
                                    </li>
                                    <li onClick={logoutUser}>
                                        <a className="dropdown-item" href="#">Logout</a>
                                    </li>
                                </ul>
                            </li>
                            {/* Avatar */}

                            {/* Avatar */}
                            <li className="nav-item dropdown">
                                <a className="nav-link d-flex align-items-center" href="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                                    <IoIosNotificationsOutline
                                        size={32}
                                        color="#4f747a"
                                    />
                                </a>
                                <ul className={`dropdown-menu ${styles.dropdown_nav} ${styles.dropdownProfileNab}`} aria-labelledby="navbarDropdownMenuLink">
                                    <li>
                                        <a className="dropdown-item" href="#">My profile</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Settings</a>
                                    </li>
                                    <li onClick={logoutUser}>
                                        <a className="dropdown-item" href="#">Logout</a>
                                    </li>
                                </ul>
                            </li>
                            {/* Avatar */}

                            {/* Avatar */}
                            <li className="nav-item dropdown">
                                <a className="nav-link d-flex align-items-center" href="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                                    <img
                                        src="https://mdbootstrap.com/img/new/avatars/2.jpg"
                                        className="rounded-circle"
                                        width={33}
                                        height={33}
                                        alt="avatar"
                                        loading="lazy" />
                                </a>
                                <ul className={`dropdown-menu ${styles.dropdown_nav} ${styles.dropdownProfileNav}`} aria-labelledby="navbarDropdownMenuLink">
                                    <li>
                                        <div className={styles.topContainerDropDownNav}>
                                            <div className={styles.insideContainerProfile}>
                                                <div className={styles.leftInsideProfile}>
                                                    <img
                                                        className={styles.imageProfile}
                                                        width={50}
                                                        height={50}
                                                        src="http://localhost:3001/img/demo/avatars/avatar-admin.png"
                                                        alt="Md Shabbir Alam"
                                                    />
                                                </div>
                                                <div className={styles.rightInsideProfile}>
                                                    <h3>Md Shabbir Alam</h3>
                                                    <p>New York, Uk</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li><a className="dropdown-item" href="#">Reset Layout</a></li>
                                    <li>
                                        <a className="dropdown-item" href="#">Settings</a>
                                    </li>
                                    {/* Divider */}
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    Full Screen
                                                </div>
                                                <div>
                                                    <i style={{ color: "grey" }}>F 11</i>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    Print
                                                </div>
                                                <div>
                                                    <i style={{ color: "grey" }}>Ctrl + P</i>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    Language
                                                </div>
                                                <div>
                                                    <b style={{ color: "black" }}>
                                                        &gt;
                                                    </b>
                                                </div>
                                            </div>
                                        </a>
                                        <ul className="dropdown-menu dropdown-submenu">
                                            <li>
                                                <a className="dropdown-item" href="#">English</a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">Arabic</a>
                                            </li>
                                            {/* <li>
                                                <a className="dropdown-item" href="#">Submenu item 3 &raquo; </a>
                                                <ul className="dropdown-menu dropdown-submenu">
                                                    <li>
                                                        <a className="dropdown-item" href="#">Multi level 1</a>
                                                    </li>
                                                    <li>
                                                        <a className="dropdown-item" href="#">Multi level 2</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">Submenu item 4</a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">Submenu item 5</a>
                                            </li> */}
                                        </ul>
                                    </li>
                                    {/* Divider */}
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <div className="d-flex justify-content-between" style={{height:30}}>
                                                <div>
                                                    <b className='text-danger'>Logout</b>
                                                </div>
                                                <div style={{ textOverflow: "ellipsis", width: 120 }}>
                                                    <p style={{ color: "black", textOverflow: "ellipsis", overflow: "hidden" }}>bilalmohib7896@gmail.com</p>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            {/* Avatar */}
                        </div>
                    ) : (
                        <Box
                            sx={{
                                marginRight: { sm: "27px", xs: "10px" },
                            }}
                        >
                            <Link
                                sx={{
                                    fontSize: "20px",
                                    fontWeight: "500",
                                    letterSpacing: "0.1px",
                                    color: "#fff",
                                    margin: "0",
                                    marginBottom: "5px",
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    "&:hover": {
                                        textDecoration: "underline",
                                        color: "#0091ff",
                                    },
                                }}
                                onClick={() => navigate("/login2")}
                            >
                                Login
                            </Link>
                        </Box>
                    )}
                </div>
            </div>
        </nav >
    )
}
export default Navbar;