import React from 'react';
import { useEffect, FC } from "react";
// This is a React Router v6 app
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

// Importing Components
// 1) Home Page
import Home from "../Pages/Home";
// 2) Login Page
import Login from "../Pages/Login";
// 3) Login2 Page
import Login2 from "../Pages/Login2";
// 4) Forgot Password Page
import ForgetPassWord from "../Pages/ForgetPassWord";
// 5) Marketing Dashboard Page
import MarketingDashboard from "../Components/MarketingDashboard";

import { useTranslation, Trans } from 'react-i18next';

import i18n from "../i18n";

const baseRouteUrl = "/:locale(ar|en|de|chi)?";
export const baseUrl = i18n.language === '/en' ? '' : '/' + i18n.language;

interface AppRouterProps {
    mobileViewContainer: any,
    currentTab: any,
    setCurrentTab: any
}

const AppRouter: FC<AppRouterProps> = ({
    currentTab,
    setCurrentTab,
    mobileViewContainer
}): JSX.Element => {

    const { t } = useTranslation();

    useEffect(() => {
        console.log("The base url is equal to : ", baseRouteUrl);
    })

    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<MarketingDashboard />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/login2"} element={<Login2
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                    mobileViewContainer={mobileViewContainer}
                />}
                />
                <Route path={"/forgetpassword"} element={<ForgetPassWord />} />
                <Route path={"/dashboard"} element={<MarketingDashboard />} />
            </Routes>
        </Router>
    )
}
export default AppRouter;