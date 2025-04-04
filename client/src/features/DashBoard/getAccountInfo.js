export const getAccountInfo = async (platform, username) => {
  const baseUrl = `http://localhost:5000/api/v1/${platform}`;
  const allDataUrl = `${baseUrl}/allData/${username}`;
  const contestDataUrl = `${baseUrl}/userContestRankingInfo/${username}`;
  const storageKey = `${platform}_${username}_accountInfo`;

  try {
    console.log(allDataUrl);
    const res = await fetch(allDataUrl);

    if (!res.ok) {
      throw new Error("Failed to fetch data from server");
    }

    let data = await res.json();

    if (platform === "leetcode") {
      try {
        const res2 = await fetch(contestDataUrl);

        if (!res2.ok) {
          throw new Error("Failed to fetch contest data from server");
        }

        const { userContestRanking, lineChartData } = await res2.json();
        data = { ...data, userContestRanking, lineChartData };
      } catch (contestError) {
        if (
          contestError.message.includes("429") ||
          contestError.message.includes("Too Many Requests")
        ) {
          console.warn(
            "Too many requests, loading contest data from local storage."
          );
          const cachedData = localStorage.getItem(storageKey);
          if (cachedData) return JSON.parse(cachedData);
        } else {
          throw contestError;
        }
      }
    }
    localStorage.setItem(storageKey, JSON.stringify(data));
    return data;
  } catch (err) {
    console.error("Error fetching account info:", err.message);
    if (
      err.message.includes("429") ||
      err.message.includes("Too Many Requests")
    ) {
      console.warn("Too many requests, loading data from local storage.");
      const cachedData = localStorage.getItem(storageKey);
      console.log(cachedData);
      if (cachedData) return JSON.parse(cachedData);
    }

    return null;
  }
};
