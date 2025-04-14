import React from "react";
import styles from "./Profile.module.css";

const PersonalInfoSection = ({ formData, isEditing, handleChange }) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Personal Information</h2>
      <div className={styles.formGroup}>
        <div className={styles.formRow}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Codessy ID</label>
            <div className={styles.staticValue}>enum</div>
          </div>
        </div>

        <div className={styles.formRow}>
          <NameInputs
            formData={formData}
            isEditing={isEditing}
            handleChange={handleChange}
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.inputContainer}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              className={`${styles.input} ${styles.readOnly}`}
              value={formData.email}
              readOnly
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const NameInputs = ({ formData, isEditing, handleChange }) => (
  <>
    <div className={styles.inputContainer}>
      <label className={styles.label}>First Name *</label>
      <input
        type="text"
        className={styles.input}
        value={formData.firstName}
        onChange={handleChange}
        name="firstName"
        disabled={!isEditing}
        required
      />
    </div>
    <div className={styles.inputContainer}>
      <label className={styles.label}>Last Name</label>
      <input
        type="text"
        className={styles.input}
        value={formData.lastName}
        onChange={handleChange}
        name="lastName"
        disabled={!isEditing}
      />
    </div>
  </>
);

export default PersonalInfoSection;
