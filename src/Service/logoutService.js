//
import { logoutCore } from "../Core/Logout";

import createAPI from "../Data/API/CREATE";

const logoutService = async (xapiKey) => {
  try {
    const data = await logoutCore(
      createAPI.Logout,
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
