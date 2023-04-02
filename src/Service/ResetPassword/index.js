// Importing Service for Login
import { resetData } from "../../Core/ForgetPassword";

import updateAPI from "../../Data/API/UPDATE";

const resetPassword = (object, apiKey) => {
  return resetData(updateAPI.Password, object, apiKey).then((data) => {
    // console.log("data  ===== >", data.status);
    // window.localStorage.setItem("accessToken", data.jwtToken.accessToken);
    return data.status;
  });
};
export { resetPassword };
