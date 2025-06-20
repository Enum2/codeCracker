import  { useEffect, useState } from "react";
import styles from "./Profile.module.css";

const PlatformsModal = ({
  formData,
  platformLinks,
  isEditing,
  onClose,
  onEditToggle,
  onUpdate,
  onPlatformChange,
}) => {
  const [updatedLinks, setUpdatedLinks] = useState([]);
  useEffect(() => {
    if (platformLinks.length > 0 && updatedLinks.length === 0) {
      const accountsMap = {};
      formData?.accounts?.forEach((account) => {
        accountsMap[account.accountName] = account.accountUsername;
      });
      console.log(platformLinks)
      const filledPlatforms = platformLinks.map((platform) => ({
        ...platform,
        accountUsername: accountsMap[platform.accountName] || "",
      }));
      setUpdatedLinks(filledPlatforms);
    }
  }, [formData, platformLinks, updatedLinks.length]);

  const handleChange = (index, e) => {
    // console.log(updatedLinks)
    const newLinks = [...updatedLinks];
    newLinks[index].accountUsername = e.target.value;
    console.log(newLinks)
    // setUpdatedLinks(newLinks);
    onPlatformChange(index, e); 
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Problem Solving</h2>
          <div className={styles.modalActions}>
            {isEditing ? (
              <button
                className={`${styles.button} ${styles.saveButton}`}
                onClick={() => onUpdate(updatedLinks)}
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
            {updatedLinks.map((platform, index) => (
              <li key={index} className={styles.platformItem}>
                <h3 className={styles.platformName}>{platform.accountName}</h3>
                {isEditing ? (
                  <input
                    type="text"
                    className={styles.platformInput}
                    value={platform.accountUsername}
                    onChange={(e) => handleChange(index, e,platform)}
                    placeholder={`Enter ${platform.accountName} username`}
                  />
                ) : (
                  <span className={styles.platformLink}>
                    {platform.accountUsername || "No username set"}
                  </span>
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
