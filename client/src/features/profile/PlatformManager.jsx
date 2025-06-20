import React from "react";
import PlatformsModal from "./PlatformsModal";
import { platfind } from "../../utils/PlatFromData";
import { useQueryClient } from "@tanstack/react-query";

const PlatformManager = ({
  show,
  formData,
  platformLinks,
  setPlatformLinks,
  isEditing,
  toggleModal,
  toggleEdit,
  updateMutation,
  user,
}) => {
  const queryClient = useQueryClient();

  const handlePlatformChange = (index, e) => {
    const { value } = e.target;
    const updatedLinks = [...platformLinks];
    updatedLinks[index].accountUsername = value;
    updatedLinks[index].accountName = platfind[index];
    setPlatformLinks(updatedLinks);
  };

  const handleUpdatePlatforms = () => {
  //  console.log(platformLinks) 
    const updatedAccounts = platformLinks
      .filter((acc) => acc.accountUsername?.trim()) 
      .map((acc) => ({
        accountName: acc.accountName,
        accountUsername: acc.accountUsername.trim(),
        isVerified: false, 
      }));
    const existingAccounts = formData?.accounts || [];
    const updatedAccountNames = updatedAccounts.map((acc) => acc.accountName);
    const mergedAccounts = [
      ...existingAccounts.filter((acc) => !updatedAccountNames.includes(acc.accountName)),
      ...updatedAccounts,
    ];
    updateMutation.mutate({ userName: user, accounts: mergedAccounts }, {
      onSuccess: () => {
        queryClient.invalidateQueries(["profile", user]);
        toggleModal();
      },
      onError: (error) => {
        console.error("Error updating account data:", error);
      },
    });
  };

  if (!show) return null;

  return (
    <PlatformsModal
      formData={formData}
      platformLinks={platformLinks}
      isEditing={isEditing}
      onClose={toggleModal}
      onEditToggle={toggleEdit}
      onUpdate={handleUpdatePlatforms}
      onPlatformChange={handlePlatformChange}
    />
  );
};

export default PlatformManager;
