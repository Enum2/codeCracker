export function getDateForHeatmap() {
  const today = new Date();
  const nineMonthsAgo = new Date();
  nineMonthsAgo.setMonth(today.getMonth() - 9);
  const formattedEndDate = today.toISOString().split("T")[0];
  const formattedStartDate = nineMonthsAgo.toISOString().split("T")[0];
  return { startDate: formattedStartDate, endDate: formattedEndDate };
}
