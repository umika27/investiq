export const calculateRisk = (equity: number) => {
  if (equity > 70) return "High";
  if (equity > 40) return "Moderate";
  return "Low";
};