import { FC } from "react";
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
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login2" element={<Login2
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                    mobileViewContainer={mobileViewContainer}
                />}
                />
                <Route path="/forgetpassword" element={<ForgetPassWord />} />
            </Routes>
        </Router>
    )
}
export default AppRouter;