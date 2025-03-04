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

    console.log("✔️ Rating-wise solved problems:");
    console.table(ratingWiseCount);

    return res.status(200).json({ success: true, data: ratingWiseCount });
  } catch (error) {
    console.error(`❌ Error fetching data: ${error.message}`);
    return res.status(500).json({ success: false, message: error.message });
  }
};
