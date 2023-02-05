// Importing Service for Login
import { postData } from "../../Core/Login";

const validateLogin = (object) => {
  return postData(
    "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/login/permissions",
    object
  ).then((data) => {
    // console.log("data  ===== >", data.status);
    window.localStorage.setItem("accessToken", data.jwtToken.accessToken);
    return data.status;
  });
};
export { validateLogin };
