import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loadingspinner}>
      <div className={styles.square1}></div>
      <div className={styles.square2}></div>
      <div className={styles.square3}></div>
      <div className={styles.square4}></div>
      <div className={styles.square5}></div>
    </div>
  );
};

export default Loader;
