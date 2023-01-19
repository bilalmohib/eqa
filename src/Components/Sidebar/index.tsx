/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
//Importing icons
import { AiOutlinePlus, AiFillDashboard, AiOutlineDown, AiOutlinePhone } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { SlArrowUp } from "react-icons/sl";
import { BsCheckCircle } from "react-icons/bs";
import { BsBell, BsChevronDown } from "react-icons/bs";
import { BiStats } from "react-icons/bi";
import { HiChartSquareBar, HiOutlineSupport } from "react-icons/hi";
import { GiStairsGoal } from "react-icons/gi";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { RxDot } from "react-icons/rx";
import { FiChevronDown, FiSettings } from "react-icons/fi";
import { GoDeviceDesktop } from "react-icons/go";
import { CgShapeSquare } from "react-icons/cg";
import { FaUserAlt, FaRegComments } from "react-icons/fa";
import { FcInvite } from "react-icons/fc";
import { useNavigate } from 'react-router';

import logo from "../../assets/Images/Navbar/logo.png";

import user from "../../assets/Images/Navbar/user.gif";

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import styles from './style.module.css';

interface IProps {
    setIsOpen: any,
    isOpen: Boolean,
    currentMenuItem: Number,
    setCurrentMenuItem: any
}

const Sidebar: React.FC<IProps> = ({
    setIsOpen,
    isOpen,
    currentMenuItem,
    setCurrentMenuItem
}) => {
    const navigate = useNavigate();

    const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false);

    const [currentSubMenuSidebarOpenItem, setCurrentSubMenuSidebarOpenItem] = useState<Number>(0);

    return (
        <section className={`${styles.sidebar} ${(isOpen) ? ("") : (styles.hideSidebar)}`}>
            <div>
                <div className={styles.sidebarLogoContainer}>
                    <img
                        src={logo}
                        width={220}
                        height={50}
                        className={styles.LogoSidebar}
                        title="EQA Web App"
                        alt={"EQA Web App"}
                    /> <FiChevronDown color="grey" />
                </div>
                {(!showFilterMenu) ? (
                    <div className={styles.profileInfoContainer}>
                        <div className={styles.profilePullTriggerBtn} role="button" onClick={() => setShowFilterMenu(!showFilterMenu)}>
                            <FiChevronDown color="#ffffff" />
                        </div>
                        <div className={styles.insideContainerProfile}>
                            <div className={styles.leftInsideProfile}>
                                <img
                                    className={styles.imageProfile}
                                    width={50}
                                    height={50}
                                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80"
                                    alt="David Warner"
                                />
                            </div>
                            <div className={styles.rightInsideProfile}>
                                <h3>David Warner</h3>
                                <p>Los Angeles, USA</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.searchFilterMenuContainer}>
                        <div className={styles.searchFilterMenuSubContainer}>
                            <input
                                className={`form-control ${styles.searchFilterMenu}`}
                                placeholder="Filter menu"
                                type="text"
                            />
                            <div className={`${styles.searchFilterIconContainer}`} onClick={() => setShowFilterMenu(false)}>
                                <IoIosArrowUp style={{ marginTop: -5 }} color="#ffffff" />
                            </div>
                        </div>
                    </div>
                )}

                <div className={styles.sidebarItemsContainer}>
                    <ul className={styles.SidebarMenuList}>
                        <li className={(currentMenuItem === 1) ? (styles.selected_Menu_Item) : ("")}
                            onClick={() => {
                                setCurrentMenuItem(1);
                                navigate('/');
                                if (currentSubMenuSidebarOpenItem === 1) {
                                    setCurrentSubMenuSidebarOpenItem(0);
                                }
                                else {
                                    setCurrentSubMenuSidebarOpenItem(1);
                                }
                            }}
                        >
                            <div className='d-flex'>
                                <p> <GoDeviceDesktop size={18} /> </p> <p className={styles.itemMenuListText}>Assessment App</p>
                            </div>
                        </li>
                        {(currentSubMenuSidebarOpenItem === 1) && (
                            <ul className={styles.SubMenuItemContainer}>
                                <li> <RxDot style={{ marginLeft: 2 }} /> &nbsp; &nbsp; &nbsp; Dashboard </li>
                                <li> <RxDot style={{ marginLeft: 2 }} /> &nbsp; &nbsp; &nbsp; Create Assessment </li>
                                <li> <RxDot style={{ marginLeft: 2 }} /> &nbsp; &nbsp; &nbsp; Enter Grade </li>
                                <li> <RxDot style={{ marginLeft: 2 }} /> &nbsp; &nbsp; &nbsp; Enter Overall Grade </li>
                            </ul>
                        )}
                        <li className={(currentMenuItem === 3) ? (styles.selected_Menu_Item) : ("")}
                            onClick={() => {
                                setCurrentMenuItem(3)
                                navigate('/');
                                if (currentSubMenuSidebarOpenItem === 2) {
                                    setCurrentSubMenuSidebarOpenItem(0);
                                }
                                else {
                                    setCurrentSubMenuSidebarOpenItem(2);
                                }
                            }}
                        >
                            <div className='d-flex'>
                                <p> <FaUserAlt size={16} /> </p> <p className={styles.itemMenuListText}>User Management</p>
                            </div>
                        </li>
                        {(currentSubMenuSidebarOpenItem === 2) && (
                            <ul className={styles.SubMenuItemContainer}>
                                <li> <RxDot style={{ marginLeft: 2 }} /> &nbsp; &nbsp; &nbsp; User Management </li>
                                <li> <RxDot style={{ marginLeft: 2 }} /> &nbsp; &nbsp; &nbsp; Open Management </li>
                            </ul>
                        )}
                        <li className={(currentMenuItem === 2) ? (styles.selected_Menu_Item) : ("")}
                            onClick={() => {
                                setCurrentMenuItem(2)
                                navigate('/');
                                if (currentSubMenuSidebarOpenItem === 3) {
                                    setCurrentSubMenuSidebarOpenItem(0);
                                }
                                else {
                                    setCurrentSubMenuSidebarOpenItem(3);
                                }
                            }}
                        >
                            <div className='d-flex'>
                                <p> <FiSettings size={18} /> </p> <p className={styles.itemMenuListText}>Settings</p>
                            </div>
                        </li>
                        {(currentSubMenuSidebarOpenItem === 3) && (
                            <ul className={styles.SubMenuItemContainer}>
                                <li> <RxDot style={{ marginLeft: 2 }} /> &nbsp; &nbsp; &nbsp; User Management </li>
                                <li> <RxDot style={{ marginLeft: 2 }} /> &nbsp; &nbsp; &nbsp; Open Management </li>
                            </ul>
                        )}
                    </ul>

                    {/* Invite Members Section */}
                    <div className={styles.sidebarFooter}>
                        <div className={styles.sidebarFooterContainer}>
                            <p title='Chat'>
                                <a href="">
                                    <FaRegComments size={22} style={{ marginTop: 3, color: "white" }} />
                                </a>
                            </p>
                            <p title='Support'>
                                <a href="">
                                    <HiOutlineSupport size={22} style={{ marginTop: 3, color: "white" }} />
                                </a>
                            </p>
                            <p title='Call'>
                                <a href="">
                                    <AiOutlinePhone size={22} style={{ marginTop: 3, color: "white" }} />
                                </a>
                            </p>
                        </div>
                    </div>
                    {/* Invite Members Section */}
                </div>
            </div>
        </section>
    )
}
export default Sidebar;