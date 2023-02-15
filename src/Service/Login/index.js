import Cookies from "js-cookie";

// Importing Service for Login
import { postData } from "../../Core/Login";

const validateLogin = (object) => {
  return postData(
    "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/login/permissions",
    object
  ).then((data) => {;
    // window.localStorage.setItem("accessToken", data.jwtToken.accessToken);
    // Setting a cookie
    // We are setting the cookie for 60 days
    Cookies.set("accessToken", data.jwtToken.accessToken, { expires: 60 });

    const userDetails = data.privilege.user;

    const user = {
      Designataion: "Instructor",
      fullName: userDetails.firstName + " " + userDetails.lastName,
      College: userDetails.collegeId,
      Campus: userDetails.campusId,
      Phone: userDetails.phoneNo ? userDetails.phoneNo : "N/A",
      LastLogin: userDetails.lastLogin ? userDetails.lastLogin : "N/A",
      Email: userDetails.emailId,
      Department: userDetails.departmentId,
    };

    console.log("Login data  ===== >", user)

    localStorage.setItem("user", JSON.stringify(user));

    return data.status;
  });
};
export { validateLogin };
