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

import { useTranslation } from 'react-i18next';

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
    Link,
    TextField
} from "@mui/material";

// Importing i18 for language
import i18n from "../../i18n";

// Importing logout Service
import { logoutService } from "../../Service/logoutService";

interface NavProps {
    setIsOpen: any,
    isOpen: Boolean,
    // For minified sidebar
    isMinified: Boolean,
    setIsMinified: any,
    // For Material Modal
    openUserInfoModal: Boolean,
    setOpenUserInfoModal: any,

    // For Reset Password Modal
    openResetPasswordModal: Boolean,
    setOpenResetPasswordModal: any,

    // Current Language
    currentLang: string,
    setCurrentLang: any
}

const Navbar: React.FC<NavProps> = ({
    setIsOpen,
    isOpen,
    // For minified sidebar
    isMinified,
    setIsMinified,
    // For Material Modal
    openUserInfoModal,
    setOpenUserInfoModal,

    // For Reset Password Modal
    openResetPasswordModal,
    setOpenResetPasswordModal,

    // Current Language
    currentLang,
    setCurrentLang,
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    const changeTheLanguage = (e: any) => {
        i18n.changeLanguage(e);
        // if (e === "en") {
        //     // alert("Language changed english")
        //     // navigate(`/`);
        // }
        // else {
        //     // navigate(`/${e}`);            
        //     // alert("Language Arabic")
        // }
    }

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

    const [searchValue, setSearchValue] = useState<string>("");

    const [currentNotificationActiveTab, setCurrentNotificationActiveTab] = useState<Number>(1);

    const logoutUser = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            const xApiKey = localStorage.getItem("accessToken");
            console.log("xApiKey ===> : ", xApiKey);
            logoutService(xApiKey).then(response => {
                console.log("Presetation layer response Code: ", response);
                // console.log("Presetation layer response: Status", response.status);
                // console.log("Presetation layer response: Status", response.transactionId);
                // @ts-ignore
                if (response.code === "200.200" && response.status === "OK") {
                    // alert("Logged out successfully");
                    localStorage.removeItem("accessToken");
                    navigate(`/`);
                }
                else {
                    // alert("Error in logging out");
                    return;
                }
            }).catch(error => {
                console.log("Error in response : ", error);
                // Clearing the fields
                // alert("Network Error");
                return;
            });
        }
    }

    const selectLanguage = (value: any) => {
        if (value === "en") {
            document.documentElement.setAttribute("lang", 'ar');
            document.documentElement.setAttribute("dir", 'rtl');
            setCurrentLang("ar");
            changeTheLanguage("ar");
        } else if (value === "ar") {
            document.documentElement.setAttribute("lang", 'en');
            document.documentElement.setAttribute("dir", 'ltr');
            setCurrentLang("en");
            changeTheLanguage("en");
        }
    }

    return (
        <nav className={`navbar navbar-expand-lg navbar-light ${styles.nav_bar} ${(isOpen === true) ? (`${(!isMinified) ? (styles.isSideOpen) : (styles.isSideOpenMinified)}`) : (styles.isSideClose)} ${(windowSize[0] < 991 && isOpen) ? ("") : ("")}`}
            onClick={() => {
                if (windowSize[0] < 991 && isOpen) {
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
                            <button onClick={() => {
                                if (isMinified === true && isOpen === true) {
                                    setIsMinified(!isMinified)
                                    setIsOpen(false);
                                } else {
                                    setIsOpen(!isOpen)
                                }
                            }} type="button" className="btn btn-sm btn-outline-primary" style={{ color: "#e09d3b", border: "1px solid #e09d3b" }} data-mdb-ripple-color="dark" id="dropdownMenuLink" data-mdb-toggle="dropdown" aria-expanded="false">
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
                    <Box className={`${styles.searchBoxNavbar}`}>
                        {/* <Box>
                            <SearchIcon color="action" />
                        </Box>
                        <input
                            type="text"
                            className='form-control'
                            style={{ border: "none" }}
                            placeholder='Search for anything'
                        /> */}
                        <TextField
                            variant="standard" // <== changed this
                            margin="normal"
                            // fullWidth
                            id="search"
                            name="search"
                            autoComplete="search"
                            // autoFocus
                            value={searchValue}
                            sx={{
                                // Focus the input
                                '&:focus': {
                                    border: "none",
                                },
                                // Add padding of text from left side
                                '& .MuiInputBase-input': {
                                    paddingLeft: '0.5rem',
                                    paddingRight: (i18n.language === 'ar' ? '0.5rem' : 'initial'),
                                },
                            }}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder={`${t('Home.Header.search')}`}
                            InputProps={{
                                startAdornment: <SearchIcon color="action" />,
                                // For hiding the underline
                                disableUnderline: true,
                                style: {
                                    border: "none",
                                    // Add padding of text from left side
                                },

                            }}
                        />
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
                                            <h3>{t('Home.Header.DropDown.Apps.title')}</h3>
                                            <p>{t('Home.Header.DropDown.Apps.subTitle')}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <section className={styles.AppsContainerDropDown}>
                                            <div className={`d-flex justify-content-between ${styles.insideContainerAC}`}>
                                                <li>
                                                    <i className="fab fa-servicestack" style={{ color: "#4f747a", fontSize: 50, height: 50, width: 50 }}></i>
                                                    <p>{t('Home.Header.DropDown.Apps.List.services')}</p>
                                                </li>
                                                <li>
                                                    <i className="fas fa-user-circle" style={{ color: "#3c6766", fontSize: 48, height: 50, width: 50 }}></i>
                                                    <p>{t('Home.Header.DropDown.Apps.List.account')}</p>
                                                </li>
                                                <li>
                                                    <i className="fas fa-shield-alt" style={{ color: "#1dc9b7", fontSize: 48, height: 50, width: 50 }}></i>
                                                    <p>{t('Home.Header.DropDown.Apps.List.security')}</p>
                                                </li>
                                            </div>
                                            <div className={`d-flex justify-content-between ${styles.insideContainerAC}`}>
                                                <li>
                                                    <i className="far fa-calendar-alt" style={{ color: "#0c7cd5", fontSize: 48, height: 50, width: 50 }}></i>
                                                    <p>{t('Home.Header.DropDown.Apps.List.calender')}</p>
                                                </li>
                                                <li>
                                                    <i className="fas fa-chart-pie" style={{ color: "#0c7cd5", fontSize: 48, height: 48, width: 50 }}></i>
                                                    <p>{t('Home.Header.DropDown.Apps.List.stats')}</p>
                                                </li>
                                                <li>
                                                    <i className="fas fa-envelope" style={{ color: "#fd52a3", fontSize: 48, height: 50, width: 50 }}></i>
                                                    <p>{t('Home.Header.DropDown.Apps.List.messages')}</p>
                                                </li>
                                            </div>
                                            <div className={`d-flex justify-content-between ${styles.insideContainerAC}`}>
                                                <li>
                                                    <i className="fas fa-keyboard" style={{ color: "#97c4e8", fontSize: 48, height: 50, width: 50 }}></i>
                                                    <p>{t('Home.Header.DropDown.Apps.List.notes')}</p>
                                                </li>
                                                <li>
                                                    <i className="fas fa-camera-retro" style={{ color: "#777777", fontSize: 48, height: 50, width: 50 }}></i>
                                                    <p>{t('Home.Header.DropDown.Apps.List.photos')}</p>
                                                </li>
                                                <li>
                                                    <i className="fas fa-globe" style={{ color: "#0F5E9C", fontSize: 48, height: 50, width: 50 }}></i>
                                                    <p>{t('Home.Header.DropDown.Apps.List.maps')}</p>
                                                </li>
                                            </div>
                                            <div className={`d-flex justify-content-between ${styles.insideContainerAC}`}>
                                                <li>
                                                    <i className="fas fa-keyboard" style={{ color: "#97c4e8", fontSize: 48, height: 50, width: 50 }}></i>
                                                    <p>{t('Home.Header.DropDown.Apps.List.notes')}</p>
                                                </li>
                                                <li>
                                                    <i className="fas fa-camera-retro" style={{ color: "#777777", fontSize: 48, height: 50, width: 50 }}></i>
                                                    <p>{t('Home.Header.DropDown.Apps.List.photos')}</p>
                                                </li>
                                                <li>
                                                    <i className="fas fa-globe" style={{ color: "#0F5E9C", fontSize: 48, height: 50, width: 50 }}></i>
                                                    <p>{t('Home.Header.DropDown.Apps.List.maps')}</p>
                                                </li>
                                            </div>
                                            <div className={`d-flex justify-content-between ${styles.insideContainerAC}`}>
                                                <li>
                                                    <i className="fas fa-keyboard" style={{ color: "#97c4e8", fontSize: 48, height: 50, width: 50 }}></i>
                                                    <p>{t('Home.Header.DropDown.Apps.List.notes')}</p>
                                                </li>
                                                <li>
                                                    <i className="fas fa-camera-retro" style={{ color: "#777777", fontSize: 48, height: 50, width: 50 }}></i>
                                                    <p>{t('Home.Header.DropDown.Apps.List.photos')}</p>
                                                </li>
                                                <li>
                                                    <i className="fas fa-globe" style={{ color: "#0F5E9C", fontSize: 48, height: 50, width: 50 }}></i>
                                                    <p>{t('Home.Header.DropDown.Apps.List.maps')}</p>
                                                </li>
                                            </div>
                                            <div className={`d-flex justify-content-between ${styles.insideContainerAC}`}>
                                                <li>
                                                    <i className="fas fa-keyboard" style={{ color: "#97c4e8", fontSize: 48, height: 50, width: 50 }}></i>
                                                    <p>{t('Home.Header.DropDown.Apps.List.notes')}</p>
                                                </li>
                                                <li>
                                                    <i className="fas fa-camera-retro" style={{ color: "#777777", fontSize: 48, height: 50, width: 50 }}></i>
                                                    <p>{t('Home.Header.DropDown.Apps.List.photos')}</p>
                                                </li>
                                                <li>
                                                    <i className="fas fa-globe" style={{ color: "#0F5E9C", fontSize: 48, height: 50, width: 50 }}></i>
                                                    <p>{t('Home.Header.DropDown.Apps.List.maps')}</p>
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
                                            <h3>{t('Home.Header.DropDown.Apps.Notifications.info')}</h3>
                                            <p>{t('Home.Header.DropDown.Apps.Notifications.subTitle')}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className={`${styles.TabsContainerNotificationNav}`}>
                                            <h3 className={`${(currentNotificationActiveTab === 1) && (styles.activeDropDownTabStyle)}`} onClick={() => setCurrentNotificationActiveTab(1)}>{t('Home.Header.DropDown.Apps.Notifications.tabs.Messages.title')}</h3>
                                            <h3 className={`${(currentNotificationActiveTab === 2) && (styles.activeDropDownTabStyle)}`} onClick={() => setCurrentNotificationActiveTab(2)}>{t('Home.Header.DropDown.Apps.Notifications.tabs.Notifications.title')}</h3>
                                            <h3 className={`${(currentNotificationActiveTab === 3) && (styles.activeDropDownTabStyle)}`} onClick={() => setCurrentNotificationActiveTab(3)}>{t('Home.Header.DropDown.Apps.Notifications.tabs.Events.title')}</h3>
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
                                                                    alt={`${t('Home.Header.DropDown.Apps.Profile.name')}`}
                                                                    title={`${t('Home.Header.DropDown.Apps.Profile.name')}`}
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
                                        <a className="dropdown-item text-center" href="#">{t('Home.Header.DropDown.Apps.Notifications.ViewAll')}</a>
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
                                // onClick={(e) => {
                                //     e.stopPropagation();
                                // }}
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
                                                        alt={`${t('Home.Header.DropDown.Apps.Profile.name')}`}
                                                    />
                                                </div>
                                                <div className={styles.rightInsideProfile}>
                                                    <h3>{t('Home.Header.DropDown.Apps.Profile.name')}</h3>
                                                    <p>{t('Home.Header.DropDown.Apps.Profile.location')}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li
                                        onClick={() => {
                                            setOpenUserInfoModal(!openUserInfoModal);
                                        }}
                                    >
                                        <a className="dropdown-item" href="#">{t('Home.Header.DropDown.Apps.Profile.list.myprofile')}</a>
                                    </li>
                                    <li
                                        onClick={() => {
                                            setOpenResetPasswordModal(!openResetPasswordModal);
                                        }}
                                    >
                                        <a className="dropdown-item" href="#">{t('Home.Header.DropDown.Apps.Profile.list.changePassword')}</a>
                                    </li>
                                    <li
                                        onClick={() => {
                                            navigate("/settings/general");
                                        }}
                                    >
                                        <a className="dropdown-item" href="#">{t('Home.Header.DropDown.Apps.Profile.list.settings')}</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <div className={`d-flex justify-content-between ${(i18n.language === "ar") && ("flex-row-reverse")}`}>
                                                <div>
                                                    {t('Home.Header.DropDown.Apps.Profile.list.Language.title')}
                                                </div>
                                                <div>
                                                    <b style={{ color: "black" }}>
                                                        {i18n.language === "ar" ? (
                                                            <span>&lt;</span>
                                                        ) : (
                                                            <span>&gt;</span>
                                                        )}
                                                    </b>
                                                </div>
                                            </div>
                                        </a>
                                        <ul className="dropdown-menu dropdown-submenu" style={{ left: (i18n.language === "ar") ? ("100%") : ("-57%") }}>
                                            <li onClick={() => selectLanguage("ar")}>
                                                <a className="dropdown-item" href="#">{t('Home.Header.DropDown.Apps.Profile.list.Language.list.English')}</a>
                                            </li>
                                            <li onClick={() => selectLanguage("en")}>
                                                <a className="dropdown-item" href="#">{t('Home.Header.DropDown.Apps.Profile.list.Language.list.Arabic')}</a>
                                            </li>
                                        </ul>
                                    </li>
                                    {/* Divider */}
                                    <li><hr className="dropdown-divider" /></li>
                                    <li
                                        // On click make full screen
                                        onClick={() => {
                                            if (document.fullscreenElement) {
                                                document.exitFullscreen();
                                            } else {
                                                document.documentElement.requestFullscreen();
                                            }
                                        }}
                                    >
                                        <a className="dropdown-item" href="#">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    {document.fullscreenElement ? (
                                                        <span>{t('Home.Header.DropDown.Apps.Profile.list.fullscreen.fullTitle')}</span>
                                                    ) : (
                                                        <span>{t('Home.Header.DropDown.Apps.Profile.list.fullscreen.title')}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <i style={{ color: "grey" }}>{t('Home.Header.DropDown.Apps.Profile.list.fullscreen.shortcut')}</i>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li
                                        // On click print the page
                                        onClick={() => {
                                            // Close the sidebar
                                            setIsOpen(false);
                                            // Close the minify sidebar
                                            setIsMinified(false);

                                            setTimeout(() => {
                                                window.print();
                                            }, 1000);
                                        }}
                                    >
                                        <a className="dropdown-item" href="#">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    {t('Home.Header.DropDown.Apps.Profile.list.print.title')}
                                                </div>
                                                <div>
                                                    <i style={{ color: "grey" }}>{t('Home.Header.DropDown.Apps.Profile.list.print.shortcut')}</i>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    {/* Divider */}
                                    <li><hr className="dropdown-divider" /></li>
                                    <li
                                        // On click logout the user
                                        onClick={logoutUser}
                                    >
                                        <a className="dropdown-item" href="#">
                                            <div className="d-flex justify-content-between" style={{ height: 30 }} onClick={logoutUser}>
                                                <div>
                                                    <b className='text-danger'>{t('Home.Header.DropDown.Apps.Profile.list.Logout.title')}</b>
                                                </div>
                                                <div style={{ textOverflow: "ellipsis", width: 120 }}>
                                                    <p style={{ color: "black", textOverflow: "ellipsis", overflow: "hidden" }}>{t('Home.Header.DropDown.Apps.Profile.list.Logout.email')}</p>
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