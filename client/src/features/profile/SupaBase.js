import supabase from "../../utils/Supabase";
import { updateProfile } from "./updateProfile";

// Upload profile picture to Supabase Storage
export async function uploadProfilePicture(file, userId) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}.${fileExt}`;
  const filePath = `profilepic/${fileName}`;

  const { data, error } = await supabase.storage
    .from('profilepic')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    console.error('Upload failed:', error.message);
    return null;
  }

  return filePath;
}

// Get public URL of a file in Supabase Storage
export function getPublicUrl(filePath) {
  const { data } = supabase.storage
    .from('profilepic')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// Main upload handler
export async function onUpload(file, userId) {
  console.log('Uploading file:', file);

  const filePath = await uploadProfilePicture(file, userId);

  if (!filePath) {
    console.error('Failed to upload the profile picture.');
    return false;
  }

  const publicUrl = getPublicUrl(filePath);

  const isDatabaseUpdated = await updateProfile({ userName:userId, profilepic: publicUrl });

  return isDatabaseUpdated;
}
