import React from "react";
import styles from "./Profile.module.css";

const EducationSection = ({ formData, isEditing, handleChange }) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Education</h2>
      <div className={styles.formGroup}>
        <CollegeInput
          value={formData.college}
          isEditing={isEditing}
          onChange={handleChange}
        />

        <DegreeAndBranchInputs
          formData={formData}
          isEditing={isEditing}
          handleChange={handleChange}
        />

        <GraduationYearInput
          value={formData.graduationYear}
          isEditing={isEditing}
          onChange={handleChange}
        />
      </div>
    </section>
  );
};

const CollegeInput = ({ value, isEditing, onChange }) => (
  <div className={styles.formRow}>
    <div className={styles.inputContainer}>
      <label className={styles.label}>College *</label>
      <input
        type="text"
        className={styles.input}
        placeholder="Search for your college"
        value={value}
        onChange={onChange}
        name="college"
        disabled={!isEditing}
        required
      />
    </div>
  </div>
);

const DegreeAndBranchInputs = ({ formData, isEditing, handleChange }) => (
  <div className={styles.formRow}>
    <div className={styles.inputContainer}>
      <label className={styles.label}>Degree *</label>
      <select
        className={styles.select}
        value={formData.degree}
        onChange={handleChange}
        name="degree"
        disabled={!isEditing}
        required
      >
        <option value="">Select a degree</option>
        <option value="BSc">Bachelor of Science</option>
        <option value="BA">Bachelor of Arts</option>
        <option value="BCom">Bachelor of Commerce</option>
      </select>
    </div>
    <div className={styles.inputContainer}>
      <label className={styles.label}>Branch *</label>
      <select
        className={styles.select}
        value={formData.branch}
        onChange={handleChange}
        name="branch"
        disabled={!isEditing}
        required
      >
        <option value="">Select your branch</option>
        <option value="CS">Computer Science</option>
        <option value="ME">Mechanical Engineering</option>
        <option value="EE">Electrical Engineering</option>
      </select>
    </div>
  </div>
);

const GraduationYearInput = ({ value, isEditing, onChange }) => (
  <div className={styles.formRow}>
    <div className={styles.inputContainer}>
      <label className={styles.label}>Year of Graduation *</label>
      <input
        type="number"
        className={styles.input}
        value={value}
        onChange={onChange}
        name="graduationYear"
        min="1900"
        max="2100"
        placeholder="2025"
        disabled={!isEditing}
        required
      />
    </div>
  </div>
);

export default EducationSection;
