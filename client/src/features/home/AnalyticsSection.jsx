import React from "react";
import styles from "./AnalyticsSection.module.css";
import statsImg from "../../assets/stats.png";

const AnalyticsSection = () => {
  return (
    <section className={styles.analyticsSection}>
      <div className={styles.imageWrapper}>
        <img src={statsImg} alt="Analytics" className={styles.image} />
      </div>
      <div className={styles.textContent}>
        <h2 className={styles.title}>Master Your Code Performance</h2>
        <p className={styles.description}>
          Dive deep into your coding trends with powerful analytics. Monitor accuracy, efficiency, and problem-solving speed to optimize your progress over time.
        </p>
        <div className={styles.buttons}>
          <button className={styles.tryNow}>Try now</button>
          <button className={styles.learnMore}>Learn more</button>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsSection;
