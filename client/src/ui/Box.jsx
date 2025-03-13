import React from "react";
import styles from "./Box.module.css";

const Box = ({ title, count }) => {
  return (
    <div className={styles.box}>
      <p className={styles.title}>{title}</p>
      <p className={styles.count}>{count}</p>
    </div>
  );
};

export default Box;
