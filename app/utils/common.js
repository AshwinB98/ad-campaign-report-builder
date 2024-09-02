export const calculateCPA = (totalSpend, totalConversions) => {
  return totalConversions ? totalSpend / totalConversions : 0;
};

export const calculateCTR = (totalClicks, totalImpressions) => {
  return totalImpressions ? (totalClicks / totalImpressions) * 100 : 0;
};

export const getBackgroundColor = () => [
  "rgba(255, 165, 0, 0.4)",
  "rgba(34, 139, 34, 0.4)",
  "rgba(30, 144, 255, 0.4)",
  "rgba(255, 99, 132, 0.4)",
  "rgba(255, 205, 86, 0.4)",
];

export const getBorderColor = () => [
  "rgba(255, 165, 0, 1)",
  "rgba(34, 139, 34, 1)",
  "rgba(30, 144, 255, 1)",
  "rgba(255, 99, 132, 1)",
  "rgba(255, 205, 86, 1)",
];
