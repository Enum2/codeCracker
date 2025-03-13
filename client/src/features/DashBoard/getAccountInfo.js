export const getAccountInfo = async (platform, username) => {
  const url = `http://localhost:5000/api/v1/${platform}/allData/${username}`;
  try {
    console.log(url);
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch data from server");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching account info:", err.message);
    return null;
  }
};
