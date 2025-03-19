export function convertHeatmapToSubmissionCalendar(heatmapData) {
  const submissionCalendar = [];

  for (let date in heatmapData) {
    submissionCalendar.push({
      date: date,
      count: heatmapData[date],
    });
  }

  // Sort by date in ascending order
  submissionCalendar.sort((a, b) => new Date(a.date) - new Date(b.date));

  return submissionCalendar;
}
