import { useState,useEffect, FC } from "react";
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
// import Login from "../Pages/Login";
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
// 11) Create Group Page
import AddGroup from '../Components/Pages/Home/UserManagement/Groups/AddGroup';
// 12) Create Role Page
import AddRole from '../Components/Pages/Home/UserManagement/Roles/AddRole';
// 13 ) View Apps Page
import ViewApps from '../Components/Pages/Home/UserManagement/Application/ViewApps';
// 14) Create App Page
import AddApp from '../Components/Pages/Home/UserManagement/Application/AddApp';
// 15) View AppForm Page
import ViewAppForm from '../Components/Pages/Home/UserManagement/AppForm/ViewAppForm';
// 16) Create AppForm Page
import AddAppForm from '../Components/Pages/Home/UserManagement/AppForm/AddAppForm';
// 17) Create RoleAppPrivilege Page
import AddRoleApp from '../Components/Pages/Home/UserManagement/RoleAppPrivilege/AddRoleApp';
// 18) View RoleAppPrivilege Page
import ViewRoleApp from '../Components/Pages/Home/UserManagement/RoleAppPrivilege/ViewRoleApp';
// 19) View UserGroup Page
import ViewUserGroup from '../Components/Pages/Home/UserManagement/UserGroup/ViewUserGroup';
// 20) Create UserGroup Page
import AddUserGroup from '../Components/Pages/Home/UserManagement/UserGroup/AddUserGroup';
// $$$$$$$$$$$$$$$$$$$$ Importing Components and Pages $$$$$$$$$$$$$$$$$$$$

interface AppRouterProps {
    mobileViewContainer: any,
    currentTab: any,
    setCurrentTab: any,
    showHeader: boolean,
    setShowHeader: any,
    currentLang: string,
    setCurrentLang: any
}

