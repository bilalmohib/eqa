//
import { logoutCore } from "../Core/Logout";

const logoutService = async (xapiKey) => {
  try {
    const data = await logoutCore(
      "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/user/logout",
      xapiKey
    );
    console.log("Response DATA in service layer ===== >", data);
    return data;
  } catch (error) {
    // console.error("Error in logoutService:", error);
    // throw error;
  }
};

export { logoutService };
