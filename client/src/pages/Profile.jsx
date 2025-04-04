import React, { useState } from "react";
import styles from "./Profile.module.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "Sujol",
    lastName: "Suryawanshi",
    email: "sujolbz2018@gmail.com",
    bio: "",
    country: "",
    college: "",
    degree: "",
    branch: "",
    graduationYear: "2025",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Basic Info</h1>
      <p className={styles.subtitle}>You can manage your details here.</p>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Basic Details</h2>
        <div className={styles.detailGrid}>
          <div className={styles.gridRow}>
            <span className={styles.label}>Codolic Id:</span>
            <span className={styles.value}>enum</span>
          </div>
          <div className={styles.gridRow}>
            <div className={styles.nameGroup}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>First Name *</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.firstName}
                  onChange={handleChange}
                  name="firstName"
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Last Name</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.lastName}
                  onChange={handleChange}
                  name="lastName"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Email</h3>
        <div className={styles.inputGroup}>
          <input
            type="email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
            name="email"
            readOnly
          />
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Bio (Max 200 Characters)</h3>
        <div className={styles.inputGroup}>
          <textarea
            className={styles.textarea}
            value={formData.bio}
            onChange={handleChange}
            name="bio"
            maxLength="200"
          />
          <div className={styles.charCount}>{formData.bio.length}/200</div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Country</label>
          <select
            className={styles.select}
            value={formData.country}
            onChange={handleChange}
            name="country"
          >
            <option value="">Select a country</option>
            <option value="USA">United States</option>
            <option value="IND">India</option>
            <option value="UK">United Kingdom</option>
          </select>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Educational Details</h2>

        <div className={styles.inputGroup}>
          <label className={styles.label}>College *</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Search for your college"
            value={formData.college}
            onChange={handleChange}
            name="college"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Degree *</label>
          <select
            className={styles.select}
            value={formData.degree}
            onChange={handleChange}
            name="degree"
          >
            <option value="">Select a degree</option>
            <option value="BSc">Bachelor of Science</option>
            <option value="BA">Bachelor of Arts</option>
            <option value="BCom">Bachelor of Commerce</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Branch *</label>
          <select
            className={styles.select}
            value={formData.branch}
            onChange={handleChange}
            name="branch"
          >
            <option value="">Select your branch</option>
            <option value="CS">Computer Science</option>
            <option value="ME">Mechanical Engineering</option>
            <option value="EE">Electrical Engineering</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Year of Graduation *</label>
          <input
            type="number"
            className={styles.input}
            value={formData.graduationYear}
            onChange={handleChange}
            name="graduationYear"
            min="1900"
            max="2100"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
