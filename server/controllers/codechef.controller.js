export const getCodeChefProfile = async (req, res) => {
  const { handle } = req.params;
  const url = `https://codechef-api.vercel.app/handle/${handle}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.log(await response.text());
      return res
        .status(response.status)
        .json({ error: "Profile not found or API error" });
    }
    const data = await response.json();
    const lineChartData = data.ratingData.map((entry) => ({
      contestName: entry.name,
      rating: parseInt(entry.rating, 10),
      date: `${entry.getyear}-${entry.getmonth.padStart(
        2,
        "0"
      )}-${entry.getday.padStart(2, "0")}`,
    }));
    let totalsolved = data.heatMap.reduce(
      (total, entry) => total + entry.value,
      0
    );
    const submissionCalendar = data.heatMap.map((entry) => ({
      date: `${entry.date.split("-")[0]}-${entry.date
        .split("-")[1]
        .padStart(2, "0")}-${entry.date.split("-")[2].padStart(2, "0")}`,
      count: entry.value,
    }));
    const transformedData = {
      lineChartData,
      submissionCalendar,
      userContestRanking: {
        attendedContestsCount: data.ratingData.length,
        globalRanking: data.globalRank,
        highestRating: data.highestRating,
        rating: data.stars + " " + "(" + data.currentRating + ")",
      },
    };
    return res.status(200).json(transformedData);
  } catch (error) {
    console.error(`❌ Error fetching CodeChef profile: ${error.message}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};
