export async function updateProfile({ userName, profilepic }) {
  const url = 'http://localhost:5000/api/v1/profile/update';
  try {
    const response = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName,
        profilepic, 
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Failed to update profile:', data.error);
      return false;
    }

    console.log('Profile updated:', data.message);
    return true;
  } catch (error) {
    console.error('Error updating profile:', error.message);
    return false;
  }
}