const AppRouter: FC<AppRouterProps> = ({
    currentTab,
    setCurrentTab,
    mobileViewContainer,
    showHeader,
    setShowHeader,
    currentLang,
    setCurrentLang
}): JSX.Element => {

    // For simple open/close sidebar
    const [isOpen, setIsOpen] = useState<Boolean>(true);

    // For minified sidebar
    const [isMinified, setIsMinified] = useState<Boolean>(false);

    const [sidebarAppsListArray, setSidebarAppsListArray] = useState<any>([]);

    // For Checking the Editable and Deletable Permission
    let FinalsidebarAppsListArray = JSON.parse(localStorage.getItem("sidebarAppsListArray") || '[]');

    const [creatable, setCreatable] = useState<boolean>(false);

    useEffect(() => {
        // For getting the current location path
        // eslint-disable-next-line no-restricted-globals
        const currentLocationPath = location.pathname;

        console.log("Current Location Path is: ", currentLocationPath);

        // Do it using for loop
        for (let i = 0; i < FinalsidebarAppsListArray.length; i++) {
            let subMenu = FinalsidebarAppsListArray[i].subMenu;
            for (let j = 0; j < subMenu.length; j++) {
                // alert("Current Location Path is: " + currentLocationPath + " and the subMenu[j].formUrl is: " + subMenu[j].formUrl + " and the i is: " + i + " and the Menu URL is: " + FinalsidebarAppsListArray[i].appUrl);
                if (subMenu[j].formUrl === currentLocationPath || FinalsidebarAppsListArray[i].appUrl === currentLocationPath) {
                    // alert("Equal" + FinalsidebarAppsListArray[i].appName)
                    if (subMenu[j].createPermission === true) {
                        setCreatable(true);
                        console.log("Is Creatable ===> ", creatable);
                    }
                }
            }
        }
    }, [FinalsidebarAppsListArray, creatable]);
    // For Checking the Editable and Deletable Permission

    return (
        <Router>
            <Routes>
                <Route index path={"/login"} element={<Login2
                    setShowHeader={setShowHeader}
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                    mobileViewContainer={mobileViewContainer}

                    // Sidebar Apps List
                    sidebarAppsListArray={sidebarAppsListArray}
                    setSidebarAppsListArray={setSidebarAppsListArray}
                />}
                />
                <Route index path={"/"} element={<Login2
                    setShowHeader={setShowHeader}
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                    mobileViewContainer={mobileViewContainer}

                    // Sidebar Apps List
                    sidebarAppsListArray={sidebarAppsListArray}
                    setSidebarAppsListArray={setSidebarAppsListArray}
                />}
                />
                {/* (((((((((((((((((((((( For Viewing )))))))))))))))))))))) */}
                {/* 1) */}
                <Route path="assessment">
                    <Route
                        path="view"
                        element={<Home
                            setShowHeader={setShowHeader}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            // For minified sidebar
                            isMinified={isMinified}
                            setIsMinified={setIsMinified}
                            currentLang={currentLang}
                            setCurrentLang={setCurrentLang}

                            // Sidebar Apps List
                            sidebarAppsListArray={sidebarAppsListArray}
                            setSidebarAppsListArray={setSidebarAppsListArray}

                            // @subComponent
                            subComponent={
                                <AssessmentDashboard
                                    isOpen={isOpen}
                                    setIsOpen={setIsOpen}
                                    // For minified sidebar
                                    isMinified={isMinified}
                                    setIsMinified={setIsMinified}
                                    currentLang={currentLang}
                                />
                            }
                        />}
                    />
                </Route>
                {/* 2) */}
                <Route path="account">
                    <Route
                        path={"view"}
                        element={<Home
                            setShowHeader={setShowHeader}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            // For minified sidebar
                            isMinified={isMinified}
                            setIsMinified={setIsMinified}
                            currentLang={currentLang}
                            setCurrentLang={setCurrentLang}

                            // Sidebar Apps List
                            sidebarAppsListArray={sidebarAppsListArray}
                            setSidebarAppsListArray={setSidebarAppsListArray}

                            // @subComponent
                            subComponent={
                                <ViewUsers
                                    isOpen={isOpen}
                                    setIsOpen={setIsOpen}
                                    // For minified sidebar
                                    isMinified={isMinified}
                                    setIsMinified={setIsMinified}
                                    currentLang={currentLang}
                                    creatable={creatable}
                                />
                            }
                        />}
                    />
                </Route>
                {/* 3) */}
                <Route path="group">
                    <Route
                        path={"view"}
                        element={<Home
                            setShowHeader={setShowHeader}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            // For minified sidebar
                            isMinified={isMinified}
                            setIsMinified={setIsMinified}
                            currentLang={currentLang}
                            setCurrentLang={setCurrentLang}

                            // Sidebar Apps List
                            sidebarAppsListArray={sidebarAppsListArray}
                            setSidebarAppsListArray={setSidebarAppsListArray}

                            // @subComponent
                            subComponent={
                                <ViewGroups
                                    isOpen={isOpen}
                                    setIsOpen={setIsOpen}
                                    // For minified sidebar
                                    isMinified={isMinified}
                                    setIsMinified={setIsMinified}
                                    currentLang={currentLang}
                                    creatable={creatable}
                                />
                            }
                        />}
                    />
                </Route>
                {/* 4) */}
                <Route path="role">
                    <Route
                        path={"view"}
                        element={<Home
                            setShowHeader={setShowHeader}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            // For minified sidebar
                            isMinified={isMinified}
                            setIsMinified={setIsMinified}
                            currentLang={currentLang}
                            setCurrentLang={setCurrentLang}

                            // Sidebar Apps List
                            sidebarAppsListArray={sidebarAppsListArray}
                            setSidebarAppsListArray={setSidebarAppsListArray}

                            // @subComponent
                            subComponent={
                                <ViewRoles
                                    isOpen={isOpen}
                                    setIsOpen={setIsOpen}
                                    // For minified sidebar
                                    isMinified={isMinified}
                                    setIsMinified={setIsMinified}
                                    currentLang={currentLang}
                                    creatable={creatable}
                                />
                            }
                        />}
                    />
                </Route>
                {/* (((((((((((((((((((((( For Viewing )))))))))))))))))))))) */}

                <Route path="account">
                    <Route path={"users"}>
                        <Route
                            path={"view"}
                            element={<Home
                                setShowHeader={setShowHeader}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                // For minified sidebar
                                isMinified={isMinified}
                                setIsMinified={setIsMinified}
                                currentLang={currentLang}
                                setCurrentLang={setCurrentLang}

                                // Sidebar Apps List
                                sidebarAppsListArray={sidebarAppsListArray}
                                setSidebarAppsListArray={setSidebarAppsListArray}

                                // @subComponent
                                subComponent={
                                    <ViewUsers
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        // For minified sidebar
                                        isMinified={isMinified}
                                        setIsMinified={setIsMinified}
                                        currentLang={currentLang}
                                        creatable={creatable}
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
                                currentLang={currentLang}
                                setCurrentLang={setCurrentLang}

                                // Sidebar Apps List
                                sidebarAppsListArray={sidebarAppsListArray}
                                setSidebarAppsListArray={setSidebarAppsListArray}

                                // @subComponent
                                subComponent={
                                    <AddUser
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        // For minified sidebar
                                        isMinified={isMinified}
                                        setIsMinified={setIsMinified}
                                        currentLang={currentLang}
                                    />
                                }
                            />}
                        />
                    </Route>
                    <Route path={"groups"}>
                        <Route
                            path={"view"}
                            element={<Home
                                setShowHeader={setShowHeader}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                // For minified sidebar
                                isMinified={isMinified}
                                setIsMinified={setIsMinified}
                                currentLang={currentLang}
                                setCurrentLang={setCurrentLang}

                                // Sidebar Apps List
                                sidebarAppsListArray={sidebarAppsListArray}
                                setSidebarAppsListArray={setSidebarAppsListArray}

                                // @subComponent
                                subComponent={
                                    <ViewGroups
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        // For minified sidebar
                                        isMinified={isMinified}
                                        setIsMinified={setIsMinified}
                                        currentLang={currentLang}
                                        creatable={creatable}
                                    />
                                }
                            />}
                        />
                        <Route
                            path={"addgroup"}
                            element={<Home
                                setShowHeader={setShowHeader}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                // For minified sidebar
                                isMinified={isMinified}
                                setIsMinified={setIsMinified}
                                currentLang={currentLang}
                                setCurrentLang={setCurrentLang}

                                // Sidebar Apps List
                                sidebarAppsListArray={sidebarAppsListArray}
                                setSidebarAppsListArray={setSidebarAppsListArray}

                                // @subComponent
                                subComponent={
                                    <AddGroup
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
                    <Route path={"apps"}>
                        <Route
                            path={"view"}
                            element={<Home
                                setShowHeader={setShowHeader}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                // For minified sidebar
                                isMinified={isMinified}
                                setIsMinified={setIsMinified}
                                currentLang={currentLang}
                                setCurrentLang={setCurrentLang}

                                // Sidebar Apps List
                                sidebarAppsListArray={sidebarAppsListArray}
                                setSidebarAppsListArray={setSidebarAppsListArray}

                                // @subComponent
                                subComponent={
                                    <ViewApps
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        // For minified sidebar
                                        isMinified={isMinified}
                                        setIsMinified={setIsMinified}
                                        currentLang={currentLang}
                                        creatable={creatable}
                                    />
                                }
                            />}
                        />
                        <Route
                            path={"addapp"}
                            element={<Home
                                setShowHeader={setShowHeader}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                // For minified sidebar
                                isMinified={isMinified}
                                setIsMinified={setIsMinified}
                                currentLang={currentLang}
                                setCurrentLang={setCurrentLang}

                                // Sidebar Apps List
                                sidebarAppsListArray={sidebarAppsListArray}
                                setSidebarAppsListArray={setSidebarAppsListArray}

                                // @subComponent
                                subComponent={
                                    <AddApp
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
                            path={"view"}
                            element={<Home
                                setShowHeader={setShowHeader}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                // For minified sidebar
                                isMinified={isMinified}
                                setIsMinified={setIsMinified}
                                currentLang={currentLang}
                                setCurrentLang={setCurrentLang}

                                // Sidebar Apps List
                                sidebarAppsListArray={sidebarAppsListArray}
                                setSidebarAppsListArray={setSidebarAppsListArray}

                                // @subComponent
                                subComponent={
                                    <ViewRoles
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        // For minified sidebar
                                        isMinified={isMinified}
                                        setIsMinified={setIsMinified}
                                        currentLang={currentLang}
                                        creatable={creatable}
                                    />
                                }
                            />}
                        />
                        <Route
                            path={"addrole"}
                            element={<Home
                                setShowHeader={setShowHeader}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                // For minified sidebar
                                isMinified={isMinified}
                                setIsMinified={setIsMinified}
                                currentLang={currentLang}
                                setCurrentLang={setCurrentLang}

                                // Sidebar Apps List
                                sidebarAppsListArray={sidebarAppsListArray}
                                setSidebarAppsListArray={setSidebarAppsListArray}

                                // @subComponent
                                subComponent={
                                    <AddRole
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
                    <Route path={"appForm"}>
                        <Route
                            path={"view"}
                            element={<Home
                                setShowHeader={setShowHeader}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                // For minified sidebar
                                isMinified={isMinified}
                                setIsMinified={setIsMinified}
                                currentLang={currentLang}
                                setCurrentLang={setCurrentLang}

                                // Sidebar Apps List
                                sidebarAppsListArray={sidebarAppsListArray}
                                setSidebarAppsListArray={setSidebarAppsListArray}

                                // @subComponent
                                subComponent={
                                    <ViewAppForm
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        // For minified sidebar
                                        isMinified={isMinified}
                                        setIsMinified={setIsMinified}
                                        currentLang={currentLang}
                                        creatable={creatable}
                                    />
                                }
                            />}
                        />
                        <Route
                            path={"addAppForm"}
                            element={<Home
                                setShowHeader={setShowHeader}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                // For minified sidebar
                                isMinified={isMinified}
                                setIsMinified={setIsMinified}
                                currentLang={currentLang}
                                setCurrentLang={setCurrentLang}

                                // Sidebar Apps List
                                sidebarAppsListArray={sidebarAppsListArray}
                                setSidebarAppsListArray={setSidebarAppsListArray}

                                // @subComponent
                                subComponent={
                                    <AddAppForm
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
                    <Route path={"role-app"}>
                        <Route
                            path={"view"}
                            element={<Home
                                setShowHeader={setShowHeader}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                // For minified sidebar
                                isMinified={isMinified}
                                setIsMinified={setIsMinified}
                                currentLang={currentLang}
                                setCurrentLang={setCurrentLang}

                                // Sidebar Apps List
                                sidebarAppsListArray={sidebarAppsListArray}
                                setSidebarAppsListArray={setSidebarAppsListArray}

                                // @subComponent
                                subComponent={
                                    <ViewRoleApp
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        // For minified sidebar
                                        isMinified={isMinified}
                                        setIsMinified={setIsMinified}
                                        currentLang={currentLang}
                                        creatable={creatable}
                                    />
                                }
                            />}
                        />
                        <Route
                            path={"addRoleApp"}
                            element={<Home
                                setShowHeader={setShowHeader}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                // For minified sidebar
                                isMinified={isMinified}
                                setIsMinified={setIsMinified}
                                currentLang={currentLang}
                                setCurrentLang={setCurrentLang}

                                // Sidebar Apps List
                                sidebarAppsListArray={sidebarAppsListArray}
                                setSidebarAppsListArray={setSidebarAppsListArray}

                                // @subComponent
                                subComponent={
                                    <AddRoleApp
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
                    <Route path={"user-group"}>
                        <Route
                            path={"view"}
                            element={<Home
                                setShowHeader={setShowHeader}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                // For minified sidebar
                                isMinified={isMinified}
                                setIsMinified={setIsMinified}
                                currentLang={currentLang}
                                setCurrentLang={setCurrentLang}

                                // Sidebar Apps List
                                sidebarAppsListArray={sidebarAppsListArray}
                                setSidebarAppsListArray={setSidebarAppsListArray}

                                // @subComponent
                                subComponent={
                                    <ViewUserGroup
                                        isOpen={isOpen}
                                        setIsOpen={setIsOpen}
                                        // For minified sidebar
                                        isMinified={isMinified}
                                        setIsMinified={setIsMinified}
                                        currentLang={currentLang}
                                        creatable={creatable}
                                    />
                                }
                            />}
                        />
                        <Route
                            path={"addUserGroup"}
                            element={<Home
                                setShowHeader={setShowHeader}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                                // For minified sidebar
                                isMinified={isMinified}
                                setIsMinified={setIsMinified}
                                currentLang={currentLang}
                                setCurrentLang={setCurrentLang}

                                // Sidebar Apps List
                                sidebarAppsListArray={sidebarAppsListArray}
                                setSidebarAppsListArray={setSidebarAppsListArray}

                                // @subComponent
                                subComponent={
                                    <AddUserGroup
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
                            currentLang={currentLang}
                            setCurrentLang={setCurrentLang}

                            // Sidebar Apps List
                            sidebarAppsListArray={sidebarAppsListArray}
                            setSidebarAppsListArray={setSidebarAppsListArray}

                            // @subComponent
                            subComponent={
                                <Settings
                                    isOpen={isOpen}
                                    setIsOpen={setIsOpen}
                                    // For minified sidebar
                                    isMinified={isMinified}
                                    setIsMinified={setIsMinified}
                                    currentLang={currentLang}
                                    setCurrentLang={setCurrentLang}
                                />
                            }
                        />}
                    />
                </Route>
                {/* <Route path={"/login"} element={<Login setShowHeader={setShowHeader} />} /> */}
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