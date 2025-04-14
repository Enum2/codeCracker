import React, { useState } from "react";
import styles from "./Profile.module.css";
import PlatformsModal from "./PlatformsModal";
import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./ProfileForm";
import { IntialProfileData, platforms } from "../../utils/PlatFromData";

const ProfileSection = () => {
  const [formData, setFormData] = useState(IntialProfileData);
  const [platformLinks, setPlatformLinks] = useState(platforms);
  const [isEditing, setIsEditing] = useState(false);
  const [showPlatformsModal, setShowPlatformsModal] = useState(false);
  const [isEditingPlatforms, setIsEditingPlatforms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlatformChange = (index, e) => {
    const { value } = e.target;
    const updatedLinks = [...platformLinks];
    updatedLinks[index].url = value;
    setPlatformLinks(updatedLinks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", formData);
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const togglePlatformsModal = () => {
    setShowPlatformsModal(!showPlatformsModal);
    setIsEditingPlatforms(false);
  };

  const handleUpdatePlatforms = () => {
    console.log("Platforms updated:", platformLinks);
    setIsEditingPlatforms(false);
  };

  return (
    <div className={styles.container}>
      <ProfileHeader
        onTogglePlatforms={togglePlatformsModal}
        onEditToggle={handleEditToggle}
        isEditing={isEditing}
      />

      {showPlatformsModal && (
        <PlatformsModal
          platformLinks={platformLinks}
          isEditing={isEditingPlatforms}
          onClose={togglePlatformsModal}
          onEditToggle={() => setIsEditingPlatforms(!isEditingPlatforms)}
          onUpdate={handleUpdatePlatforms}
          onPlatformChange={handlePlatformChange}
        />
      )}

      <ProfileForm
        formData={formData}
        isEditing={isEditing}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ProfileSection;
