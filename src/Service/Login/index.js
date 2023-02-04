// Importing Service for Login
import { postData } from "../../Core/Login";

const validateLogin = (object) => {
  return postData(
    "http://eqa.datadimens.com:8080/IDENTITY-SERVICE/login/permissions",
    object
  ).then((data) => {
    // console.log("data  ===== >", data.status);
    window.localStorage.setItem("accessToken", data.jwtToken.accessToken);
    return data.status;
  });
};
export { validateLogin };
