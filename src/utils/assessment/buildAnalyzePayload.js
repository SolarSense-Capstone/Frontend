import { localToUSD } from "../currency/converter";

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
  other: "other",
};

// Map frontend keys to backend expected equipment types
const EQUIPMENT_KEY_MAP = {
  freezers: "freezer",
  refrigerators: "refrigerator",
  coldRoom: "cold_room",
  displayChillers: "display_chiller",
  iceMachines: "ice_machine",
  lighting: "lighting",
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

  const latitude = toNumberOrFallback(formData?.location?.latitude, null);
  const longitude = toNumberOrFallback(formData?.location?.longitude, null);

  const rawType = String(formData?.businessType || "").trim();
  const typeKey = rawType.toLowerCase();
  const businessType = BUSINESS_TYPE_MAP[typeKey] || rawType;

  const equipment = [];

  // Construct equipment array dynamically
  if (formData?.equipment) {
    Object.entries(formData.equipment).forEach(([key, item]) => {
      const quantity = toNumberOrFallback(item.quantity, 0);
      if (quantity > 0) {
        const hoursPerDay = clamp(toNumberOrFallback(item.hoursPerDay, 0), 0, 24);
        equipment.push({
          type: EQUIPMENT_KEY_MAP[key] || key,
          quantity,
          hoursPerDay,
        });
      }
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

    const localDieselPrice = clamp(
      toNumberOrFallback(formData?.energy?.diesel?.price_per_liter, 0),
      0,
      1000000, // expanded limit for local currencies
    );

    // Convert to USD before dispatching
    payload.diesel_price_per_liter = localToUSD(localDieselPrice, formData?.currencyCode);
  }

  console.log(" FULL PAYLOAD:", payload);
  return payload;
}
