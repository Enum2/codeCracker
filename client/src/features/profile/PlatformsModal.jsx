import React from "react";
import styles from "./Profile.module.css";

const PlatformsModal = ({
  platformLinks,
  isEditing,
  onClose,
  onEditToggle,
  onUpdate,
  onPlatformChange,
}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Problem Solving</h2>
          <div className={styles.modalActions}>
            {isEditing ? (
              <button
                className={`${styles.button} ${styles.saveButton}`}
                onClick={onUpdate}
              >
                Update Platforms
              </button>
            ) : (
              <button
                className={`${styles.button} ${styles.editButton}`}
                onClick={onEditToggle}
              >
                Edit
              </button>
            )}
            <button className={styles.closeButton} onClick={onClose}>
              &times;
            </button>
          </div>
        </div>
        <div className={styles.modalContent}>
          <ul className={styles.platformsList}>
            {platformLinks.map((platform, index) => (
              <li key={index} className={styles.platformItem}>
                <h3 className={styles.platformName}>{platform.name}</h3>
                {isEditing ? (
                  <input
                    type="url"
                    className={styles.platformInput}
                    value={platform.url}
                    onChange={(e) => onPlatformChange(index, e)}
                    placeholder={`Enter ${platform.name} profile URL`}
                  />
                ) : (
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.platformLink}
                  >
                    {platform.url}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlatformsModal;
