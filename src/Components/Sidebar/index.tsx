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
// minified logo
import logoMinified from "../../assets/Images/Navbar/logoMinify.png";

import user from "../../assets/Images/Navbar/user.gif";

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import styles from './style.module.css';

interface IProps {
    // For hiding the sidebar 
    setIsOpen: any,
    isOpen: Boolean,
    // For minifying the sidebar
    isMinified: Boolean,
    setIsMinified: any,
    currentMenuItem: Number,
    setCurrentMenuItem: any
}

const Sidebar: React.FC<IProps> = ({
    setIsOpen,
    isOpen,
    isMinified,
    setIsMinified,
    currentMenuItem,
    setCurrentMenuItem
}) => {

    const menuItemsArray = [
        {
            index: 1,
            icon: <AiFillDashboard size={20} style={{ width: 25, height: 25 }} />,
            text: "Dashboard",
            link: "/",
            subMenu: [
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Dashboard",
                    link: "/",
                },
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Create Assessment",
                    link: "/",
                },
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Enter Grade",
                    link: "/",
                },
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Enter Overall Grade",
                    link: "/",
                }
            ]
        },
        {
            index: 2,
            icon: <FaUserAlt size={17} style={{ width: 23, height: 23 }} />,
            text: "User Management",
            link: "/",
            subMenu: [
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Create User",
                    link: "/",
                },
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Edit User",
                    link: "/",
                },
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Update User",
                    link: "/",
                },
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Delete User",
                    link: "/",
                }
            ]
        },
        {
            index: 3,
            icon: <FiSettings size={20} style={{ width: 23, height: 23 }} />,
            text: "Settings",
            link: "/",
            subMenu: [
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Settings",
                    link: "/",
                },
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Create Settings",
                    link: "/",
                },
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Edit Settings",
                    link: "/",
                },
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Update Settings",
                    link: "/",
                }
            ]
        }
    ];

    const [menuItemsArrayState, setMenuItemsArrayState] = useState<any>(menuItemsArray);

    const [searchTextSidebar, setSearchTextSidebar] = useState<string>("");

    useEffect(() => {
        console.log("Sub menu item: ", menuItemsArrayState);

        if (showFilterMenu) {
            let searchFilterInput = document.getElementById('searchFilterMenu') as HTMLInputElement;
            searchFilterInput.focus();
        }
    });

    useEffect(() => {
        if (searchTextSidebar !== "") {
            const filteredArray = menuItemsArray.filter((item: any) => {
                return (
                    item.text.toString().toLowerCase().includes(searchTextSidebar.toLowerCase()) ||
                    item.subMenu.filter((subItem: any) => {
                        return (
                            subItem.text.toString().toLowerCase().includes(searchTextSidebar.toLowerCase())
                        )
                    }).length > 0
                )
            });
            console.log("Filtered Menu Items ===>: ", filteredArray);
            //
            //
            //
            // Finding the index of the item in the array
            for (let i = 0; i < filteredArray.length; i++) {
                if (filteredArray[i].text.includes(searchTextSidebar)) {
                    setCurrentSubMenuSidebarOpenItem(i + 1);
                    console.log("Index of the item: ", i);
                    // for (let j = 0; j < filteredArray[i].subMenu.length; j++) {
                    //     if (filteredArray[i].subMenu[j].text.includes(searchTextSidebar)) {
                    //         setCurrentSubMenuSidebarOpenItem(i + 1);
                    //         // alert("kjhlkjhlk")
                    //         console.log("Index of the sub item: ", j);
                    //     }
                    // }
                    // setCurrentSubMenuSidebarOpenItem(i + 1);
                }
                else {
                    setCurrentSubMenuSidebarOpenItem(0);
                }
            }
            //
            //
            //
            setMenuItemsArrayState(filteredArray);
        } else {
            setMenuItemsArrayState(menuItemsArray);
        }
        // @ ts-ignore
    }, [searchTextSidebar]);

    const navigate = useNavigate();

    const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false);

    const [currentSubMenuSidebarOpenItem, setCurrentSubMenuSidebarOpenItem] = useState<Number>(0);

    return (
        <section className={`${styles.sidebar} ${(!isOpen) && (styles.hideSidebar)} ${(isMinified) && (styles.minifySidebar)}`}
            onMouseLeave={() => {
                if (isMinified) {
                    // if 2 seconds passsed then hide the sub menu item
                    setTimeout(() => {
                        setCurrentSubMenuSidebarOpenItem(0);
                    }, 3000);
                }
            }}
        >
            <div>
                <div className={styles.sidebarLogoContainer}>
                    <img
                        src={(isMinified) ? (logoMinified) : (logo)}
                        width={220}
                        height={50}
                        className={styles.LogoSidebar}
                        title="EQA Web App"
                        alt={"EQA Web App"}
                    /> <FiChevronDown color="grey" />
                </div>
                {(!showFilterMenu) ? (
                    <div className={styles.profileInfoContainer}>
                        <div
                            className={styles.profilePullTriggerBtn}
                            role="button"
                            onClick={() => {
                                if (!isMinified) {
                                    setShowFilterMenu(!showFilterMenu)
                                }
                                else {
                                    alert("Please expand the sidebar first");
                                }
                            }}
                        >
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
                                value={searchTextSidebar}
                                onChange={(e) => {
                                    setSearchTextSidebar(e.target.value)
                                }}
                                className={`form-control ${styles.searchFilterMenu}`}
                                placeholder="Filter menu"
                                id='searchFilterMenu'
                                type="text"
                            />
                            <div className={`${styles.searchFilterIconContainer}`} onClick={() => {
                                setShowFilterMenu(false)
                            }}>
                                <IoIosArrowUp style={{ marginTop: -5 }} color="#ffffff" />
                            </div>
                        </div>
                    </div>
                )}

                <div className={styles.sidebarItemsContainer}>
                    <ul className={styles.SidebarMenuList}>
                        {
                            menuItemsArrayState.map((item: any, index: any) => {
                                return (
                                    <>
                                        <li
                                            key={index}
                                            className={
                                                `${(currentMenuItem === index + 1) ? (styles.selected_Menu_Item) : ("")} ${(isMinified) && (styles.listItemMinified)}`
                                            }
                                            style={{ cursor: (isMinified)?("default"):("pointer") }}
                                            onClick={() => {
                                                if (!isMinified) {
                                                    setCurrentMenuItem(index + 1);
                                                    navigate('/');
                                                    if (currentSubMenuSidebarOpenItem === (index + 1)) {
                                                        setCurrentSubMenuSidebarOpenItem(0);
                                                    }
                                                    else {
                                                        setCurrentSubMenuSidebarOpenItem(index + 1);
                                                    }
                                                }
                                            }}

                                            onMouseLeave={() => {
                                                if (isMinified) {
                                                    // setCurrentMenuItem(0);
                                                    // setCurrentSubMenuSidebarOpenItem(0);
                                                }
                                            }}
                                        >
                                            <div
                                                className={`d-flex ${(isMinified) && (styles.minifiedSidebarInsideContainer)}`}
                                                role={"button"}
                                                onMouseEnter={() => {
                                                    if (isMinified) {
                                                        setCurrentMenuItem(index + 1);
                                                        //if (currentSubMenuSidebarOpenItem === (index + 1)) {
                                                        // setCurrentSubMenuSidebarOpenItem(0);
                                                        //}
                                                        //else {
                                                        setCurrentSubMenuSidebarOpenItem(index + 1);
                                                        //}
                                                    }
                                                }}
                                            >
                                                <p> {item.icon} </p> <p className={styles.itemMenuListText}>{item.text}</p>
                                            </div>
                                        </li>
                                        {
                                            (currentSubMenuSidebarOpenItem === index + 1) && (
                                                <ul
                                                    onMouseLeave={() => {
                                                        if (isMinified) {
                                                            // setCurrentMenuItem(0);
                                                           /// setCurrentSubMenuSidebarOpenItem(0);
                                                        }
                                                    }}
                                                    onMouseEnter={() => {
                                                        if (isMinified) {
                                                            setCurrentSubMenuSidebarOpenItem(index + 1);
                                                        }
                                                    }}
                                                    className={`${(isMinified) ? (styles.SubMenuItemContainerMinifiedVersion) : (styles.SubMenuItemContainer)}`}>
                                                    {
                                                        menuItemsArray[index].subMenu.map((subItem, subIndex) => {
                                                            return (
                                                                <li
                                                                onClick={() => {
                                                                    if (isMinified) {
                                                                        // setCurrentMenuItem(0);
                                                                       setCurrentSubMenuSidebarOpenItem(0);
                                                                    }
                                                                }} 
                                                                style={{
                                                                    borderTopLeftRadius:
                                                                        (subIndex === 0 && isMinified) ?
                                                                            (5) :
                                                                            (0),
                                                                    borderTopRightRadius:
                                                                        (subIndex === 0 && isMinified) ?
                                                                            (5) :
                                                                            (0),
                                                                    borderBottomLeftRadius:
                                                                        ((subIndex === menuItemsArray[index].subMenu.length - 1)
                                                                            &&
                                                                            isMinified) ?
                                                                            (5) :
                                                                            (0),
                                                                    borderBottomRightRadius: ((subIndex === menuItemsArray[index].subMenu.length - 1)
                                                                        &&
                                                                        isMinified) ?
                                                                        (5) :
                                                                        (0)
                                                                }}
                                                                    className={`${(isMinified) && (styles.SubMenuItemContainerMinifiedVersionli)}`}
                                                                    key={subIndex}
                                                                >
                                                                    {(!isMinified) ? (
                                                                        <div>
                                                                            {subItem.icon}
                                                                            &nbsp;
                                                                            &nbsp;
                                                                            &nbsp;
                                                                            <span
                                                                                className={styles.textSidebarSubMenuList}
                                                                            >
                                                                                {subItem.text}
                                                                            </span>
                                                                        </div>
                                                                    ) : (
                                                                        <div className='d-flex'>
                                                                            <p>
                                                                                {subItem.icon}
                                                                            </p>
                                                                            &nbsp;
                                                                            &nbsp;
                                                                            &nbsp;
                                                                            <p
                                                                                className={styles.textSidebarSubMenuList}
                                                                            >
                                                                                {subItem.text}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            )
                                        }
                                    </>
                                )
                            })
                        }
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