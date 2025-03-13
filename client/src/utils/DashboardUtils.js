export const formatPieChartData = (data) => {
  const colorMap = {
    Easy: "hsl(120, 70%, 50%)",
    Medium: "hsl(40, 70%, 50%)",
    Hard: "hsl(0, 70%, 50%)",
  };

  return data.acSubmissionNum
    .filter((item) => item.difficulty !== "All")
    .map((item) => ({
      id: item.difficulty,
      label: item.difficulty,
      value: item.count,
      color: colorMap[item.difficulty] || "hsl(200, 70%, 50%)",
    }));
};

export const getCalendarGrid = (startDate, endDate) => {
  const startingDate = new Date(startDate);
  const endingDate = new Date(endDate);

  const adjustedStartDate = new Date(startingDate);
  adjustedStartDate.setDate(startingDate.getDate() - startingDate.getDay());

  const adjustedEndDate = new Date(endingDate);
  adjustedEndDate.setDate(endingDate.getDate() + (6 - endingDate.getDay()));

  const daysInAdjustedRange =
    Math.ceil((adjustedEndDate - adjustedStartDate) / (1000 * 60 * 60 * 24)) +
    1;

  return Array.from({ length: daysInAdjustedRange }, (_, i) => {
    const date = new Date(adjustedStartDate);
    date.setDate(adjustedStartDate.getDate() + i);
    return {
      dateString: date.toLocaleDateString("en-CA"),
      month: date.toLocaleString("default", { month: "short" }),
      day: date.getDate(),
      isInOriginalRange: date >= startingDate && date <= endingDate,
    };
  });
};

export const getColorFromCount = (count) => {
  const colorCodes = {
    0: "#E0E0E0",
    1: "#FFD4B3",
    2: "#FFB98D",
    3: "#FFB98E",
    4: "#FFA366",
    5: "#FF8C3F",
    default: "#C24700",
  };
  return colorCodes[count] || colorCodes.default;
};

export const getMonthLabels = (calendarGrid) => {
  let monthLabels = [];
  let lastMonth = "";
  let currentStartIndex = 0;

  calendarGrid.forEach(({ month }, index) => {
    if (month !== lastMonth) {
      if (lastMonth) {
        monthLabels.push({
          month: lastMonth,
          index: currentStartIndex,
          span: index - currentStartIndex,
        });
      }
      lastMonth = month;
      currentStartIndex = index;
    }
  });

  if (lastMonth) {
    monthLabels.push({
      month: lastMonth,
      index: currentStartIndex,
      span: calendarGrid.length - currentStartIndex,
    });
  }

  return monthLabels;
};
