import React from "react";
import styles from "./Profile.module.css";

const ProfileHeader = ({ onTogglePlatforms, onEditToggle, isEditing }) => {
  return (
    <div className={styles.header}>
      <div>
        <h1 className={styles.title}>Profile Settings</h1>
        <p className={styles.subtitle}>
          Manage your personal and educational information
        </p>
      </div>
      <div className={styles.buttonGroup}>
        <button
          className={`${styles.button} ${styles.platformsButton}`}
          onClick={onTogglePlatforms}
        >
          Problem Solving Platforms
        </button>
        <button
          className={`${styles.button} ${
            isEditing ? styles.cancelButton : styles.editButton
          }`}
          onClick={onEditToggle}
        >
          {isEditing ? "Cancel" : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
