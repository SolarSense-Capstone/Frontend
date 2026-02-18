export default function formatMoney(value, currencySymbol = "$") {
  if (value === null || value === undefined || Number.isNaN(Number(value)))
    return "—";
  return `${currencySymbol}${Number(value).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })}`;
}
