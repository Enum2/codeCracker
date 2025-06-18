import React from "react";
import styles from "./ContestChart.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export const sampleData = {
  userContestRanking: {
    attendedContestsCount: 2,
    rating: 1505.789,
    globalRanking: 278745,
    totalParticipants: 674556,
    topPercentage: 41.88,
    badge: null,
  },
  lineChartData: [
    {
      contestName: "Biweekly Contest 149",
      rating: 1518.085,
      date: 1738420200,
    },
    {
      contestName: "Biweekly Contest 151",
      rating: 1505.789,
      date: 1740839400,
    },
  ],
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        style={{
          background: "#f3c9b0",
          padding: "10px",
          border: "1px solid #FFB98E",
          borderRadius: "5px",
        }}
      >
        <p>
          <strong>{data.contestName}</strong>
        </p>
        <p>
          Rating: <strong>{Number.isFinite(data.rating) ? Number(data.rating).toFixed(2) : "N/A"}</strong>
        </p>
      </div>
    );
  }
  return null;
};

const RatingChart = ({ lineChartData, userContestRanking }) => {
  const {
    attendedContestsCount,
    rating,
    globalRanking,
    totalParticipants,
    topPercentage,
  } = userContestRanking;

  const maxRating = Math.max(...lineChartData.map((c) => c.rating));

  return (
    <div className={styles.line}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "2px",
          fontSize: "10px",
        }}
      >
        <div>
          🏆 <strong>Total Contests:</strong> {attendedContestsCount}
        </div>
        <div>
          📈 <strong>Current Rating:</strong>{" "}
          {Number.isFinite(rating) ? Number(rating).toFixed(2) : "N/A"}
        </div>
        <div>
          🔥 <strong>Max Rating:</strong>{" "}
          {Number.isFinite(maxRating) ? maxRating.toFixed(2) : "N/A"}
        </div>
        <div>
          🌎 <strong>Global Rank:</strong> {Number(globalRanking).toLocaleString()} /{" "}
          {Number(totalParticipants).toLocaleString()}
        </div>
        <div>
          🎯 <strong>Top Percentage:</strong> {topPercentage}%
        </div>
      </div>
      <ResponsiveContainer width="100%" height={370}>
        <LineChart
          data={lineChartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="contestName" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#de7335"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingChart;
