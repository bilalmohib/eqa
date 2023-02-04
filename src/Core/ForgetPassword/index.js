async function resetData(url = "", data = {}, apiKey) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "X-API-KEY": apiKey,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const responseClone = response.clone();
  console.log("responseClone", responseClone)
  return responseClone.json();
}

export { resetData };
