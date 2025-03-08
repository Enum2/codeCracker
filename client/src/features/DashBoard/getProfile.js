import toast from "react-hot-toast";

export const getProfile = async (userName) => {
  try {
    console.log("Fetching profile for:", userName);

    const url = `http://localhost:5000/api/v1/profile/sujal`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorMessage = await response.text();
      toast.error("Failed to fetch profile");
      throw new Error(errorMessage || "Failed to fetch profile info");
    }

    return await response.json();
  } catch (error) {
    toast.error(error.message);
    console.error("Error fetching profile:", error);
    return null;
  }
};
