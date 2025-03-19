import Box from "../../ui/Box";
import Heatmap from "./Heatmap";
import PieChart from "./PieChart";
import styles from "./Account.module.css";
import { getDateForHeatmap } from "./getDateForHeatmap";
import { formatPieChartData } from "../../utils/DashboardUtils";
import RatingChart from "./ContestChart";

function Account({ accountData }) {
  const { startDate, endDate } = getDateForHeatmap();
  const sampleHeatmapData = accountData?.submissionCalendar;
  const totalSolved = accountData
    ? accountData.acSubmissionNum.find((level) => level.difficulty === "All")
    : { count: 0 };

  return (
    <>
      <Box title="Total Questions" count={totalSolved.count} />
      <Box
        title="Total Active Days
"
        count={sampleHeatmapData?.length}
      />
      {sampleHeatmapData && (
        <Heatmap
          startDate={startDate}
          endDate={endDate}
          dataValues={sampleHeatmapData}
        />
      )}
      <RatingChart />
      {accountData && <PieChart data={formatPieChartData(accountData)} />}
      <div className={styles.boxWide}></div>
      <div className={styles.box}></div>
    </>
  );
}

export default Account;
