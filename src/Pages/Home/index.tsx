import { useState, useEffect } from "react";

//importing navbar
import Navbar from "../../Components/Navbar";
import AssessmentDashboard from "../../Components/Pages/Home/AssessmentDashboard";
import Groups from "../../Components/Pages/UserManagement/Groups";
import Users from "../../Components/Pages/UserManagement/Users";
import Sidebar from "../../Components/Sidebar";

import { AiFillDashboard } from "react-icons/ai";
import { RxDot } from "react-icons/rx";
import { FiSettings } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";

import styles from "./style.module.css";

const Home = () => {

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
                    text: "Users",
                    link: "/",
                },
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Groups",
                    link: "/",
                },
                {
                    icon: <RxDot style={{ marginLeft: 2 }} />,
                    text: "Role",
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

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

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

    useEffect(() => {
        if (window.innerWidth < 991) {
            setIsOpen(false);
        }
    }, [windowSize]);

    const [hideExtra, setHideExtra] = useState<Number>(1);
    const [loading, setLoading] = useState<Boolean>(true);

    // For simple open/close sidebar
    const [isOpen, setIsOpen] = useState<Boolean>(true);

    // For minified sidebar
    const [isMinified, setIsMinified] = useState<Boolean>(false);

    const [currentMenuItem, setCurrentMenuItem] = useState<Number>(1);

    const [currentFullLengthItem, setCurrentFullLengthItem] = useState<Number>(1);

    return (
        <div className={`${styles.container} ${(isMinified) && (styles.minifySidebarContainer)}`}>
            {/* <Head>
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
                        currentMenuItem={currentMenuItem}
                        setCurrentMenuItem={setCurrentMenuItem}
                        // For simple open/close sidebar
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        // For minified sidebar
                        isMinified={isMinified}
                        setIsMinified={setIsMinified}
                        // Sidebar Menu Items Array
                        sidebarList={menuItemsArray}
                    />

                    <div className={`${(isOpen) ? (styles.Home) : (styles.onSideClose)}`}>
                        {/* <AssessmentDashboard
                            // For simple open/close sidebar
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            // For minified sidebar
                            isMinified={isMinified}
                            setIsMinified={setIsMinified}
                        /> */}
                        {/* 
                        <Users
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            // For minified sidebar
                            isMinified={isMinified}
                            setIsMinified={setIsMinified}
                        /> */}

                        <Groups
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            // For minified sidebar
                            isMinified={isMinified}
                            setIsMinified={setIsMinified}
                        />
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