import styles from "./AccountTracker.module.css";
import Header from "../../ui/Header";
import PlatformManager from "../Profile/PlatformManager";
import TrackerContent from "./TrackerContent";
import useAccountTracker from "./useAccountTracker";

function AccountTrackers() {
  const {
    profile,
    selectedPlatform,
    setSelectedPlatform,
    showModal,
    setShowModal,
    platformLinks,
    setPlatformLinks,
    isEditing,
    toggleEdit,
    updateProfileMutation,
    isLoading,
    error,
  } = useAccountTracker();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <p className={styles.error}>Error loading profile.</p>;

  return (
    <div className={styles.container}>
      <Header
        setSelectedPlatform={setSelectedPlatform}
        profile={profile}
        onAddPlatformClick={() => setShowModal(true)}
        selectedPlatform={selectedPlatform}
      />

      <TrackerContent
        profile={profile}
        selectedPlatform={selectedPlatform}
      />

      <PlatformManager
        show={showModal}
        formData={profile}
        platformLinks={platformLinks}
        setPlatformLinks={setPlatformLinks}
        isEditing={isEditing}
        toggleModal={() => setShowModal(false)}
        toggleEdit={toggleEdit}
        updateMutation={updateProfileMutation}
        user={profile?.userName}
      />
    </div>
  );
}

export default AccountTrackers;
