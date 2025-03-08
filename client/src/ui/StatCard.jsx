import React from "react";
import { motion } from "framer-motion";
import styles from "./StatCard.module.css";

const StatCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    className={`${styles.statCard} ${styles[`${color}Gradient`]}`}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
  >
    <div className={styles.overlay} />
    <div className={styles.content}>
      <div className={styles.flexContainer}>
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300">{title}</p>
          <p className="text-2xl font-bold mt-2 dark:text-white">{value}</p>
        </div>
        <div className={styles.iconContainer}>
          <Icon className="text-xl" />
        </div>
      </div>
    </div>
  </motion.div>
);

export default StatCard;
