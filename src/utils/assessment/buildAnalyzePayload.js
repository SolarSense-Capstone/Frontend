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
  frozen_food_retail: "Retail",
  cold_storage: "Retail",
  cafe: "Cafe",
  other: "other",
};

// Map frontend state keys to backend expected equipment types
const EQUIPMENT_KEY_MAP = {
  freezers: "freezer",
  refrigerators: "refrigerator",
  coldRoom: "cold_room",
  displayCoolers: "display_chiller",
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

// Default coordinates for supported countries (capital city approximate center)
const COUNTRY_COORDS = {
  "Nigeria": { lat: 6.5244, lon: 3.3792 }, // Lagos
  "Ghana": { lat: 5.6037, lon: -0.1870 }, // Accra
  "Kenya": { lat: -1.2921, lon: 36.8219 }, // Nairobi
  "South Africa": { lat: -25.7461, lon: 28.1881 }, // Pretoria
  "Ethiopia": { lat: 9.0320, lon: 38.7469 }, // Addis Ababa
  "Uganda": { lat: 0.3476, lon: 32.5825 }, // Kampala
  "Tanzania": { lat: -6.7924, lon: 39.2083 }, // Dar es Salaam
  "Rwanda": { lat: -1.9706, lon: 30.1044 }, // Kigali
};

export default function buildAnalyzePayload(formData) {
  const country = (formData?.location?.country || "").trim();
  const city = (formData?.location?.city || "").trim();

  // Try to use stored coordinates; fall back to country capital coords
  const defaultCoords = COUNTRY_COORDS[country] || { lat: 0, lon: 0 };
  const latitude = toNumberOrFallback(formData?.location?.latitude, defaultCoords.lat);
  const longitude = toNumberOrFallback(formData?.location?.longitude, defaultCoords.lon);

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
