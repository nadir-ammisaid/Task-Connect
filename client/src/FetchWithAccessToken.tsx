import Cookies from "js-cookie";

async function fetchWithAccessToken(
  endpoint: string,
  options = {},
): Promise<Response> {
  const token = Cookies.get("authToken");

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    ...options,
  });

  return response;
}

export default fetchWithAccessToken;
