import React from "react";
import styles from "./LandingPage.module.css";
import Heatmap from "../features/DashBoard/Heatmap";

const LandingPage = () => {
  // console.log()
  const today = new Date();
  const nineMonthsAgo = new Date();
  nineMonthsAgo.setMonth(today.getMonth() - 9);

  const formattedEndDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  const formattedStartDate = nineMonthsAgo.toISOString().split("T")[0];

  const sampleHeatmapData = [
    { date: "2025-02-01", count: 3 },
    { date: "2025-02-02", count: 8 },
    { date: "2025-02-03", count: 6 },
    { date: "2025-02-04", count: 2 },
    { date: "205-02-05", count: 10 },
    { date: "2025-02-06", count: 5 },
    { date: "2025-02-07", count: 0 },
    { date: "2025-02-08", count: 7 },
    { date: "2024-02-09", count: 4 },
    { date: "2024-02-10", count: 9 },
    { date: "2024-02-11", count: 3 },
    { date: "2024-02-12", count: 1 },
    { date: "2024-02-13", count: 11 },
    { date: "2024-02-14", count: 0 },
    { date: "2024-02-15", count: 8 },
    { date: "2024-02-16", count: 2 },
    { date: "2024-02-17", count: 6 },
    { date: "2024-02-18", count: 7 },
    { date: "2024-02-19", count: 12 },
    { date: "2024-02-20", count: 3 },
    { date: "2024-02-21", count: 10 },
    { date: "2024-02-22", count: 5 },
    { date: "2024-02-23", count: 9 },
    { date: "2024-02-24", count: 1 },
    { date: "2024-02-25", count: 4 },
    { date: "2024-02-26", count: 0 },
    { date: "2024-02-27", count: 7 },
    { date: "2024-02-28", count: 5 },
    { date: "2024-02-29", count: 8 },
    { date: "2024-03-01", count: 6 },
    { date: "2024-03-02", count: 2 },
    { date: "2024-03-03", count: 11 },
    { date: "2024-03-04", count: 3 },
    { date: "2024-03-05", count: 9 },
    { date: "2024-03-06", count: 0 },
    { date: "2024-03-07", count: 10 },
    { date: "2024-03-08", count: 7 },
    { date: "2024-03-09", count: 4 },
    { date: "2024-03-10", count: 12 },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>

      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <div className={styles.profilePic}></div>
          <div className={styles.textBox}></div>
          <div className={styles.smallBox}></div>
        </aside>

        <main className={styles.main}>
          <div className={styles.box}></div>
          <div className={styles.box}></div>
          <Heatmap
            startDate={formattedStartDate}
            endDate={formattedEndDate}
            dataValues={sampleHeatmapData}
          />
          <div className={styles.box}></div>
          <div className={styles.box}></div>
          <div className={styles.boxWide}></div>
          <div className={styles.box}></div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
