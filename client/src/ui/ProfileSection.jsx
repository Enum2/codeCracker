import React from "react";
import { motion } from "framer-motion";
import { FiUser } from "react-icons/fi";
import styles from "./ProfileSection.module.css";

const ProfileSection = () => (
  <motion.div
    className={styles.profileSection}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
  >
    <div className="flex flex-col items-center">
      <div className={styles.avatarContainer}>
        <div className={styles.avatarGradient}>
          <div className={styles.avatarInner} />
        </div>
        <div className={styles.onlineStatus} />
      </div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
        Jane Developer
      </h3>
      <p className="text-gray-500 dark:text-gray-400">@jane_codes</p>

      <div className="w-full mt-6 space-y-4">
        <h4 className={styles.platformsTitle}>Connected Platforms</h4>
        {["Codeforces", "LeetCode", "AtCoder", "CodeChef"].map((platform) => (
          <div key={platform} className={styles.platformItem}>
            <div className={styles.platformIcon}>
              <FiUser className="text-blue-500" />
            </div>
            <span className="text-gray-700 dark:text-gray-300">{platform}</span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

export default ProfileSection;
