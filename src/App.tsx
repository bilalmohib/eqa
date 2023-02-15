import { useEffect, useState } from "react";
// importing App Router
import AppRouter from "./Router";

// IMPORTING REDUX PERSIST
// IMPORTING REDUX PERSIST

// importing Header
import Header from "./Components/Header";

// import { Helmet } from 'react-helmet';

import 'react-circular-progressbar/dist/styles.css';
import Loader from "./Components/Loader";

// For LTR and RTL Theme
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
// For LTR and RTL Theme

const App = () => {
    const [loading, setLoading] = useState<boolean>(true);

    // Three Containers will be there 
    // 1) Login
    // 2) About Us
    // 3) Announcements
    const [mobileViewContainer, setMobileViewContainer] = useState<string>("Login");

    const [currentTab, setCurrentTab] = useState<number>(1);

    const [showHeader, setShowHeader] = useState<boolean>(false);

    // Current Language State
    const [currentLang, setCurrentLang] = useState<string>("en");
    // Current Language State

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

    // Theme for LT and RTL
    const theme = createTheme({
        direction: (currentLang === "ar") ? "rtl" : "ltr",
    });
    // Create rtl cache
    const cacheRtl = createCache({
        key: (currentLang === "ar") ? "muirtl" : "muiltr",
        // stylisPlugins: [prefixer, rtlPlugin],
        stylisPlugins: (currentLang === "ar") ? [prefixer, rtlPlugin] : [prefixer]
    });

    if (loading) { // if your component doesn't have to wait for async data, remove this block 
        return <Loader /> // render Loader here
    } else {
        return (
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
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
                            currentLang={currentLang}
                            setCurrentLang={setCurrentLang}
                        />
                    </div>
                </ThemeProvider>
            </CacheProvider>
        )
    }
}
export default App;
