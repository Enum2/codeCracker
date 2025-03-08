import React from "react";
import styles from "./Sidebar.module.css";
import { MdVerified } from "react-icons/md";
import { FaExclamationTriangle } from "react-icons/fa";
import LeetCode from "../../assets/leetcode_light.png";
import Codeforces from "../../assets/codeforces.png";

const Sidebar = ({ profile }) => {
  const platformLogos = {
    Codeforces: Codeforces,
    LeetCode: LeetCode,
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.profileSection}>
        <div className={styles.profilePic}></div>
        <div className={styles.textBox}></div>
        <div className={styles.accountCount}>
          {profile?.accounts.length} Accounts
        </div>
      </div>

      <div className={styles.statsSection}>
        <h3 className={styles.statsHeader}>Problem Solving Stats</h3>
        <ul className={styles.platformList}>
          {profile.accounts.map((account) => {
            const platformLogo = platformLogos[account.accountName];

            return (
              <li key={account._id} className={styles.account}>
                <div className={styles.accountTitle}>
                  <div className={styles.accountlogo}>
                    <img
                      className={styles.img}
                      src={platformLogo}
                      alt={account.accountName}
                    />
                    <b>{account.accountName}</b>
                  </div>
                  <div>
                    {account.isVerified ? (
                      <MdVerified color="blue" size={22} />
                    ) : (
                      <FaExclamationTriangle color="gray" size={20} />
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
