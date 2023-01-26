import { useState, useEffect } from "react";

// For routing
import { useNavigate } from "react-router";

import { Outlet } from "react-router-dom";

//importing navbar
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";

import { AiFillDashboard } from "react-icons/ai";
import { RxDot } from "react-icons/rx";
import { FiSettings } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";

import styles from "./style.module.css";

interface HomeProps {
    isOpen: Boolean,
    setIsOpen: any,
    // For minified sidebar
    isMinified: Boolean,
    setIsMinified: any,
    subComponent: any
}

const Home = ({
    isOpen,
    setIsOpen,
    // For minified sidebar
    isMinified,
    setIsMinified,
    subComponent
}: HomeProps) => {

    // For routing
    const navigate = useNavigate();

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
                    link: "/usermanagement/users"
                },
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Groups",
                    link: "/usermanagement/groups"
                },
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Role",
                    link: "/usermanagement/roles"
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
                    text: "Settings",
                    link: "/settings",
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
                    <Sidebar
                        // Current menu item
                        currentMenuItem={currentMenuItem}
                        setCurrentMenuItem={setCurrentMenuItem}

                        // Current Sub menu item
                        currentSubMenuSidebarOpenItem={currentSubMenuSidebarOpenItem}
                        setCurrentSubMenuSidebarOpenItem={setCurrentSubMenuSidebarOpenItem}

                        // For simple open/close sidebar
                        isOpen={isOpen}
                        
                        // For minified sidebar
                        isMinified={isMinified}
                        // Sidebar Menu Items Array
                        sidebarList={SidebarMenuItemsArray}
                    />

                    <div className={`${(isOpen) ? (styles.Home) : (styles.onSideClose)}`}>
                        {subComponent}
                    </div>
                </div>
            </main>

            <footer className={styles.footer}>
                {/* 
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                    <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                    </span>
                </a> 
                */}
            </footer>
        </div>
    )
}
export default Home;