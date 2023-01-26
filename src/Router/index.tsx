import React from 'react';
import { useState, FC } from "react";
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
import Users from "../Components/Pages/Home/UserManagement/Users";
// 7) Groups Page
import Groups from "../Components/Pages/Home/UserManagement/Groups";
// 8) Roles Page
import Roles from '../Components/Pages/Home/UserManagement/Roles';
// 9) Settings Page
import Settings from '../Components/Pages/Home/Settings/Main';

// $$$$$$$$$$$$$$$$$$$$ Importing Components and Pages $$$$$$$$$$$$$$$$$$$$

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

    // For simple open/close sidebar
    const [isOpen, setIsOpen] = useState<Boolean>(true);

    // For minified sidebar
    const [isMinified, setIsMinified] = useState<Boolean>(false);

    return (
        <Router>
            <Routes>
                <Route path={"/"} element={<Home
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
                    <Route
                        path={"users"}
                        element={<Home
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            // For minified sidebar
                            isMinified={isMinified}
                            setIsMinified={setIsMinified}
                            subComponent={
                                <Users
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
                        path={"groups"}
                        element={<Home
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            // For minified sidebar
                            isMinified={isMinified}
                            setIsMinified={setIsMinified}
                            subComponent={
                                <Groups
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
                        path={"roles"}
                        element={<Home
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            // For minified sidebar
                            isMinified={isMinified}
                            setIsMinified={setIsMinified}
                            subComponent={
                                <Roles
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
                <Route path="settings">
                    <Route
                        path={"general"}
                        element={<Home
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
                <Route path={"/login"} element={<Login />} />
                <Route path={"/login2"} element={<Login2
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                    mobileViewContainer={mobileViewContainer}
                />}
                />
                <Route path={"/forgetpassword"} element={<ForgetPassWord />} />
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