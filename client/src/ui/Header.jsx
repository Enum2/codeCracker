import React from "react";
import styles from "./Header.module.css";
import { FaBars, FaMoon, FaPlus } from "react-icons/fa6";

function Header({ setSelectedPlatform, profile }) {
  function handlePlatformChange(event) {
    setSelectedPlatform(event.target.value);
  }
  console.log(profile.accounts);

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <FaBars className={styles.icon} />
        <select
          className={styles.platformSelect}
          onChange={handlePlatformChange}
        >
          {profile.accounts.map((account) => (
            <option key={account._id} value={account._id}>
              {account.accountName}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.rightSection}>
        <button className={styles.addPlatform}>
          <FaPlus className={styles.plusIcon} /> Add Platform
        </button>
      </div>
    </header>
  );
}

export default Header;
