export const getAllContestsInfo = async (req, res) => {
  try {
    const username = process.env.CLIST_USERNAME;
    const apiKey = process.env.CLIST_API_KEY;
    const BASE_URL = "https://clist.by/api/v4/json/contest/";

    // Get current date in IST
    const now = new Date();
    const firstDayOfMonth = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)
    );
    const lastDayOfMonth = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59)
    );

    const params = new URLSearchParams({
      username: username,
      api_key: apiKey,
      format_time: "true",
      order_by: "start",
      start__gte: firstDayOfMonth.toISOString(),
      end__lte: lastDayOfMonth.toISOString(),
    });

    const response = await fetch(`${BASE_URL}?${params}`);
    if (!response.ok) {
      throw new Error(`CLIST API responded with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.objects) {
      return res.status(200).json([]);
    }

    const targetPlatforms = new Set([
      "atcoder.jp",
      "leetcode.com",
      "geeksforgeeks.org",
      "codeforces.com",
      "codechef.com",
      "hackerrank.com",
    ]);

    // Function to parse date and convert to IST
    const parseAndConvertToIST = (dateStr) => {
      if (!dateStr) return null;

      // Format: "13.04 Sun 21:05" (DD.MM Day HH:mm)
      const [datePart, , timePart] = dateStr.split(" ");
      const [day, month] = datePart.split(".");
      const [hours, minutes] = timePart.split(":");

      // Create date in IST (UTC+5:30)
      const year = new Date().getFullYear();
      const utcDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
      return new Date(utcDate.getTime());
    };

    const formattedContests = data.objects
      .filter((contest) => {
        const host = contest.host?.toLowerCase();
        return targetPlatforms.has(host);
      })
      .map((contest) => {
        try {
          const startDate = parseAndConvertToIST(contest.start);
          const endDate = parseAndConvertToIST(contest.end);

          if (!startDate || isNaN(startDate.getTime())) {
            console.warn(
              `Skipping contest with invalid start date: ${contest.event}`
            );
            return null;
          }

          // Format for Indian time display
          const options = {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          };

          return {
            title: contest.event || "Untitled Contest",
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            display_start: contest.start.toLocaleString("en-IN", options),
            display_end: contest.end.toLocaleString("en-IN", options),
            link: contest.href || "#",
            platform: contest.resource?.name || contest.host || "unknown",
            duration: contest.duration || 0,
          };
        } catch (error) {
          console.warn(`Error processing contest ${contest.event}:`, error);
          return null;
        }
      })
      .filter((contest) => contest !== null)
      .sort((a, b) => new Date(a.start) - new Date(b.start));

    return res.status(200).json(formattedContests);
  } catch (error) {
    console.error("Error fetching contests:", error);
    return res.status(500).json({
      error: "Failed to fetch contest data",
      details: error.message,
    });
  }
};
