import React from "react";
import styles from "./LandingPage.module.css";
import { motion } from "framer-motion";
const LandingPage = () => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>

      <div className={styles.content}>
        {/* Sidebar */}

        <aside className={styles.sidebar}>
          <div className={styles.profilePic}></div>
          <div className={styles.textBox}></div>
          <div className={styles.smallBox}></div>
        </aside>

        {/* Main content grid */}
        <main className={styles.main}>
          <div className={styles.box}></div>
          <div className={styles.box}></div>
          <div className={styles.boxWide}></div>
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
