import { useState, useEffect } from "react";

// For routing
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

import { Outlet } from "react-router-dom";

//importing navbar
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";

import { AiFillDashboard } from "react-icons/ai";
import { RxDot } from "react-icons/rx";
import { FiSettings } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";

import styles from "./style.module.css";
import Footer from "../../Components/Footer";

interface HomeProps {
    isOpen: Boolean,
    setIsOpen: any,
    // For minified sidebar
    isMinified: Boolean,
    setIsMinified: any,
    subComponent: any,
    setShowHeader: any,
}

const Home = ({
    isOpen,
    setIsOpen,
    // For minified sidebar
    isMinified,
    setIsMinified,
    subComponent,
    setShowHeader
}: HomeProps) => {

    // For routing
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // The current location.
        // console.clear();
        console.log("The current location is: ", location.pathname);
        const url = location.pathname;

        if (url === "/login2" || url === "/forgetpassword") {
            setShowHeader(true);
        } else {
            setShowHeader(false);
        }
    }, [location, setShowHeader]);


    // For getting the window size
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    // For handling the window resize
    useEffect(() => {
        const handleWindowResize = () => {
            // if (window.innerWidth < 991) {
            //     setIsOpen(false);
            // }
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    // For handling the window resize and closing the sidebar
    useEffect(() => {
        if (window.innerWidth < 991) {
            setIsOpen(false);
        }
    }, [windowSize]);

    // Current Sidebar menu item
    const [currentMenuItem, setCurrentMenuItem] = useState<number>(1);

    // Current Sidebar Sub menu item
    const [currentSubMenuSidebarOpenItem, setCurrentSubMenuSidebarOpenItem] = useState<Number>(0);

    // ######################## Array of menu items ########################
    const SidebarMenuItemsArray = [
        {
            index: 1,
            icon: <AiFillDashboard size={20} style={{ width: 25, height: 25 }} />,
            text: "Dashboard",
            // link: "/",
            subMenu: [
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Dashboard",
                    link: "/dashboard/assessment"
                },
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Create Assessment",
                    link: "/dashboard/createassessment"
                },
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Enter Grade",
                    link: "/dashboard/entergrade"
                },
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Enter Overall Grade",
                    link: "/dashboard/enteroverallgrade"
                }
            ]
        },
        {
            index: 2,
            icon: <FaUserAlt size={17} style={{ width: 23, height: 23 }} />,
            text: "User Management",
            // link: "/usermanagement",
            subMenu: [
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Users",
                    link: "/usermanagement/users/viewusers"
                },
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Groups",
                    link: "/usermanagement/groups/viewgroups"
                },
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Role",
                    link: "/usermanagement/roles/viewroles"
                }
            ]
        },
        {
            index: 3,
            icon: <FiSettings size={20} style={{ width: 23, height: 23 }} />,
            text: "Settings",
            // link: "/",
            subMenu: [
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "General Settings",
                    link: "/settings/general",
                },
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Create Settings",
                    link: "/createsettings",
                },
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Edit Settings",
                    link: "/editsettings",
                },
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Update Settings",
                    link: "/updatesettings",
                }
            ]
        }
    ];
    // ######################## Array of menu items ########################

    // Automatically open the sub menu if the current location path is in the sub menu
    useEffect(() => {
        // For getting the current location path
        const currentLocationPath = window.location.pathname;

        // Do it using for loop
        for (let i = 0; i < SidebarMenuItemsArray.length; i++) {
            for (let j = 0; j < SidebarMenuItemsArray[i].subMenu.length; j++) {
                if (SidebarMenuItemsArray[i].subMenu[j].link === currentLocationPath) {
                    setCurrentMenuItem(i + 1);
                    setCurrentSubMenuSidebarOpenItem(i + 1);
                }
            }
        }
    }, []);

    return (
        <div className={`${styles.container} ${(isMinified) && (styles.minifySidebarContainer)}`}>
            {/* 
                <Head>
                    <title>Home - Project Management Software</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/logocopy.ico" />
                </Head> 
            */}

            <main className={styles.main}>
                <Navbar
                    // For simple open/close sidebar
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    // For minified sidebar
                    isMinified={isMinified}
                    setIsMinified={setIsMinified}
                />
                <div className='d-flex'>
                    <div style={{ position: "relative", zIndex: 1 }}>
                        <Sidebar
                            // Current menu item
                            currentMenuItem={currentMenuItem}
                            setCurrentMenuItem={setCurrentMenuItem}

                            // Current Sub menu item
                            currentSubMenuSidebarOpenItem={currentSubMenuSidebarOpenItem}
                            setCurrentSubMenuSidebarOpenItem={setCurrentSubMenuSidebarOpenItem}

                            // For simple open/close sidebar
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}

                            // For minified sidebar
                            isMinified={isMinified}
                            // Sidebar Menu Items Array
                            sidebarList={SidebarMenuItemsArray}
                        />
                    </div>

                    <div style={{ position: "relative", zIndex: 0 }} className={`${(isOpen) ? (styles.Home) : (styles.onSideClose)}`}>
                        {subComponent}
                    </div>
                </div>

                <Footer 
                    // For simple open/close sidebar
                    isOpen={isOpen}
                    // For minified sidebar
                    isMinified={isMinified}
                />
            </main>
        </div>
    )
}
export default Home;