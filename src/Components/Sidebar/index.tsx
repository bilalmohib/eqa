/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
//Importing icons
import { AiOutlinePlus,AiFillDashboard } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";
import { BsCheckCircle } from "react-icons/bs";
import { BsBell } from "react-icons/bs";
import { BiStats } from "react-icons/bi";
import { HiChartSquareBar } from "react-icons/hi";
import { GiStairsGoal } from "react-icons/gi";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { FiPlus,FiSettings } from "react-icons/fi";
import { GoTriangleDown } from "react-icons/go";
import { CgShapeSquare } from "react-icons/cg";
import {FaUserAlt} from "react-icons/fa";
import { FcInvite } from "react-icons/fc";
import { useNavigate } from 'react-router';


import user from "../../assets/Images/Navbar/user.gif";

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
    return (
        <section className={`${styles.sidebar} ${(isOpen) ? ("") : (styles.hideSidebar)}`}>
            <div>
                <div className={styles.profileInfoContainer}>
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
                <div className={styles.sidebarItemsContainer}>
                    <ul className={styles.SidebarMenuList}>
                        <li className={(currentMenuItem === 1) ? (styles.selected_Menu_Item) : ("")}
                            onClick={() => {
                                setCurrentMenuItem(1)
                                navigate('/');
                            }}
                        >
                            <div className='d-flex'>
                                <p> <AiFillDashboard size={20} /> </p> <p className={styles.itemMenuListText}>Dashbboard</p>
                            </div>
                        </li>
                        <li className={(currentMenuItem === 3) ? (styles.selected_Menu_Item) : ("")}
                            onClick={() => {
                                setCurrentMenuItem(3)
                                navigate('/');
                            }}
                        >
                            <div className='d-flex'>
                                <p> <FaUserAlt size={18} /> </p> <p className={styles.itemMenuListText}>User Management</p>
                            </div>
                        </li>
                        <li className={(currentMenuItem === 2) ? (styles.selected_Menu_Item) : ("")}
                            onClick={() => {
                                setCurrentMenuItem(2)
                                navigate('/');
                            }}
                        >
                            <div className='d-flex'>
                                <p> <FiSettings size={20} /> </p> <p className={styles.itemMenuListText}>Settings</p>
                            </div>
                        </li>
                        {/* <li className={(currentMenuItem === 4) ? (styles.selected_Menu_Item) : ("")}
                            onClick={() => {
                                setCurrentMenuItem(4)
                                navigate('/');
                            }}
                        >
                            <div className='d-flex'>
                                <p> <BiStats size={25} /> </p> <p className={styles.itemMenuListText}>Reporting</p>
                            </div>
                        </li>
                        <li className={(currentMenuItem === 5) ? (styles.selected_Menu_Item) : ("")}
                            onClick={() => {
                                setCurrentMenuItem(5)
                                navigate('/');
                            }}
                        >
                            <div className='d-flex'>
                                <p> <HiChartSquareBar size={25} /> </p> <p className={styles.itemMenuListText}>Portfolios</p>
                            </div>
                        </li>
                        <li className={(currentMenuItem === 6) ? (styles.selected_Menu_Item) : ("")}
                            onClick={() => {
                                setCurrentMenuItem(6)
                                navigate('/');
                            }}
                        >
                            <div className='d-flex'>
                                <p> <GiStairsGoal size={25} /> </p> <p className={styles.itemMenuListText}>Goals</p>
                            </div>
                        </li> */}
                    </ul>
                  
                    {/* <section className={styles.workSpaceBlock}>
                        <div className={`${styles.worspace_text_block} d-flex justify-content-between`} style={{ paddingRight: 20 }}>
                            <p style={{ fontSize: 15, letterSpacing: 1, paddingLeft: 20, paddingTop: 5, fontWeight: "350" }}>My Workspace</p>
                            <p style={{ marginTop: 5, paddingRight: 10 }}><FiPlus size={17} /></p>
                        </div>

                  
                        <section>
                            <ul className={styles.projectMembersBlock}>
                                <li> <img alt='Email@email.com' title='Email@email.com' src={user} width={25} height={25} /> </li>
                                <li> <img alt='Email@email.com' title='Email@email.com' src={user} width={25} height={25} /> </li>
                                <li> <img alt='Email@email.com' title='Email@email.com' src={user} width={25} height={25} /> </li>
                                <li> <img alt='Email@email.com' title='Email@email.com' src={user} width={25} height={25} /> </li>
                                <li> <img alt='Email@email.com' title='Email@email.com' src={user} width={25} height={25} /> </li>
                                <li> <img alt='Email@email.com' title='Email@email.com' src={user} width={25} height={25} /> </li>
                            </ul>
                        </section>
                  

                    
                        <section>
                            <ul className={styles.projectListCoverContainer}>
                                <li>
                                    <div className={`${styles.projectListContainer} d-flex justify-content-between`}>
                                        <p className={styles.projectName}><CgShapeSquare style={{ marginTop: -1.5 }} color={"#9ee7e3"} size={10} /> &nbsp; Project Management Software</p>
                                        <p style={{ marginTop: 2.5 }}><GoTriangleDown fontWeight={300} size={12} color='white' /></p>
                                    </div>
                                </li>
                                <li>
                                    <div className={`${styles.projectListContainer} d-flex justify-content-between`}>
                                        <p className={styles.projectName}><CgShapeSquare style={{ marginTop: -1.5 }} color={"#b36bd4"} size={10} /> &nbsp; Testing Project</p>
                                        <p style={{ marginTop: 2.5 }}><GoTriangleDown fontWeight={300} size={12} color='white' /></p>
                                    </div>
                                </li>
                                <li>
                                    <div className={`${styles.projectListContainer} d-flex justify-content-between`}>
                                        <p className={styles.projectName}><CgShapeSquare style={{ marginTop: -1.5 }} color={"#b36bd4"} size={10} /> &nbsp; 2019-CS-682 / bilal 1:1</p>
                                        <p style={{ marginTop: 2.5 }}><GoTriangleDown fontWeight={300} size={12} color='white' /></p>
                                    </div>
                                </li>
                            </ul>
                        </section>
                    </section> */}
                

                    {/* Invite Members Section */}
                    <div className={styles.sidebarFooter}>
                        <div className={styles.sidebarFooterContainer}>
                            <p><RiLogoutCircleRFill size={30} style={{ marginTop: 2,color:"red" }} /></p>
                            <p className={styles.logoutText}>Logout</p>
                        </div>
                    </div>
                    {/* Invite Members Section */}
                </div>
            </div>
        </section>
    )
}
export default Sidebar;