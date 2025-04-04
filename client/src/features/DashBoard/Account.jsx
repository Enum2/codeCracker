import { useState } from "react";
import Box from "../../ui/Box";
import Heatmap from "./Heatmap";
import PieChart from "./PieChart";
import styles from "./Account.module.css";
import { getDateForHeatmap } from "./getDateForHeatmap";
import { formatPieChartData } from "../../utils/DashboardUtils";
import RatingChart from "./ContestChart";
import ProblemRatingsChart from "./ProblemRatingChart.jsx";
import TagsGraph from "./TageGraph.jsx";
import Switch from "../../ui/Switch.jsx";

function Account({ accountData, selectedPlatform }) {
  const { startDate, endDate } = getDateForHeatmap();
  const sampleHeatmapData = accountData?.submissionCalendar;
  const totalSolved = accountData
    ? accountData?.acSubmissionNum?.find((level) => level.difficulty === "All")
    : { count: 0 };

  const [showTagsGraph, setShowTagsGraph] = useState(true);

  const handleToggle = () => {
    setShowTagsGraph((prev) => !prev);
  };

  return (
    <>
      <Box title="Total Questions" count={totalSolved?.count} />
      <Box title="Total Active Days" count={sampleHeatmapData?.length} />

      {sampleHeatmapData && (
        <Heatmap
          startDate={startDate}
          endDate={endDate}
          dataValues={sampleHeatmapData}
        />
      )}
      {accountData && (
        <RatingChart
          lineChartData={accountData?.lineChartData}
          userContestRanking={accountData?.userContestRanking}
        />
      )}
      {accountData && accountData?.ratingWiseSolved && (
        <ProblemRatingsChart data={accountData.ratingWiseSolved} />
      )}

      {accountData?.solvedByTags && accountData?.solvedByTagsPie && (
        <div className={styles.toggleContainer}>
          <div className={styles.toggleLabel}>
            swithch bwtween pie and graph
          </div>
          <Switch
            isOn={showTagsGraph}
            handleToggle={handleToggle}
            onColor="#4caf50"
          />
        </div>
      )}

      {showTagsGraph && accountData?.solvedByTags && (
        <TagsGraph solvedByTags={accountData.solvedByTags} />
      )}
      {!showTagsGraph && accountData?.solvedByTagsPie && (
        <PieChart data={accountData.solvedByTagsPie} />
      )}
    </>
  );
}

export default Account;
