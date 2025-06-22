import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getProfile } from "../../features/DashBoard/getProfile";
import { platforms } from "../../utils/PlatFromData";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function useAccountTracker() {
  const navigate = useNavigate();
  const userName = useSelector((state) => state.auth.user);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [platformLinks, setPlatformLinks] = useState(platforms);

  useEffect(() => {
    if (!userName) {
      navigate("/login");
    }
  }, [userName, navigate]);

  const { isLoading, error, data: profile } = useQuery({
    queryKey: ["profile", userName],
    queryFn: () => getProfile(userName),
    enabled: !!userName,
  });

  useEffect(() => {
    if (profile?.accounts?.length === 1 && !selectedPlatform) {
      setSelectedPlatform(profile.accounts[0].accountName);
    }
  }, [profile, selectedPlatform]);

  const updateProfileMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post("http://localhost:5000/api/v1/profile/update", data);
      return res.data;
    },
    onSuccess: () => toast.success("Platforms updated"),
    onError: (error) =>
      toast.error(error?.response?.data?.error || "Update failed"),
  });

  return {
    profile,
    selectedPlatform,
    setSelectedPlatform,
    showModal,
    setShowModal,
    platformLinks,
    setPlatformLinks,
    isEditing,
    toggleEdit: () => setIsEditing((prev) => !prev),
    updateProfileMutation,
    isLoading,
    error,
  };
}

export default useAccountTracker;
