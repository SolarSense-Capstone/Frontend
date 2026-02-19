export default function statusColor(status) {
  if (status === "HIGHLY VIABLE")
    return { bg: "bg-green-50", text: "text-green-700", icon: "check_circle" };
  if (status === "MODERATELY VIABLE")
    return { bg: "bg-yellow-50", text: "text-yellow-700", icon: "info" };
  return { bg: "bg-red-50", text: "text-red-700", icon: "cancel" };
}
