import React, { useState } from "react";
import styles from "./AccountTracker.module.css";
import Header from "../ui/Header";
import Account from "../features/DashBoard/Account";
import Sidebar from "../features/DashBoard/SideBar";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../features/DashBoard/getProfile.js";
import toast from "react-hot-toast";
import { getAccountInfo } from "../features/DashBoard/getAccountInfo.js";

function AccountTracker() {
  const [selectedPlatform, setSelectedPlatform] = useState("Leetcode");
  const userName = "sujal1";

  const {
    isLoading,
    error,
    data: profile,
  } = useQuery({
    queryKey: ["profile", userName],
    queryFn: () => getProfile(userName),
  });

  const account =
    profile?.accounts?.find(
      (acc) => acc.accountName.toLowerCase() === selectedPlatform.toLowerCase()
    ) || null;

  const accountUsername = account
    ? account.accountUsername.toLowerCase()
    : null;
  // console.log(accountUsername);

  const {
    isLoading: isGetting,
    error: accError,
    data: accountData,
  } = useQuery({
    queryKey: ["account", selectedPlatform, accountUsername],
    queryFn: () =>
      getAccountInfo(selectedPlatform.toLowerCase(), accountUsername),
    enabled: !!accountUsername,
  });
  console.log(accountData);

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
          <Account accountData={accountData} />
        </main>
      </div>
    </div>
  );
}

export default AccountTracker;
