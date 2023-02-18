/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';

//Importing icons
import { IoIosArrowUp } from "react-icons/io";
import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineSupport } from "react-icons/hi";
import { FiChevronDown, FiSettings } from "react-icons/fi";
import { FaRegComments } from "react-icons/fa";
import { useNavigate } from 'react-router';

import { AiFillDashboard } from "react-icons/ai";
import { MdOutlineFactCheck } from "react-icons/md";
import { RxDot } from "react-icons/rx";
import { FaUserAlt } from "react-icons/fa";

// Importing i18 for language
import i18n from "../../i18n";

//Importing useTranslation and Trans from react-i18next
import { useTranslation } from 'react-i18next';

// Importing logo
import logo from "../../assets/Images/Navbar/logo.png";

// Importing Minified logo
import logoMinified from "../../assets/Images/Navbar/logoMinify.png";

import styles from './style.module.css';

interface SidebarProps {
    // For hiding the sidebar 
    isOpen: Boolean,
    setIsOpen: any,

    // For minifying the sidebar
    isMinified: Boolean,

    // Current Menu Item
    currentMenuItem: Number,
    setCurrentMenuItem: any,

    // Current Sub Menu Item
    currentSubMenuSidebarOpenItem: Number,
    setCurrentSubMenuSidebarOpenItem: any,

    // Sidebar Menu Items Array
    sidebarList: any,

    // Current Language
    currentLang: string,
    setCurrentLang: any
}

const Sidebar: React.FC<SidebarProps> = ({
    isOpen,
    setIsOpen,
    // For minifying the sidebar
    isMinified,
    // Current Menu Item
    currentMenuItem,
    setCurrentMenuItem,
    // Current Sub Menu Item
    currentSubMenuSidebarOpenItem,
    setCurrentSubMenuSidebarOpenItem,
    // Sidebar Menu Items Array
    sidebarList,

    // Current Language
    currentLang,
    setCurrentLang
}) => {
    const { t } = useTranslation();

    // For detecting the window size
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    const changeTheLanguage = (e: any) => {
        i18n.changeLanguage(e);
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
    // For detecting the window size

    const [menuItemsArrayState, setMenuItemsArrayState] = useState<any>(sidebarList);

    const [searchTextSidebar, setSearchTextSidebar] = useState<string>("");

    useEffect(() => {
        console.log("Sub menu item: ", menuItemsArrayState);

        if (showFilterMenu) {
            let searchFilterInput = document.getElementById('searchFilterMenu') as HTMLInputElement;
            searchFilterInput.focus();
        }
    });

    function createRipple(event:
        any
    ) {
        const button = event.currentTarget;

        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.marginLeft = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.marginTop = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add("ripple");

        const ripple = button.getElementsByClassName("ripple")[0];

        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    useEffect(() => {
        if (searchTextSidebar !== "") {
            const filteredArray = sidebarList.filter((item: any) => {
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
            setMenuItemsArrayState(sidebarList);
        }
    }, [searchTextSidebar]);

    const navigate = useNavigate();

    const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false);

    // Data from Local Storage for logged in user
    const user = JSON.parse(localStorage.getItem('user') || '{}');

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
                        title={`${(t('Home.Sidebar.image.title'))}`}
                        alt={`${(t('Home.Sidebar.image.alt'))}`}
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
                                    alt={user.fullName}
                                    title={user.fullName}
                                />
                            </div>
                            <div className={styles.rightInsideProfile}>
                                <h3>
                                    {/* {(t('Home.Sidebar.profile.name'))} */}
                                    {user.fullName}
                                </h3>
                                <p>
                                    {/* {(t('Home.Sidebar.profile.location'))} */}
                                    {user.Campus}
                                </p>
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
                            <div
                                className={`${styles.searchFilterIconContainer}`}
                                onClick={() => {
                                    setShowFilterMenu(false)
                                }}
                            >
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
                                    <li key={index}>
                                        <li
                                            className={
                                                `${(currentMenuItem === index + 1) ? (`ripple ${styles.selected_Menu_Item}`) : ("")} ${(isMinified) && (styles.listItemMinified)}`
                                            }
                                            style={{ cursor: (isMinified) ? ("default") : ("pointer") }}
                                            onClick={(e: any) => {
                                                if (!isMinified) {
                                                    createRipple(e);
                                                    if (isMinified === false) {
                                                        setCurrentMenuItem(index + 1);
                                                        // navigate('/');
                                                        if (currentSubMenuSidebarOpenItem === (index + 1)) {
                                                            setCurrentSubMenuSidebarOpenItem(0);
                                                        }
                                                        else {
                                                            setCurrentSubMenuSidebarOpenItem(index + 1);
                                                        }
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
                                                // Disable on click when is minified
                                                onClick={(event) => { event.preventDefault(); }}
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
                                                <p
                                                    style={{
                                                        // border: ((currentSubMenuSidebarOpenItem === (index + 1)) && isMinified && i18n.language === 'ar') ? ("1px solid black") : ("1px solid red"),
                                                        marginRight: ((currentSubMenuSidebarOpenItem === (index + 1)) && isMinified && i18n.language === 'ar') ?
                                                            (3) :
                                                            (isMinified && currentMenuItem === (index + 1) && i18n.language === 'ar') ?
                                                                (3) :
                                                                ("initial"),
                                                    }}
                                                >
                                                    <span dangerouslySetInnerHTML={{ __html: item.icon }} />
                                                </p>
                                                <p className={styles.itemMenuListText}>
                                                    {item.text}
                                                </p>
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
                                                        sidebarList[index].subMenu.map((subItem: any, subIndex: number) => {
                                                            return (
                                                                <li
                                                                    key={subIndex}
                                                                    onClick={() => {
                                                                        // Navigate to the link
                                                                        navigate(subItem.formUrl);

                                                                        if (
                                                                            windowSize[0] <= 990
                                                                        ) {
                                                                            setIsOpen(false);
                                                                        }

                                                                        // Set the current menu item
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
                                                                            ((subIndex === sidebarList[index].subMenu.length - 1)
                                                                                &&
                                                                                isMinified) ?
                                                                                (5) :
                                                                                (0),
                                                                        borderBottomRightRadius: ((subIndex === sidebarList[index].subMenu.length - 1)
                                                                            &&
                                                                            isMinified) ?
                                                                            (5) :
                                                                            (0)
                                                                    }}
                                                                    className={`${(isMinified) && (styles.SubMenuItemContainerMinifiedVersionli)}`}
                                                                >
                                                                    {(!isMinified) ? (
                                                                        <div>
                                                                            {/* {subItem.icon} */}
                                                                            <span dangerouslySetInnerHTML={{ __html: subItem.icon }} />
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
                                                                            {/* <p>
                                                                                {subItem.icons[0].icon} */}
                                                                            {/* {subItem.icons.map((icon: any, iconIndex: number) => (
                                                                                    <React.Fragment key={iconIndex}>{icon.icon}</React.Fragment>
                                                                                ))} */}
                                                                            {/* </p> */}
                                                                            {/* <p dangerouslySetInnerHTML={{ __html: subItem.icon }} /> */}
                                                                            <p>
                                                                                <RxDot style={{ marginLeft: 2 }} />
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
                                    </li>
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