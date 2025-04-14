import React from "react";
import styles from "./Profile.module.css";
import PersonalInfoSection from "./PersonalInfoSection";
import EducationSection from "./EducationSection";

const ProfileForm = ({ formData, isEditing, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.card}>
        <PersonalInfoSection
          formData={formData}
          isEditing={isEditing}
          handleChange={handleChange}
        />
        <div className={styles.divider}></div>
        <EducationSection
          formData={formData}
          isEditing={isEditing}
          handleChange={handleChange}
        />
        {isEditing && <SaveButton />}
      </div>
    </form>
  );
};

const SaveButton = () => (
  <div className={styles.buttonContainer}>
    <button type="submit" className={styles.saveButton}>
      Save Changes
    </button>
  </div>
);

export default ProfileForm;
