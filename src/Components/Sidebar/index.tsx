/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
//Importing icons
import { AiOutlinePlus } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";
import { BsCheckCircle } from "react-icons/bs";
import { BsBell } from "react-icons/bs";
import { BiStats } from "react-icons/bi";
import { HiChartSquareBar } from "react-icons/hi";
import { GiStairsGoal } from "react-icons/gi";
import { FiPlus } from "react-icons/fi";
import { GoTriangleDown } from "react-icons/go";
import { CgShapeSquare } from "react-icons/cg";
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
            <div className={styles.sidebarItemsContainer}>
                <div className="btn-group shadow-0 mb-2 dropend">
                    <button type="button" className={`btn ${styles.btn_createSidebar} text-light`} data-mdb-toggle="dropdown" aria-expanded="false">
                        <AiOutlinePlus size={19} />
                        &nbsp; Create
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Task</a></li>
                        <li><a className="dropdown-item" href="#">Project</a></li>
                        <li><a className="dropdown-item" href="#">Message</a></li>
                        <li><a className="dropdown-item" href="#">Invite</a></li>
                    </ul>
                </div>
                <ul className={styles.SidebarMenuList}>
                    <li className={(currentMenuItem === 1) ? (styles.selected_Menu_Item) : ("")}
                        onClick={() => {
                            setCurrentMenuItem(1)
                            navigate('/');
                        }}
                    >
                        <div className='d-flex'>
                            <p> <IoHomeOutline size={19} /> </p> <p className={styles.itemMenuListText}>Home</p>
                        </div>
                    </li>
                    <li className={(currentMenuItem === 2) ? (styles.selected_Menu_Item) : ("")}
                        onClick={() => {
                            setCurrentMenuItem(2)
                            navigate('/');
                        }}
                    >
                        <div className='d-flex'>
                            <p> <BsCheckCircle size={19} /> </p> <p className={styles.itemMenuListText}>My Tasks</p>
                        </div>
                    </li>
                    <li className={(currentMenuItem === 3) ? (styles.selected_Menu_Item) : ("")}
                        onClick={() => {
                            setCurrentMenuItem(3)
                            navigate('/');
                        }}
                    >
                        <div className='d-flex'>
                            <p> <BsBell size={19} /> </p> <p className={styles.itemMenuListText}>Inbox</p>
                        </div>
                    </li>
                    <li className={(currentMenuItem === 4) ? (styles.selected_Menu_Item) : ("")}
                        onClick={() => {
                            setCurrentMenuItem(4)
                            navigate('/');
                        }}
                    >
                        <div className='d-flex'>
                            <p> <BiStats size={19} /> </p> <p className={styles.itemMenuListText}>Reporting</p>
                        </div>
                    </li>
                    <li className={(currentMenuItem === 5) ? (styles.selected_Menu_Item) : ("")}
                        onClick={() => {
                            setCurrentMenuItem(5)
                            navigate('/');
                        }}
                    >
                        <div className='d-flex'>
                            <p> <HiChartSquareBar size={19} /> </p> <p className={styles.itemMenuListText}>Portfolios</p>
                        </div>
                    </li>
                    <li className={(currentMenuItem === 6) ? (styles.selected_Menu_Item) : ("")} 
                      onClick={() => {
                        setCurrentMenuItem(6)
                        navigate('/');
                    }}
                    >
                        <div className='d-flex'>
                            <p> <GiStairsGoal size={19} /> </p> <p className={styles.itemMenuListText}>Goals</p>
                        </div>
                    </li>
                </ul>
                {/* Workspace Section */}
                <section className={styles.workSpaceBlock}>
                    <div className={`${styles.worspace_text_block} d-flex justify-content-between`} style={{ paddingRight: 20 }}>
                        <p style={{ fontSize: 15, letterSpacing: 1, paddingLeft: 20, paddingTop: 5, fontWeight: "350" }}>My Workspace</p>
                        <p style={{ marginTop: 5, paddingRight: 10 }}><FiPlus size={17} /></p>
                    </div>

                    {/* Project Members */}
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
                    {/* Project Members */}

                    {/* Projects Block */}
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
                    {/* Projects Block */}
                </section>
                {/* Workspace Section */}

                {/* Invite Members Section */}
                <div className={styles.sidebarFooter}>
                    <div className={styles.sidebarFooterContainer}>
                        <p><FcInvite size={25} style={{ marginTop: 2 }} /></p>
                        <p style={{ marginTop: 1, marginLeft: 10 }}>Invite Members</p>
                    </div>
                </div>
                {/* Invite Members Section */}
            </div>
        </section>
    )
}
export default Sidebar;