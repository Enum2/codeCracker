export const getGFGProfile = async (req, res) => {
  const { handle } = req.params;
  const url = `https://geeks-for-geeks-api.vercel.app/${handle}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(await response.text());
      return res
        .status(response.status)
        .json({ error: "Profile not found or API error" });
    }
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error(`❌ Error fetching GFG profile: ${error.message}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};
