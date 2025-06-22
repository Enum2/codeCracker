import Sidebar from "../../features/DashBoard/SideBar";
import Loader from "../../ui/Loader";
import Account from "../../features/DashBoard/Account";
import NoPlatformSelected from "../../ui/NoPlatformSleceted.jsx";
import { useQuery } from "@tanstack/react-query";
import { getAccountInfo } from "../../features/DashBoard/getAccountInfo";
import { getContestInfo } from "../../features/DashBoard/getContestInfo";
import styles from "./AccountTracker.module.css";

function TrackerContent({ profile, selectedPlatform }) {
  const account =
    profile?.accounts?.find(
      (acc) =>
        acc.accountName?.toLowerCase() === selectedPlatform?.toLowerCase()
    ) || null;
  //  console.log(profile)
  const accountUsername = account?.accountUsername?.toLowerCase() || null;

  const { isLoading: isGetting, data: accountData } = useQuery({
    queryKey: ["account", selectedPlatform, accountUsername],
    queryFn: () =>
      getAccountInfo(selectedPlatform.toLowerCase(), accountUsername),
    enabled: !!accountUsername,
  });

  useQuery({
    queryKey: ["contest", selectedPlatform, accountUsername],
    queryFn: () =>
      getContestInfo(selectedPlatform.toLowerCase(), accountUsername),
    enabled: !!accountUsername,
  });

  return (
    <div className={styles.content}>
      {isGetting ? (
        <Loader />
      ) : (
        <>
          <Sidebar profile={profile} />
          <main className={styles.main}>
            {selectedPlatform ? (
              <Account
                accountData={accountData}
                selectedPlatform={selectedPlatform}
              />
            ) : (
              <NoPlatformSelected accounts={profile?.accounts} />
            )}
          </main>
        </>
      )}
    </div>
  );
}

export default TrackerContent;
