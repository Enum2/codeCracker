import React, { useState } from "react";
import styles from "./Profile.module.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "Sujol",
    lastName: "Suryawanshi",
    email: "sujolbz2018@gmail.com",
    country: "",
    college: "",
    degree: "",
    branch: "",
    graduationYear: "2025",
  });

  const [platformLinks, setPlatformLinks] = useState([
    { name: "Leetcode", url: "https://leetcode.com/u/enum2" },
    {
      name: "CodeStudio",
      url: "https://www.naukii.com/code360/profile/johndoe",
    },
    {
      name: "GeeksforGeeks",
      url: "https://www.geeksforgeeks.org/user/sujalbvd5m",
    },
    {
      name: "InterviewBit",
      url: "https://www.interviewbit.com/profile/johndoe",
    },
    { name: "Codechef", url: "https://www.codechef.com/users/enum2" },
    { name: "Codeforces", url: "https://codeforces.com/profile/enum2" },
    { name: "HackerRank", url: "https://www.hackerrank.com/profile/johndoe" },
    { name: "AtCoder", url: "https://atcoder.jp/users/johndoe" },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [showPlatformsModal, setShowPlatformsModal] = useState(false);
  const [isEditingPlatforms, setIsEditingPlatforms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlatformChange = (index, e) => {
    const { value } = e.target;
    const updatedLinks = [...platformLinks];
    updatedLinks[index].url = value;
    setPlatformLinks(updatedLinks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", formData);
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const togglePlatformsModal = () => {
    setShowPlatformsModal(!showPlatformsModal);
    setIsEditingPlatforms(false);
  };

  const handleUpdatePlatforms = () => {
    console.log("Platforms updated:", platformLinks);
    setIsEditingPlatforms(false);
    // Here you would typically send the updated platforms to your backend
  };

  return (
    <div className={styles.container}>
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
            onClick={togglePlatformsModal}
          >
            Problem Solving Platforms
          </button>
          <button
            className={`${styles.button} ${
              isEditing ? styles.cancelButton : styles.editButton
            }`}
            onClick={handleEditToggle}
          >
            {isEditing ? "Cancel" : "Update Profile"}
          </button>
        </div>
      </div>

      {/* Platforms Modal */}
      {showPlatformsModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Problem Solving</h2>
              <div className={styles.modalActions}>
                {isEditingPlatforms ? (
                  <button
                    className={`${styles.button} ${styles.saveButton}`}
                    onClick={handleUpdatePlatforms}
                  >
                    Update Platforms
                  </button>
                ) : (
                  <button
                    className={`${styles.button} ${styles.editButton}`}
                    onClick={() => setIsEditingPlatforms(true)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className={styles.closeButton}
                  onClick={togglePlatformsModal}
                >
                  &times;
                </button>
              </div>
            </div>
            <div className={styles.modalContent}>
              <ul className={styles.platformsList}>
                {platformLinks.map((platform, index) => (
                  <li key={index} className={styles.platformItem}>
                    <h3 className={styles.platformName}>{platform.name}</h3>
                    {isEditingPlatforms ? (
                      <input
                        type="url"
                        className={styles.platformInput}
                        value={platform.url}
                        onChange={(e) => handlePlatformChange(index, e)}
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
      )}

      {/* Rest of your profile form remains the same */}
      <form onSubmit={handleSubmit}>
        <div className={styles.card}>
          {/* Personal Information Section */}
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

          <div className={styles.divider}></div>

          {/* Education Section */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Education</h2>
            <div className={styles.formGroup}>
              <div className={styles.formRow}>
                <div className={styles.inputContainer}>
                  <label className={styles.label}>College *</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Search for your college"
                    value={formData.college}
                    onChange={handleChange}
                    name="college"
                    disabled={!isEditing}
                    required
                  />
                </div>
              </div>

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

              <div className={styles.formRow}>
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Year of Graduation *</label>
                  <input
                    type="number"
                    className={styles.input}
                    value={formData.graduationYear}
                    onChange={handleChange}
                    name="graduationYear"
                    min="1900"
                    max="2100"
                    placeholder="2025"
                    disabled={!isEditing}
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          {isEditing && (
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.saveButton}>
                Save Changes
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;
