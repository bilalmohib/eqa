import Cookies from "js-cookie";

// Importing Service for Login
import { postData } from "../../Core/Login";

const validateLogin = (object) => {
  return postData(
    "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/login/permissions",
    object
  ).then((data) => {
    console.log("Login data  ===== >", data);
    // window.localStorage.setItem("accessToken", data.jwtToken.accessToken);
    // Setting a cookie
    // We are setting the cookie for 60 days
    Cookies.set("accessToken", data.jwtToken.accessToken, { expires: 60 });

    return data.status;
  });
};
export { validateLogin };
