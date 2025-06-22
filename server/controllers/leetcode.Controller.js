import { LeetCode } from "leetcode-query";
import { formatPieChartDataLeetCode } from "../utils/filterData.js";
const leetcode = new LeetCode();

export const getAllData = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "User ID is required" })
    const user = await leetcode.user(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    const convertedSubmissionCalendar = user.matchedUser?.submissionCalendar
      ? Object.entries(JSON.parse(user.matchedUser.submissionCalendar)).map(
          ([timestamp, value]) => {
            const date = new Date(parseInt(timestamp) * 1000);
            const formattedDate = date.toISOString().split("T")[0];
            return {
              date: formattedDate,
              count: value,
            };
          }
        )
      : [];

    const covertedPieData = formatPieChartDataLeetCode(
      user.matchedUser?.submitStats?.acSubmissionNum
    );
  
    const transformedData = {
      username: user.matchedUser?.username || "",
      submissionCalendar: convertedSubmissionCalendar,
      ranking: user.matchedUser?.profile?.ranking || null,
      piechartData: covertedPieData || [],
      badges: user.matchedUser?.badges || [],
      activeBadge: user.matchedUser?.activeBadge || null,
      activeDays: convertedSubmissionCalendar.length,
      totalQuestionSolved:user.matchedUser?.submitStats?.acSubmissionNum[0].count
    };

    res.status(200).json(transformedData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Missing id parameter" });
    }
    const response = await fetch(
      `https://alfa-leetcode-api.onrender.com/userProfile/${id}`
    );
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch data" });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserContestRankingInfo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Missing id parameter" });
    }

    const response = await fetch(
      `https://alfa-leetcode-api.onrender.com/userContestRankingInfo/${id}`
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch data" });
    }

    let data = await response.json();

    //data transfrom into desired format
    const userContestRanking = data.data.userContestRanking;
    const lineChartData = data.data.userContestRankingHistory
      .filter((contest) => contest.attended)
      .map((contest) => ({
        contestName: contest.contest.title,
        rating: contest.rating,
        date: contest.contest.startTime,
      }));

    const transformedData = {
      userContestRanking,
      lineChartData,
    };

    res.json(transformedData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSubmissionCalender = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Missing id parameter" });
    }
    const response = await fetch(
      `https://alfa-leetcode-api.onrender.com/${id}/calendar`
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch data" });
    }
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBadges = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Missing id parameter" });
    }

    const response = await fetch(
      `https://alfa-leetcode-api.onrender.com/${id}/badges`
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch data" });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
