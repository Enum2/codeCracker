import Box from "../../ui/Box";
import styles from "./Account.module.css";
import { getDateForHeatmap } from "./getDateForHeatmap";
import Heatmap from "./Heatmap";

function Account({ accountData }) {
  console.log(accountData?.submissionCalendar);
  const { startDate, endDate } = getDateForHeatmap();
  console.log(getDateForHeatmap());
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
      <div className={styles.box}></div>
      <div className={styles.box}></div>
      <div className={styles.boxWide}></div>
      <div className={styles.box}></div>
    </>
  );
}

export default Account;
