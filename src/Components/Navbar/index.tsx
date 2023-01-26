/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { CgMenu } from 'react-icons/cg';
import { MdMenuOpen } from 'react-icons/md';
import styles from './style.module.css';
import { useNavigate } from 'react-router';
import { AiTwotoneLock } from 'react-icons/ai';
import SearchIcon from '@mui/icons-material/Search';

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

// Importing the Data
import MessageList from '../../Data/Navbar/MessageList';
import NotificationsList from '../../Data/Navbar/NotificationsList';
// Importing the Data

import {
    IoIosNotificationsOutline
} from "react-icons/io";
import {
    IoColorPaletteOutline, IoColorPaletteSharp
} from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { RxCube } from "react-icons/rx";

import {
    CircularProgress,
    Box,
    Typography,
    Link
} from "@mui/material";

interface NavProps {
    setIsOpen: any,
    isOpen: Boolean,
    // For minified sidebar
    isMinified: Boolean,
    setIsMinified: any
}

const Navbar: React.FC<NavProps> = ({
    setIsOpen,
    isOpen,
    // For minified sidebar
    isMinified,
    setIsMinified
}) => {
    const navigate = useNavigate();

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    const [selectedDay, setSelectedDay] = useState<any>(null);

    const [currentNotificationActiveTab, setCurrentNotificationActiveTab] = useState<Number>(1);

    const logoutUser = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            alert("You have been signed out successfully");
        }
    }

    return (
        <nav className={`navbar navbar-expand-lg navbar-light ${styles.nav_bar} ${(isOpen === true) ? (`${(!isMinified) ? (styles.isSideOpen) : (styles.isSideOpenMinified)}`) : (styles.isSideClose)} ${(windowSize[0] < 991 && isOpen) ? ("") : ("")}`}
            onClick={() => {
                if (windowSize[0] < 991) {
                    setIsOpen(!isOpen);
                }
            }}
        >
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    &nbsp;
                    {(windowSize[0] < 991) ? (
                        <button onClick={() => setIsOpen(!isOpen)} type="button" className="btn btn-sm btn-outline-primary" style={{ color: "#e09d3b", border: "1px solid #e09d3b" }} data-mdb-ripple-color="dark">
                            <span className={styles.navbarHamburger}> <CgMenu size={25} /> </span>
                        </button>
                    ) : (
                        <div
                            className="dropdown NavigationDropDown"
                            data-hover="dropdown"
                            role="menu"
                            data-animations="fadeInDown fadeInRight fadeInUp fadeInLeft"
                        >
                            <button onClick={() => setIsOpen(!isOpen)} type="button" className="btn btn-sm btn-outline-primary" style={{ color: "#e09d3b", border: "1px solid #e09d3b" }} data-mdb-ripple-color="dark" id="dropdownMenuLink" data-mdb-toggle="dropdown" aria-expanded="false">
                                <span className={styles.navbarHamburger}> <CgMenu size={25} /> </span>
                            </button>
                            <ul
                                className={`dropdown-menu ${styles.minifyNavigationDropdown}`}
                                aria-labelledby="dropdownMenuLink"
                                data-hover="dropdown"
                                role="menu"
                                data-animations="fadeInDown fadeInRight fadeInUp fadeInLeft"
                            >
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <button onClick={() => {
                                            if (isMinified === true && isOpen === true) {
                                                setIsMinified(!isMinified)
                                                setIsOpen(false);
                                            } else {
                                                setIsOpen(!isOpen)
                                            }

                                        }} type="button" className="btn btn-sm btn-outline-primary" style={{ color: "#e09d3b", border: "1px solid #e09d3b" }} data-mdb-ripple-color="dark">
                                            <span className={styles.navbarHamburger}> <CgMenu size={25} /> </span>
                                        </button>
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <button onClick={() => {
                                            if (isOpen === true && isMinified === false) {
                                                setIsMinified(true);
                                                // setIsOpen(!isOpen);
                                            } else if (isOpen === true && isMinified === true) {
                                                setIsOpen(false);
                                                setIsMinified(false);
                                            } else if (isOpen === false && isMinified === true) {
                                                setIsMinified(!isMinified);
                                            } else {
                                                setIsOpen(true);
                                                setIsMinified(true);
                                            }
                                        }} type="button" className="btn btn-sm btn-outline-primary" style={{ color: "#e09d3b", border: "1px solid #e09d3b" }} data-mdb-ripple-color="dark">
                                            <span className={styles.navbarHamburger}> <MdMenuOpen size={25} /> </span>
                                        </button>
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <button onClick={() => console.log("It should be locked.")} type="button" className="btn btn-sm btn-outline-primary" style={{ color: "#e09d3b", border: "1px solid #e09d3b" }} data-mdb-ripple-color="dark">
                                            <span className={styles.navbarHamburger}> <AiTwotoneLock size={25} /> </span>
                                        </button>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                    &nbsp; &nbsp;
                    <Box sx={{ display: "flex",ml:4}}>
                        <Box>
                            <SearchIcon color="action" />
                        </Box>
                        <div className={`${styles.searchBoxNavbar}`}>
                            <input
                                type="text"
                                className='form-control'
                                style={{ border: "none" }}
                                placeholder='Search for anything'
                            />
                        </div>
                    </Box>
                </a>
                <div>
                    {(true) ? (
                        <div className={`${styles.navItems} navbar-nav`}>
                            {/* Generic Settings Menu Item */}
                            <li className="nav-item">
                                <a className="nav-link d-flex align-items-center" title="Generic Settings" href="#" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                                    <IoColorPaletteOutline
                                        size={28}
                                        className={styles.navLinkDropDown}
                                    />
                                </a>
                            </li>
                            {/* Settings Menu Item */}

                            {/* Settings Menu Item */}
                            <li className="nav-item" onClick={() => navigate("/settings/general")}>
                                <a className="nav-link d-flex align-items-center" title="Settings" href="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                                    <IoSettingsOutline
                                        size={28}
                                        className={styles.navLinkDropDown}
                                    />
                                </a>
                            </li>
                            {/* Settings Menu Item */}

                            {/* Apps DropDown */}
                            <li className="nav-item dropdown">
                                <a className="nav-link d-flex align-items-center" title="Apps" href="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                                    <RxCube
                                        size={28}
                                        className={styles.navLinkDropDown}
                                    />
                                </a>
                                <ul className={`dropdown-menu ${styles.dropdown_nav} ${styles.dropdownAppNav}`} aria-labelledby="navbarDropdownMenuLink"
                                    onClick={(e) => {
                                        // This will prevent the dropdown from closing when clicked from inside
                                        e.stopPropagation();
                                    }}
                                >
                                    <li>
                                        <div className={styles.topContainerAppNav}>
                                            <h3>Apps</h3>
                                            <p>User Applications & Addons</p>
                                        </div>
                                    </li>
                                    <li>
                                        <section className={styles.AppsContainerDropDown}>
                                            <div className={`d-flex justify-content-between ${styles.insideContainerAC}`}>
                                                <li>
                                                    <i className="fab fa-servicestack" style={{ color: "#4f747a", fontSize: 50, height: 50, width: 50 }}></i>
                                                    <p>Services</p>
                                                </li>
                                                <li>
                                                    <i className="fas fa-user-circle" style={{ color: "#3c6766", fontSize: 48, height: 50, width: 50 }}></i>
                                                    <p>Account</p>
                                                </li>
                                                <li>
                                                    <i className="fas fa-shield-alt" style={{ color: "#1dc9b7", fontSize: 48, height: 50, width: 50 }}></i>
                                                    <p>Security</p>
                                                </li>
                                            </div>
                                            <div className={`d-flex justify-content-between ${styles.insideContainerAC}`}>
                                                <li>
                                                    <i className="far fa-calendar-alt" style={{ color: "#0c7cd5", fontSize: 48, height: 50, width: 50 }}></i>
                                                    <p>Calender</p>
                                                </li>
                                                <li>
                                                    <i className="fas fa-chart-pie" style={{ color: "#0c7cd5", fontSize: 48, height: 48, width: 50 }}></i>
                                                    <p>Stats</p>
                                                </li>
                                                <li>
                                                    <i className="fas fa-envelope" style={{ color: "#fd52a3", fontSize: 48, height: 50, width: 50 }}></i>
                                                    <p>Messages</p>
                                                </li>
                                            </div>
                                            <div className={`d-flex justify-content-between ${styles.insideContainerAC}`}>
                                                <li>
                                                    <i className="fas fa-keyboard" style={{ color: "#97c4e8", fontSize: 48, height: 50, width: 50 }}></i>
                                                    <p>Notes</p>
                                                </li>
                                                <li>
                                                    <i className="fas fa-camera-retro" style={{ color: "#777777", fontSize: 48, height: 50, width: 50 }}></i>
                                                    <p>Photos</p>
                                                </li>
                                                <li>
                                                    <i className="fas fa-globe" style={{ color: "#0F5E9C", fontSize: 48, height: 50, width: 50 }}></i>
                                                    <p>Maps</p>
                                                </li>
                                            </div>
                                        </section>
                                    </li>
                                </ul>
                            </li>
                            {/* Apps DropDown */}

                            {/* Notifications DropDown */}
                            <li className="nav-item dropdown">
                                <a className={`nav-link d-flex align-items-center`} title="Notifications" href="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                                    <IoIosNotificationsOutline
                                        size={32}
                                        className={styles.navLinkDropDown}
                                    />
                                </a>
                                <ul className={`dropdown-menu ${styles.dropdown_nav} ${styles.dropdownNotificationNav}`} aria-labelledby="navbarDropdownMenuLink" onClick={(e) => {
                                    e.stopPropagation();
                                }}>
                                    <li>
                                        <div className={styles.topContainerNotificationNav}>
                                            <h3>11 New</h3>
                                            <p>User Notifications</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={`${styles.TabsContainerNotificationNav}`}>
                                            <h3 className={`${(currentNotificationActiveTab === 1) && (styles.activeDropDownTabStyle)}`} onClick={() => setCurrentNotificationActiveTab(1)}>Messages</h3>
                                            <h3 className={`${(currentNotificationActiveTab === 2) && (styles.activeDropDownTabStyle)}`} onClick={() => setCurrentNotificationActiveTab(2)}>Notification</h3>
                                            <h3 className={`${(currentNotificationActiveTab === 3) && (styles.activeDropDownTabStyle)}`} onClick={() => setCurrentNotificationActiveTab(3)}>Events</h3>
                                        </div>
                                    </li>
                                    <li>
                                        {(currentNotificationActiveTab === 1) ? (
                                            <div className={styles.messageList}>
                                                {(MessageList.map((v: any, i: number) => {
                                                    return (
                                                        <div key={i} className={styles.individualMessageList}>
                                                            <div className={styles.leftSideML}>
                                                                <img
                                                                    className={styles.imageProfile}
                                                                    width={60}
                                                                    height={60}
                                                                    src={v.profileURL}
                                                                    alt="Md Shabbir Alam"
                                                                />
                                                            </div>
                                                            <div className={styles.rightSideML}>
                                                                <h3 className={styles.nameML}>{v.name}</h3>
                                                                <p className={styles.messageML}>{v.message}</p>
                                                                <p className={styles.timeML}>{v.time}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                }))}
                                            </div>
                                        ) : (currentNotificationActiveTab === 2) ? (
                                            <div className={styles.notificationsContainer}>
                                                {(NotificationsList.map((v: any, i: number) => {
                                                    return (
                                                        <div key={i} className={styles.individualNotificationList}>
                                                            <h3 className={styles.nlTitle}>{v.title}</h3>
                                                            <p className={styles.nlMessage}>{v.message}</p>
                                                            <p className={styles.nlTime}>{v.time}</p>
                                                        </div>
                                                    )
                                                }))}
                                            </div>
                                        ) : (currentNotificationActiveTab === 3 ? (
                                            <div className={styles.eventContainer}>
                                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                                                    {/* <Calendar
                                                        value={selectedDay}
                                                        // // @ ts-ignore
                                                        // onChange={setSelectedDay}
                                                        calendarClassName="responsive-calendar" // added this
                                                        shouldHighlightWeekends
                                                    /> */}

                                                    <FullCalendar
                                                        plugins={[dayGridPlugin]}
                                                        initialView="dayGridMonth"
                                                    />

                                                </div>
                                            </div>
                                        ) : (
                                            <></>
                                        ))}
                                    </li>
                                    {/* Divider */}
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <a className="dropdown-item text-center" href="#">View All Notifications</a>
                                    </li>
                                </ul>
                            </li>
                            {/* Notifications DropDown */}

                            {/* Profile DropDown */}
                            <li className="nav-item dropdown">
                                <a className="nav-link d-flex align-items-center" title="Profile Information" href="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                                    <img
                                        src="https://mdbootstrap.com/img/new/avatars/22.jpg"
                                        className={`rounded-circle ${styles.navLinkDropDown}`}
                                        width={33}
                                        height={33}
                                        alt="avatar"
                                        loading="lazy" />
                                </a>
                                <ul className={`dropdown-menu ${styles.dropdown_nav} ${styles.dropdownProfileNav}`} aria-labelledby="navbarDropdownMenuLink"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    <li>
                                        <div className={styles.topContainerDropDownNav}>
                                            <div className={styles.insideContainerProfile}>
                                                <div className={styles.leftInsideProfile}>
                                                    <img
                                                        className={styles.imageProfile}
                                                        width={50}
                                                        height={50}
                                                        src="https://mdbootstrap.com/img/new/avatars/22.jpg"
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
                                    <li><a className="dropdown-item" href="#">My Profile</a></li>
                                    <li><a className="dropdown-item" href="#">Reset Password</a></li>
                                    <li>
                                        <a className="dropdown-item" href="#">Settings</a>
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
                                            {/* 
                                            <li>
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
                                            </li> 
                                            */}
                                        </ul>
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
                                    {/* Divider */}
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <div className="d-flex justify-content-between" style={{ height: 30 }} onClick={logoutUser}>
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
                            {/* Profile DropDown */}
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