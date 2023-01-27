import { useEffect, useState } from "react";
// importing App Router
import AppRouter from "./Router";
// importing Header
import Header from "./Components/Header";

import { useLocation } from 'react-router-dom';

// import { Helmet } from 'react-helmet';

import 'react-circular-progressbar/dist/styles.css';

const App = () => {
    // const location = useLocation();

    // Three Containers will be there 
    // 1) Login
    // 2) About Us
    // 3) Announcements
    const [mobileViewContainer, setMobileViewContainer] = useState<string>("Login");

    const [currentTab, setCurrentTab] = useState<number>(1);

    const [showHeader, setShowHeader] = useState<boolean>(false);

    // useEffect(() => {
    //     // The current location.
    //     // console.clear();
    //     console.log("The current location is: ", location.pathname);
    //     const url = location.pathname;

    //     if (url === "/login2" || url === "/forgetpassword") {
    //         setShowHeader(true);
    //     } else {
    //         setShowHeader(false);
    //     }
    // }, [location]);

    return (
        <div>
            {/* <Helmet>
        <title>EQA</title>
        <meta name="description" content="Education Quality Assurance Application" />
        <meta name="theme-color" content="#008f68" />
      </Helmet> */}
            {(showHeader) && (
                <Header
                    setCurrentTab={setCurrentTab}
                    setMobileViewContainer={setMobileViewContainer}
                />
            )}
            <AppRouter
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                mobileViewContainer={mobileViewContainer}
                showHeader={showHeader}
                setShowHeader={setShowHeader}
            />
        </div>
    )
}
export default App;
