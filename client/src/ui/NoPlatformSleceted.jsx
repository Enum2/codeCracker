import styles from "./NoPlatformSelected.module.css";

function NoPlatformSelected({ accounts }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {accounts.length > 0 ? (
          <p className={styles.message}>No platform selected</p>
        ) : (
          <p className={styles.message}>No accounts available add acounts</p>
        )}
      </div>
    </div>
  );
}

export default NoPlatformSelected;
