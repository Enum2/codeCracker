import { convertHeatmapToSubmissionCalendar } from "../utils/converter.js";
import {
  formatPieChartDataCodeforces,
  transformDataSolvedPie,
} from "../utils/filterData.js";
import { getAllSolved } from "../utils/getAllSolved.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Combined function to fetch all data
export const getAllData = async (req, res) => {
  const { handle } = req.params;

  try {
    let date = Date.now();
    // Fetch solved problems by rating
    const ratingWiseSolved = await fetchRatingWiseSolved(handle);
    await sleep(2);

    // Fetch rating changes
    const ratingChanges = await fetchRatingChanges(handle);
    await sleep(2);

    // Fetch solved problems by tags
    const solvedByTags = await fetchSolvedByTags(handle);
    await sleep(2);

    const userInfo = await fetchUserInfo(handle);
    await sleep(2);

    // Fetch heatmap data
    const heatmapData = await fetchHeatmapData(handle);
    console.log(Date.now() - date);

    // Combine all data into one response object
    const allData = {
      userInfo,
      ratingWiseSolved,
      ratingChanges,
      solvedByTags,
      heatmapData,
    };

    const lineChartData = allData.ratingChanges.map((change) => ({
      contestName: change.contest,
      rating: change.newRating,
      date: change.ratingChange,
    }));
    const solvedByTagsPie = transformDataSolvedPie(allData.solvedByTags);
    const totalSolved = getAllSolved(allData.ratingWiseSolved);

    const finalData = {
      submissionCalendar: convertHeatmapToSubmissionCalendar(
        allData.heatmapData
      ),
      solvedByTags: allData.solvedByTags,
      solvedByTagsPie,
      ratingWiseSolved: allData.ratingWiseSolved,
      piechartData: formatPieChartDataCodeforces(allData.ratingWiseSolved),
      totalQuestionSolved:totalSolved,
      userContestRanking: {
        attendedContestsCount: allData?.ratingChanges?.length,
        rating: allData.userInfo[0].rating,
        globalRanking: allData?.userInfo[0].rank,
        maxRating: allData?.userInfo[0].maxRating,
      },
      lineChartData: lineChartData,
      acSubmissionNum: [
        { difficulty: "All", count: getAllSolved(allData.ratingWiseSolved) },
      ],
    };

    // Send all data as response
    return res.status(200).json({ success: true, ...finalData });
  } catch (error) {
    console.error(` Error fetching all data: ${error.message}`);
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
