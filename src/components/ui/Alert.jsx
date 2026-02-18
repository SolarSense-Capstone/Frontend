import Card from "./Card.jsx";
import Typography from "./Typography.jsx";

export default function Alert({ title, message, variant = "error" }) {
  const styles =
    variant === "error"
      ? "border-red-200 bg-red-50 text-red-800"
      : variant === "warn"
        ? "border-yellow-200 bg-yellow-50 text-yellow-800"
        : "border-green-200 bg-green-50 text-green-800";

  return (
    <Card className={`p-4 border ${styles}`}>
      <Typography variant="body1" className="font-bold">
        {title}
      </Typography>
      <Typography variant="caption" className="mt-1">
        {message}
      </Typography>
    </Card>
  );
}
