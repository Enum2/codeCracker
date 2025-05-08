import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import PlatformsModal from "./PlatformsModal";
import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./ProfileForm";
import { platforms } from "../../utils/PlatFromData";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../DashBoard/getProfile";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { loginSuccess } from "../../store/authStore";


const ProfileSection = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const {
    isLoading,
    error,
    data: profile,
  } = useQuery({
    queryKey: ["profile", user],
    queryFn: () => getProfile(user),
    enabled: !!user, // ensures query runs only if user exists
  });

  const [formData, setFormData] = useState(null);
  const [platformLinks, setPlatformLinks] = useState(platforms);
  const [isEditing, setIsEditing] = useState(false);
  const [showPlatformsModal, setShowPlatformsModal] = useState(false);
  const [isEditingPlatforms, setIsEditingPlatforms] = useState(false);

  useEffect(() => {
    if (profile) {
      const profilinfo = {
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || `${user}@gmail.com`,
        country: profile.country || "",
        college: profile.college || "",
        degree: profile.degree || "",
        branch: profile.branch || "",
        graduationYear: profile.yearofGraduation ?? 2027,
        userName: user,
      };
      setFormData(profilinfo);
    }
  }, [profile, user]);

  const updateProfileMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post("http://localhost:5000/api/v1/profile/update", data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Profile updated!");
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error || "Update failed");
    },
  });

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
    if (!formData) return;

    const cleanedProfile = {
      userName: formData.userName || "",
      email: formData.email || "",
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      country: formData.country || "",
      college: formData.college || "",
      degree: formData.degree || "",
      branch: formData.branch || "",
      bio: "",
      graduationYear: formData.graduationYear ?? 2027,
      yearofGraduation: null,
    };

    updateProfileMutation.mutate(cleanedProfile);
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  const togglePlatformsModal = () => {
    setShowPlatformsModal(!showPlatformsModal);
    setIsEditingPlatforms(false);
  };

  const handleUpdatePlatforms = () => {
    console.log("Platforms updated:", platformLinks);
    setIsEditingPlatforms(false);
  };

  if (isLoading || !formData) return <div className={styles.container}>Loading...</div>;
  if (error) return <div className={styles.container}>Error loading profile.</div>;

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
