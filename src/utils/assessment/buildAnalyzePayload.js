const BUSINESS_TYPE_MAP = {
  restaurant: "Restaurant",
  retail: "Retail",
  office: "Office",
  hotel: "Hotel",
  gym: "Gym",
  bakery: "Bakery",
  butchery: "butchery",
  grocery: "grocery",
  mini_supermarket: "mini_supermarket",
  cafe: "Cafe",
};

function toNumberOrFallback(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function sanitizeBusinessName(name) {
  return String(name || "")
    .replace(/[^a-zA-Z0-9 _\-&/]/g, "")
    .trim();
}

export default function buildAnalyzePayload(formData) {
  const country = (formData?.location?.country || "").trim();
  const city = (formData?.location?.city || "").trim();

  const latitude = toNumberOrFallback(formData?.location?.latitude, 6.4969);
  const longitude = toNumberOrFallback(formData?.location?.longitude, 3.3553);

  const rawType = String(formData?.businessType || "").trim();
  const typeKey = rawType.toLowerCase();
  const businessType = BUSINESS_TYPE_MAP[typeKey] || rawType;

  const equipment = [];
  const hoursPerDay = clamp(
    toNumberOrFallback(formData?.equipment?.operatingHours, 24),
    0,
    24,
  );

  const fridgesQty = toNumberOrFallback(
    formData?.equipment?.refrigerators?.quantity,
    0,
  );
  if (fridgesQty > 0) {
    equipment.push({
      type: "refrigerator",
      quantity: fridgesQty,
      hoursPerDay,
    });
  }

  const freezersQty = toNumberOrFallback(
    formData?.equipment?.freezers?.quantity,
    0,
  );
  if (freezersQty > 0) {
    equipment.push({
      type: "freezer",
      quantity: freezersQty,
      hoursPerDay,
    });
  }

  const coldRoomQty = toNumberOrFallback(
    formData?.equipment?.coldRoom?.quantity,
    0,
  );
  if (coldRoomQty > 0) {
    equipment.push({
      type: "cold_room",
      quantity: coldRoomQty,
      hoursPerDay,
    });
  }

  const uses_diesel = !!formData?.energy?.uses_diesel;

  const payload = {
    business_name: sanitizeBusinessName(formData?.businessName || "Business"),
    businessType,
    country,
    city,
    latitude,
    longitude,

    equipment,

    uses_diesel,
  };

  if (uses_diesel) {
    payload.diesel_hours_per_day = clamp(
      toNumberOrFallback(formData?.energy?.diesel?.hours_per_day, 0),
      0,
      24,
    );

    payload.diesel_price_per_liter = clamp(
      toNumberOrFallback(formData?.energy?.diesel?.price_per_liter, 0),
      0,
      10,
    );
  }

  console.log(" FULL PAYLOAD:", payload);
  return payload;
}
