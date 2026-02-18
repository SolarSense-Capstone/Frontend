export default function formatNumber(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value)))
    return "—";
  return `${Math.round(Number(value)).toLocaleString()}`;
}
