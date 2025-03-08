import React, { useState } from "react";
import styles from "./AccountTracker.module.css";
import Header from "../ui/Header";
import Account from "../features/DashBoard/Account";
import Sidebar from "../features/DashBoard/SideBar";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../features/DashBoard/getProfile.js";
import toast from "react-hot-toast";

function AccountTracker() {
  const [selectedPlatform, setSelectedPlatform] = useState("Codeforces");
  const userName = "sujal";
  const {
    isLoading,
    error,
    data: profile,
  } = useQuery({
    queryKey: ["profile", userName],
    queryFn: () => getProfile(userName),
  });

  if (isLoading) return <p className={styles.loading}>Loading profile...</p>;

  if (error) {
    toast.error("Failed to load profile!");
    return <p className={styles.error}>Error loading profile.</p>;
  }
  return (
    <div className={styles.container}>
      <Header setSelectedPlatform={setSelectedPlatform} profile={profile} />
      <div className={styles.content}>
        <Sidebar profile={profile} />
        <main className={styles.main}>
          <Account profile={profile} />
        </main>
      </div>
    </div>
  );
}

export default AccountTracker;
