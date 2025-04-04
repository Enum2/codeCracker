import React from "react";
import styles from "./TagGraph.module.css";
import { tagColors } from "../../utils/DashboardUtils";

const TagsGraph = ({ solvedByTags }) => {
  const sortedTags = Object.entries(solvedByTags).sort(([, a], [, b]) => b - a);
  const sortedSolvedByTags = Object.fromEntries(sortedTags);
  const maxValue = Math.max(...Object.values(sortedSolvedByTags));
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Problems Solved by Tag</h2>

      <div className={styles.chartWrapper}>
        <div className={styles.barChartContainer}>
          {Object.entries(sortedSolvedByTags).map(([tag, count]) => (
            <div key={tag} className={styles.barContainer}>
              <div className={styles.tagName}>{tag}</div>
              <div className={styles.barBackground}>
                <div
                  className={styles.barFill}
                  style={{
                    width: `${(count / maxValue) * 100}%`,
                    backgroundColor: tagColors[tag],
                  }}
                ></div>
              </div>
              <div className={styles.tagCount}>{count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagsGraph;
