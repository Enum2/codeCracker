import { convertHeatmapToSubmissionCalendar } from "../utils/converter.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Combined function to fetch all data
export const getAllData = async (req, res) => {
  const { handle } = req.params;

  try {
    console.log(`Fetching all data for user: ${handle}...`);

    // Fetch solved problems by rating
    const ratingWiseSolved = await fetchRatingWiseSolved(handle);
    await sleep(2000); // Wait for 2 seconds

    // Fetch rating changes
    const ratingChanges = await fetchRatingChanges(handle);
    await sleep(2000); // Wait for 2 seconds

    // Fetch solved problems by tags
    const solvedByTags = await fetchSolvedByTags(handle);
    await sleep(2000); // Wait for 2 seconds

    const userInfo = await fetchUserInfo(handle);
    await sleep(2000); // Wait for 2 seconds

    // Fetch heatmap data
    const heatmapData = await fetchHeatmapData(handle);

    // Combine all data into one response object
    const allData = {
      userInfo,
      ratingWiseSolved,
      ratingChanges,
      solvedByTags,
      heatmapData,
    };

    const finalData = {
      submissionCalendar: convertHeatmapToSubmissionCalendar(
        allData.heatmapData
      ),
      solvedByTags: allData.solvedByTags,
      ratingWiseSolved: allData.ratingWiseSolved,
      userContestRanking: {
        attendedContestsCount: allData?.ratingChanges?.length,
        rating: allData.userInfo.rating,
        globalRanking: allData?.userInfo.rank,
        maxRating: allData?.userInfo.maxRating,
      },
      lineChartData: allData.ratingChanges,
    };

    // Send all data as response
    return res.status(200).json({ success: true, data: finalData });
  } catch (error) {
    console.error(`❌ Error fetching all data: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Function to fetch solved problems by rating
export const fetchRatingWiseSolved = async (handle) => {
  const url = `https://codeforces.com/api/user.status?handle=${handle}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "OK")
    throw new Error(data.comment || "Unknown error from Codeforces API");

  const solvedProblems = new Map();
  data.result.forEach(({ verdict, problem }) => {
    if (verdict === "OK" && problem && problem.rating) {
      const problemId = `${problem.contestId}-${problem.index}`;
      if (!solvedProblems.has(problem.rating))
        solvedProblems.set(problem.rating, new Set());
      solvedProblems.get(problem.rating).add(problemId);
    }
  });

  return Object.fromEntries(
    [...solvedProblems.entries()].map(([rating, problems]) => [
      rating,
      problems.size,
    ])
  );
};

// Function to fetch rating changes
export const fetchRatingChanges = async (handle) => {
  const url = `https://codeforces.com/api/user.rating?handle=${handle}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "OK")
    throw new Error(data.comment || "Unknown error from Codeforces API");

  return data.result.map((change) => ({
    contest: change.contestName,
    rank: change.rank,
    oldRating: change.oldRating,
    newRating: change.newRating,
    ratingChange: change.newRating - change.oldRating,
  }));
};

// Function to fetch solved problems by tags
export const fetchSolvedByTags = async (handle) => {
  const url = `https://codeforces.com/api/user.status?handle=${handle}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "OK")
    throw new Error(data.comment || "Unknown error from Codeforces API");

  const solvedByTags = new Map();
  const uniqueSolvedProblems = new Set();

  data.result.forEach(({ verdict, problem }) => {
    if (verdict === "OK" && problem && problem.tags) {
      const problemId = `${problem.contestId}-${problem.index}`;
      if (!uniqueSolvedProblems.has(problemId)) {
        uniqueSolvedProblems.add(problemId);

        problem.tags.forEach((tag) => {
          solvedByTags.set(tag, (solvedByTags.get(tag) || 0) + 1);
        });
      }
    }
  });

  return Object.fromEntries(solvedByTags);
};

// Function to fetch heatmap data (solved problems by date)
export const fetchHeatmapData = async (handle) => {
  const url = `https://codeforces.com/api/user.status?handle=${handle}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "OK")
    throw new Error(data.comment || "Failed to fetch submissions");

  const solvedByDate = new Map();
  data.result.forEach(({ verdict, creationTimeSeconds }) => {
    if (verdict === "OK") {
      const date = new Date(creationTimeSeconds * 1000)
        .toISOString()
        .split("T")[0];
      solvedByDate.set(date, (solvedByDate.get(date) || 0) + 1);
    }
  });

  return Object.fromEntries(solvedByDate);
};

export const fetchUserInfo = async (handle) => {
  const url = `https://codeforces.com/api/user.info?handles=${handle}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.status !== "OK")
    throw new Error(data.comment || "Unknown error from Codeforces API");

  return data.result;
};
