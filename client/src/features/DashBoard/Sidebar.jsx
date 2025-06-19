import { useRef } from "react";
import { Camera } from "lucide-react";
import styles from "./Sidebar.module.css";
import leetcode from "../../assets/leetcode.png";
import codeforces from "../../assets/codeforces.png";
import codechef from "../../assets/codechef2.png";
import { onUpload } from "../profile/SupaBase.js";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Sidebar = ({ profile }) => {
  const fileInputRef = useRef(null);
  const userName = useSelector((state) => state.auth.user);
  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && onUpload) {
      const isSuccess = await onUpload(file, userName);
      if (isSuccess) {
        toast.success("Successfully uploaded photo");
        window.location.reload(); 
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const platformLogos = {
    codeforces: codeforces,
    leetcode: leetcode,
    codechef: codechef,
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.profileSection}>
        <div className={styles.profilePic} onClick={handlePhotoClick}>
          {profile?.profilepic ? (
            <img
              src={profile.profilepic}
              alt="Profile"
              className={styles.profileImage}
            />
            
          ) : (
            <Camera className={styles.uploadIcon} />
          )}

          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />

        </div>

        <div className={styles.textBox}>{profile?.username}</div>
        <div className={styles.accountCount}>
          <b>{profile?.accounts.length}</b> Accounts
        </div>
      </div>

      <div className={styles.statsSection}>
        <h3 className={styles.statsHeader}>Problem Solving Stats</h3>
        <ul className={styles.platformList}>
          {profile?.accounts.map((account) => {
            const platformLogo = platformLogos[account.accountName.toLowerCase()];
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
