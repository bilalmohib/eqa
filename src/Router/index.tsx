import React from 'react';
import { useState,useEffect, FC } from "react";
import { useLocation } from 'react-router-dom';
// This is a React Router v6 app
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

// $$$$$$$$$$$$$$$$$$$$ Importing Components and Pages $$$$$$$$$$$$$$$$$$$$

// 1) Home Page
import Home from "../Pages/Home";
// 2) Login Page
import Login from "../Pages/Login";
// 3) Login2 Page
import Login2 from "../Pages/Login2";
// 4) Forgot Password Page
import ForgetPassWord from "../Pages/ForgetPassWord";
// 5) Admin Dashboard Page
import AssessmentDashboard from "../Components/Pages/Home/AssessmentDashboard";
// 6) User Management Pages
import ViewUsers from "../Components/Pages/Home/UserManagement/Users/ViewUsers";
// 7) Groups Page
import ViewGroups from "../Components/Pages/Home/UserManagement/Groups/ViewGroups";
// 8) Roles Page
import ViewRoles from '../Components/Pages/Home/UserManagement/Roles/ViewRoles';
// 9) Settings Page
import Settings from '../Components/Pages/Home/Settings/Main';
// 10) Create User Page
import AddUser from '../Components/Pages/Home/UserManagement/Users/AddUser';

// $$$$$$$$$$$$$$$$$$$$ Importing Components and Pages $$$$$$$$$$$$$$$$$$$$

interface AppRouterProps {
    mobileViewContainer: any,
    currentTab: any,
    setCurrentTab: any,
    showHeader: boolean,
    setShowHeader: any
}

const AppRouter: FC<AppRouterProps> = ({
    currentTab,
    setCurrentTab,
    mobileViewContainer,
    showHeader,
    setShowHeader
}): JSX.Element => {

    // For simple open/close sidebar
    const [isOpen, setIsOpen] = useState<Boolean>(true);

    // For minified sidebar
    const [isMinified, setIsMinified] = useState<Boolean>(false);

    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<Home
                  setShowHeader={setShowHeader}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    // For minified sidebar
                    isMinified={isMinified}
                    setIsMinified={setIsMinified}
                    subComponent={<AssessmentDashboard
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        // For minified sidebar
                        isMinified={isMinified}
                        setIsMinified={setIsMinified}
                    />
                    }
                />} />
                <Route path="dashboard">
                    <Route
                        path="assessment"
                        element={<Home
                            setShowHeader={setShowHeader}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            // For minified sidebar
                            isMinified={isMinified}
                            setIsMinified={setIsMinified}
                            subComponent={
                                <AssessmentDashboard
                                    isOpen={isOpen}
                                    setIsOpen={setIsOpen}
                                    // For minified sidebar
                                    isMinified={isMinified}
                                    setIsMinified={setIsMinified}
                                />
                            }
                        />}
                    />
                </Route>
                <Route path="usermanagement">
                    <Route path={"users"}>
                        <Route
                            path={"viewusers"}
                            element={<Home
                                setShowHeader={setShowHeader}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                // For minified sidebar
                                isMinified={isMinified}
                                setIsMinified={setIsMinified}
                                subComponent={
                                    <ViewUsers
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        // For minified sidebar
                                        isMinified={isMinified}
                                        setIsMinified={setIsMinified}
                                    />
                                }
                            />}
                        />
                        <Route
                            path={"adduser"}
                            element={<Home
                                setShowHeader={setShowHeader}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                // For minified sidebar
                                isMinified={isMinified}
                                setIsMinified={setIsMinified}
                                subComponent={
                                    <AddUser
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        // For minified sidebar
                                        isMinified={isMinified}
                                        setIsMinified={setIsMinified}
                                    />
                                }
                            />}
                        />
                    </Route>
                    <Route path={"groups"}>
                        <Route
                            path={"viewgroups"}
                            element={<Home
                                setShowHeader={setShowHeader}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                // For minified sidebar
                                isMinified={isMinified}
                                setIsMinified={setIsMinified}
                                subComponent={
                                    <ViewGroups
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        // For minified sidebar
                                        isMinified={isMinified}
                                        setIsMinified={setIsMinified}
                                    />
                                }
                            />}
                        />
                    </Route>
                    <Route path={"roles"}>
                        <Route
                            path={"viewroles"}
                            element={<Home
                                setShowHeader={setShowHeader}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                // For minified sidebar
                                isMinified={isMinified}
                                setIsMinified={setIsMinified}
                                subComponent={
                                    <ViewRoles
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        // For minified sidebar
                                        isMinified={isMinified}
                                        setIsMinified={setIsMinified}
                                    />
                                }
                            />}
                        />
                    </Route>
                </Route>
                <Route path="settings">
                    <Route
                        path={"general"}
                        element={<Home
                            setShowHeader={setShowHeader}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            // For minified sidebar
                            isMinified={isMinified}
                            setIsMinified={setIsMinified}
                            subComponent={
                                <Settings
                                    isOpen={isOpen}
                                    setIsOpen={setIsOpen}
                                    // For minified sidebar
                                    isMinified={isMinified}
                                    setIsMinified={setIsMinified}
                                />
                            }
                        />}
                    />
                </Route>
                <Route path={"/login"} element={<Login setShowHeader={setShowHeader} />} />
                <Route path={"/login2"} element={<Login2
                setShowHeader={setShowHeader}
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                    mobileViewContainer={mobileViewContainer}
                />}
                />
                <Route path={"/forgetpassword"} element={<ForgetPassWord setShowHeader={setShowHeader} />} />
                <Route
                    path={"/*"}
                    element={
                        <div>
                            <br />
                            <br />
                            <h1 className='text-center text-dark mt-4'>404: Not Found</h1>
                        </div>
                    }
                />
            </Routes>
        </Router>
    )
}
export default AppRouter;