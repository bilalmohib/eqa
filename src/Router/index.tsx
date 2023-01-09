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

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login2" element={<Login2 />} />
                <Route path="/forget-password" element={<ForgetPassWord />} />
            </Routes>
        </Router>
    )
}
export default AppRouter;