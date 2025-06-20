import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import toast from "react-hot-toast";
import styles from "./AccountTracker.module.css";
import Header from "../ui/Header";
import Account from "../features/DashBoard/Account";
import Sidebar from "../features/DashBoard/SideBar";
import Loader from "../ui/Loader";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getProfile } from "../features/DashBoard/getProfile";
import { getAccountInfo } from "../features/DashBoard/getAccountInfo";
import { getContestInfo } from "../features/DashBoard/getContestInfo";
import PlatformManager from "../features/Profile/PlatformManager";
import { platforms } from "../utils/PlatFromData";
import NoPlatformSelected from "./../ui/NoPlatformSleceted.jsx"
import axios from "axios";

function AccountTracker() {
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [platformLinks, setPlatformLinks] = useState(platforms);
  const userName = useSelector((state) => state.auth.user);
  const { isLoading, error, data: profile } = useQuery({
    queryKey: ["profile", userName],
    queryFn: () => getProfile(userName),
  });

  useEffect(() => {
    if (profile?.accounts?.length === 1 && !selectedPlatform) {
      setSelectedPlatform(profile.accounts[0].accountName);
    }
  }, [profile, selectedPlatform]);

  const account =
    profile?.accounts?.find(
      (acc) => acc.accountName?.toLowerCase() === selectedPlatform?.toLowerCase()
    ) || null;

  const accountUsername = account?.accountUsername?.toLowerCase() || null;

  const { isLoading: isGetting, data: accountData } = useQuery({
    queryKey: ["account", selectedPlatform, accountUsername],
    queryFn: () => getAccountInfo(selectedPlatform.toLowerCase(), accountUsername),
    enabled: !!accountUsername,
  });

  const { isLoading: isGettingContestInfo, data: contestData } = useQuery({
    queryKey: ["contest", selectedPlatform, accountUsername],
    queryFn: () => getContestInfo(selectedPlatform.toLowerCase(), accountUsername),
    enabled: !!accountUsername,
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post("http://localhost:5000/api/v1/profile/update", data);
      return res.data;
    },
    onSuccess: () => toast.success("Platforms updated"),
    onError: (error) => toast.error(error?.response?.data?.error || "Update failed"),
  });

  if (isLoading) return <Loader />;
  if (error) {
    toast.error("Failed to load profile!");
    return <p className={styles.error}>Error loading profile.</p>;
  }

  return (
    <div className={styles.container}>
      <Header
        setSelectedPlatform={setSelectedPlatform}
        profile={profile}
        onAddPlatformClick={() => setShowModal(true)}
        selectedPlatform={selectedPlatform}
      />

      <div className={styles.content}>
  {isGetting ? (
    <Loader />
  ) : (
    <>
      <Sidebar profile={profile} />
      <main className={styles.main}>
        {selectedPlatform ? (
          <Account accountData={accountData} selectedPlatform={selectedPlatform} />
        ) : (
          <NoPlatformSelected accounts={profile?.accounts} />
        )}
      </main>
    </>
  )}
</div>


      <PlatformManager
        show={showModal}
        formData={profile}
        platformLinks={platformLinks}
        setPlatformLinks={setPlatformLinks}
        isEditing={isEditing}
        toggleModal={() => setShowModal(false)}
        toggleEdit={() => setIsEditing((prev) => !prev)}
        updateMutation={updateProfileMutation}
        user={userName}
      />
    </div>
  );
}

export default AccountTracker;
