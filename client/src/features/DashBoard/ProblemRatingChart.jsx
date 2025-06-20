
import { ColorRankHandler } from "../../utils/Ratingmapping.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import styles from "./ProblemRatingChart.module.css";

const ProblemRatingChart = ({ data: ratingWiseSolved }) => {
  const data = Object.entries(ratingWiseSolved).map(([rating, count]) => ({
    rating: Number(rating),
    problems: count,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.customTooltip}>
          <p
            className={styles.tooltipLabel}
          >{`Rating: ${payload[0].payload.rating}`}</p>
          <p
            className={styles.tooltipValue}
          >{`Problems: ${payload[0].payload.problems}`}</p>
          <p
            className={styles.tooltipRank}
            style={{ color: ColorRankHandler(payload[0].payload.rating).color }}
          >
            {`Rank: ${ColorRankHandler(payload[0].payload.rating).rank}`}
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className={styles.box}>
      <h2 className={styles.title}>No. of Problems v/s Rating</h2>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            className={styles.customGrid}
          />
          <XAxis
            dataKey="rating"
            tick={{ className: styles.axisLabel }}
            axisLine={{ stroke: "#ccc" }}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ className: styles.axisLabel }}
            domain={[0, 90]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="problems"
            radius={[0, 0, 0, 0]}
            barSize={40}
            isAnimationActive={true}
            animationDuration={800}
            fill="#000000"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={ColorRankHandler(entry.rating).color}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProblemRatingChart;
