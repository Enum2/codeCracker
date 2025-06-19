import styles from "./Header.module.css";
import { FaBars, FaPlus } from "react-icons/fa6";

function Header({ setSelectedPlatform, profile, onAddPlatformClick, selectedPlatform }) {
  function handlePlatformChange(event) {
    setSelectedPlatform(event.target.value);
  }

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <FaBars className={styles.icon} />
        <select
          className={styles.platformSelect}
          onChange={handlePlatformChange}
          value={selectedPlatform || ""}
        >
          <option value="" disabled>Select Platform</option>
          {profile?.accounts.map((account) => (
            <option key={account._id} value={account.accountName}>
              {account.accountName}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.rightSection}>
        <button className={styles.addPlatform} onClick={onAddPlatformClick}>
          <FaPlus className={styles.plusIcon} /> Add Platform
        </button>
      </div>
    </header>
  );
}

export default Header;
