export default function formatMoney(value, currencySymbol = "$", decimals = 2) {
  if (value === null || value === undefined || Number.isNaN(Number(value)))
    return "—";
  return `${currencySymbol}${Number(value).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}
