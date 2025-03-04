export const getRatingWiseSolved = async (req, res) => {
  const { handle } = req.params;
  const url = `https://codeforces.com/api/user.status?handle=${handle}`;

  try {
    console.log(`Fetching solved problems for user: ${handle}...`);

    const response = await fetch(url);
    const data = await response.json();
    if (data.status !== "OK")
      throw new Error(data.comment || "Unknown error from Codeforces API");

    const solvedProblems = new Map();

    data.result.forEach(({ verdict, problem }) => {
      if (verdict === "OK" && problem.rating) {
        const problemId = `${problem.contestId}-${problem.index}`;
        if (!solvedProblems.has(problem.rating))
          solvedProblems.set(problem.rating, new Set());
        solvedProblems.get(problem.rating).add(problemId);
      }
    });

    const ratingWiseCount = Object.fromEntries(
      [...solvedProblems.entries()].map(([rating, problems]) => [
        rating,
        problems.size,
      ])
    );
    return res.status(200).json({ success: true, data: ratingWiseCount });
  } catch (error) {
    console.error(`❌ Error fetching data: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getRatingChanges = async (req, res) => {
  const { handle } = req.params;
  const url = `https://codeforces.com/api/user.rating?handle=${handle}`;

  try {
    console.log(`Fetching rating changes for user: ${handle}...`);
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      return res
        .status(400)
        .json({ error: data.comment || "Unknown error from Codeforces API" });
    }

    const ratingChanges = data.result.map((change) => ({
      contest: change.contestName,
      rank: change.rank,
      oldRating: change.oldRating,
      newRating: change.newRating,
      ratingChange: change.newRating - change.oldRating,
    }));

    return res.status(200).json(ratingChanges);
  } catch (error) {
    console.error(`❌ Error fetching data: ${error.message}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getSolvedByTags = async (req, res) => {
  const { handle } = req.params;
  const url = `https://codeforces.com/api/user.status?handle=${handle}`;

  try {
    console.log(`Fetching solved problems by tags for user: ${handle}...`);

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      return res
        .status(400)
        .json({ error: data.comment || "Unknown error from Codeforces API" });
    }

    const solvedByTags = new Map();
    const uniqueSolvedProblems = new Set();

    data.result.forEach(({ verdict, problem }) => {
      if (verdict === "OK") {
        const problemId = `${problem.contestId}-${problem.index}`;
        if (!uniqueSolvedProblems.has(problemId)) {
          uniqueSolvedProblems.add(problemId);

          problem.tags.forEach((tag) => {
            solvedByTags.set(tag, (solvedByTags.get(tag) || 0) + 1);
          });
        }
      }
    });

    const solvedTagsCount = Object.fromEntries(solvedByTags);
    return res.status(200).json(solvedTagsCount);
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getHeatmapData = async (req, res) => {
  const { handle } = req.params;
  const url = `https://codeforces.com/api/user.status?handle=${handle}`;

  try {
    console.log(`Fetching heatmap data for user: ${handle}...`);

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      return res
        .status(400)
        .json({ error: data.comment || "Failed to fetch submissions" });
    }

    const solvedByDate = new Map();

    data.result.forEach(({ verdict, creationTimeSeconds }) => {
      if (verdict === "OK") {
        const date = new Date(creationTimeSeconds * 1000)
          .toISOString()
          .split("T")[0];

        solvedByDate.set(date, (solvedByDate.get(date) || 0) + 1);
      }
    });

    const heatmapData = Object.fromEntries(solvedByDate);

    console.log("✔️ Heatmap data fetched successfully");
    return res.status(200).json(heatmapData);
  } catch (error) {
    console.error(`❌ Error fetching data: ${error.message}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};
