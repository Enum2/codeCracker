export const formatPieChartDataLeetCode = (data) => {
  const colorMap = {
    Easy: "hsl(120, 70%, 50%)",
    Medium: "hsl(40, 70%, 50%)",
    Hard: "hsl(0, 70%, 50%)",
  };

  return data
    .filter((item) => item.difficulty !== "All")
    .map((item) => ({
      id: item.difficulty,
      label: item.difficulty,
      value: item.count,
      color: colorMap[item.difficulty] || "hsl(200, 70%, 50%)",
    }));
};
const difficultyMapping = [
  { id: "A", label: "A", range: [800, 1000], color: "hsl(200, 70%, 50%)" },
  { id: "B", label: "B", range: [1000, 1200], color: "hsl(250, 70%, 50%)" },
  { id: "C", label: "C", range: [1200, 1400], color: "hsl(300, 70%, 50%)" },
  { id: "D", label: "D", range: [1400, 1600], color: "hsl(50, 70%, 50%)" },
  { id: "E", label: "E", range: [1600, 1700], color: "hsl(100, 70%, 50%)" },
  { id: "F", label: "F", range: [1700, Infinity], color: "hsl(0, 70%, 50%)" },
];

export const formatPieChartDataCodeforces = (ratingWiseSolved) => {
  return difficultyMapping
    .map(({ id, label, range, color }) => {
      const value = Object.entries(ratingWiseSolved)
        .filter(([rating]) => rating >= range[0] && rating < range[1])
        .reduce((sum, [, count]) => sum + count, 0);

      return { id, label, value, color };
    })
    .filter((item) => item.value > 0);
};

function generateColor(index) {
  const hue = (index * 137) % 360; // Generate distinct colors
  return `hsl(${hue}, 70%, 50%)`;
}

export function transformDataSolvedPie(apiData) {
  let result = [];
  let index = 0;

  for (const [key, value] of Object.entries(apiData)) {
    result.push({
      id: key.toUpperCase().replace(/ /g, "_"), // Create an ID
      label: key, // Use original key as label
      value: value, // Assign value
      color: generateColor(index), // Assign a unique color
    });
    index++;
  }

  return result;
}
