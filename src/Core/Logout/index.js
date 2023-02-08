async function logoutCore(url = "", apiKey) {
  // const response = await fetch(url, {
  //   method: "GET",
  //   headers: {
  //     "X-API-KEY": apiKey
  //     // "Accept": "application/json",
  //     // "Content-Type": "application/json",
  //   }
  // //   body: JSON.stringify(data),
  // });

  // // if (!response.ok) {
  // //   throw new Error(`Error ${response.status}: ${response.statusText}`);
  // // }

  // const responseClone = response.clone();
  // console.log("responseClone for Logout in Core layer==> ", responseClone)
  // return responseClone;

  var endPoint = "https://eqa.datadimens.com:8443/IDENTITY-SERVICE/user/logout";

  fetch(endPoint, { method: "GET", headers: { "x-api-key": apiKey } })
    .then((response) => response.json())
    .then((res) => {
      console.log(res.status);
      console.log(res.code);
      console.log(res.transactionId);
      console.log("This is the response from logoutCore: ", res);
      if (res.status === "OK") {
        console.log("Logout Success");
        return res;
      }
    })
    .catch((err) => console.error("Error in logoutCore: ", err.message));
}

export { logoutCore };
