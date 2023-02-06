import { useEffect, useState } from "react";
// importing App Router
import AppRouter from "./Router";

// IMPORTING REDUX PERSIST
// IMPORTING REDUX PERSIST

// importing Header
import Header from "./Components/Header";

import { useLocation } from 'react-router-dom';

// import { Helmet } from 'react-helmet';

import 'react-circular-progressbar/dist/styles.css';
import Loader from "./Components/Loader";

const App = () => {
    const [loading, setLoading] = useState<boolean>(true);

    // Three Containers will be there 
    // 1) Login
    // 2) About Us
    // 3) Announcements
    const [mobileViewContainer, setMobileViewContainer] = useState<string>("Login");

    const [currentTab, setCurrentTab] = useState<number>(1);

    const [showHeader, setShowHeader] = useState<boolean>(false);

    ////////////////// For loader when doing async calls //////////////////
    function demoAsyncCall() {
        return new Promise<void>((resolve) => setTimeout(() => resolve(), 2500));
    }

    useEffect(() => {
        // this simulates an async action, after which the component will render the content
        console.log(localStorage.getItem("accessToken"));
    });

    useEffect(() => {
        // this simulates an async action, after which the component will render the content
        demoAsyncCall().then(() => setLoading(false));
    });
    ////////////////// For loader when doing async calls //////////////////

    if (loading) { // if your component doesn't have to wait for async data, remove this block 
        return <Loader /> // render Loader here
    } else {
        return (
            <div>
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
}
export default App;
