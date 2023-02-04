// Importing Service for Login
import { resetData } from "../../Core/ForgetPassword";

const resetPassword = (object,apiKey) => {
  return resetData(
    "http://eqa.datadimens.com:8080/IDENTITY-SERVICE/login/updatePassword",
    object,
    apiKey
  ).then((data) => {
    // console.log("data  ===== >", data.status);
    window.localStorage.setItem("accessToken", data.jwtToken.accessToken);
    return data.status;
  });
};
export { resetPassword };
