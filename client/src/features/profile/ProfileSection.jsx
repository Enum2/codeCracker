import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./ProfileForm";
import PlatformManager from "./PlatformManager";
import { platforms } from "../../utils/PlatFromData";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile } from "../DashBoard/getProfile";
import axios from "axios";
import toast from "react-hot-toast";

const ProfileSection = () => {
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState(null);
  const [platformLinks, setPlatformLinks] = useState(platforms);
  const [isEditing, setIsEditing] = useState(false);
  const [showPlatformsModal, setShowPlatformsModal] = useState(false);
  const [isEditingPlatforms, setIsEditingPlatforms] = useState(false);

  const { isLoading, error, data: profile } = useQuery({
    queryKey: ["profile", user],
    queryFn: () => getProfile(user),
    enabled: !!user,
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        accounts: profile.accounts || [],
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || `${user}@gmail.com`,
        country: profile.country || "",
        college: profile.college || "",
        degree: profile.degree || "",
        branch: profile.branch || "",
        graduationYear: profile.yearofGraduation ?? 2027,
        userName: user,
      });
    }
  }, [profile, user]);

  const updateProfileMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post("http://localhost:5000/api/v1/profile/update", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Profile updated!");
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error || "Update failed");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData) return;

    const cleanedProfile = {
      userName: formData.userName,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      country: formData.country,
      college: formData.college,
      degree: formData.degree,
      branch: formData.branch,
      graduationYear: formData.graduationYear,
    };

    updateProfileMutation.mutate(cleanedProfile);
  };

  const togglePlatformsModal = () => {
    setShowPlatformsModal(!showPlatformsModal);
    setIsEditingPlatforms(false);
  };

  if (isLoading || !formData) return <div className={styles.container}>Loading...</div>;
  if (error) return <div className={styles.container}>Error loading profile.</div>;

  return (
    <div className={styles.container}>
      <ProfileHeader
        onTogglePlatforms={togglePlatformsModal}
        onEditToggle={() => setIsEditing((prev) => !prev)}
        isEditing={isEditing}
      />

      <ProfileForm
        formData={formData}
        isEditing={isEditing}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <PlatformManager
        show={showPlatformsModal}
        formData={formData}
        platformLinks={platformLinks}
        setPlatformLinks={setPlatformLinks}
        isEditing={isEditingPlatforms}
        toggleModal={togglePlatformsModal}
        toggleEdit={() => setIsEditingPlatforms((prev) => !prev)}
        updateMutation={updateProfileMutation}
        user={user}
      />
    </div>
  );
};

export default ProfileSection;
  