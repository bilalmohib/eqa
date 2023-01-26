import { useEffect, useState } from "react";
// importing App Router
import AppRouter from "./Router";
// importing Header
import Header from "./Components/Header";

// import { Helmet } from 'react-helmet';

import 'react-circular-progressbar/dist/styles.css';

const App = () => {
    // Three Containers will be there 
    // 1) Login
    // 2) About Us
    // 3) Announcements
    const [mobileViewContainer, setMobileViewContainer] = useState<string>("Login");

    const [currentTab, setCurrentTab] = useState<number>(1);

    const [showHeader, setShowHeader] = useState<boolean>(true);

    useEffect(() => {
        // The current location.
        // console.clear();
        console.log("The current location is: ", window.location.pathname);
        const url = window.location.pathname;

        if (url === "/login2" || url === "/forgetpassword") {
            setShowHeader(true);
        } else {
            setShowHeader(false);
        }
    }, []);

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
            />
        </div>
    )
}
export default App;
