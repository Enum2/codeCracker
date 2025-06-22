export const getAccountInfo = async (platform, username) => {
  const baseUrl = `http://localhost:5000/api/v1/${platform}`;
  const allDataUrl = `${baseUrl}/allData/${username}`;
  const contestDataUrl = `${baseUrl}/userContestRankingInfo/${username}`;
  const storageKey = `${platform}_${username}_accountInfo`;

  try {
    
    const res = await fetch(allDataUrl);
    if (!res.ok) throw new Error("Failed to fetch allData");

    let data = await res.json();

    if (platform === "leetcode") {
      const res2 = await fetch(contestDataUrl);
      if (!res2.ok) throw new Error("Failed to fetch contest data");

      const { userContestRanking, lineChartData } = await res2.json();
      data = { ...data, userContestRanking, lineChartData };
    }

    localStorage.setItem(storageKey, JSON.stringify(data));
    return data;
  } catch (error) {
    console.warn("Fetch failed, trying localStorage:", error.message);

    const cached = localStorage.getItem(storageKey);
    if (cached) return JSON.parse(cached);

    throw error; 
  }
};
