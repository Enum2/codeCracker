import React, { useState } from "react";
import styles from "./AccountTracker.module.css";
import Header from "../ui/Header";
import Account from "../features/DashBoard/Account";
import Sidebar from "../features/DashBoard/SideBar";
import Loader from "../ui/Loader"; // Import Loader component
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../features/DashBoard/getProfile.js";
import toast from "react-hot-toast";
import { getAccountInfo } from "../features/DashBoard/getAccountInfo.js";
import { getContestInfo } from "../features/DashBoard/getContestInfo.js";

function AccountTracker() {
  const [selectedPlatform, setSelectedPlatform] = useState("Codeforces");
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

  const {
    isLoading: isGettingContestInfo,
    error: contestError,
    data: contestData,
  } = useQuery({
    queryKey: ["contest", selectedPlatform, accountUsername],
    queryFn: () =>
      getContestInfo(selectedPlatform.toLowerCase(), accountUsername),
    enabled: !!accountUsername,
  });

  console.log(`${selectedPlatform}`, accountData);

  if (isLoading) return <Loader />;

  if (error) {
    toast.error("Failed to load profile!");
    return <p className={styles.error}>Error loading profile.</p>;
  }

  return (
    <div className={styles.container}>
      <Header setSelectedPlatform={setSelectedPlatform} profile={profile} />
      <div className={styles.content}>
        {isGetting ? (
          <Loader />
        ) : (
          <>
            <Sidebar profile={profile} />
            <main className={styles.main}>
              <Account
                accountData={accountData}
                selectedPlatform={selectedPlatform}
              />
            </main>
          </>
        )}
      </div>
    </div>
  );
}

export default AccountTracker;
