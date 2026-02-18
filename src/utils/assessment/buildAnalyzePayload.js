// src/utils/assessment/buildAnalyzePayload.js
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
};

function toNumberOrFallback(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export default function buildAnalyzePayload(formData) {
  const country = (formData?.location?.country || "").trim();
  const city = (formData?.location?.city || "").trim();

  // IMPORTANT: don't allow NaN
  const latitude = toNumberOrFallback(formData?.location?.latitude, 6.4969);
  const longitude = toNumberOrFallback(formData?.location?.longitude, 3.3553);

  // businessType must match allowed list casing
  const rawType = (formData?.businessType || "").trim();
  const businessType = BUSINESS_TYPE_MAP[rawType] || rawType; // if already "Restaurant", keep it

  // equipment_list format (as you’re already sending)
  const equipment_list = [];

  const hours = toNumberOrFallback(formData?.equipment?.operatingHours, 24);

  const fridgesQty = toNumberOrFallback(
    formData?.equipment?.refrigerators?.quantity,
    0,
  );
  if (fridgesQty > 0) {
    equipment_list.push({
      equipment_type: "refrigerator",
      quantity: fridgesQty,
      hours_per_day: hours,
    });
  }

  const freezersQty = toNumberOrFallback(
    formData?.equipment?.freezers?.quantity,
    0,
  );
  if (freezersQty > 0) {
    equipment_list.push({
      equipment_type: "freezer",
      quantity: freezersQty,
      hours_per_day: hours,
    });
  }

  const coldRoomQty = toNumberOrFallback(
    formData?.equipment?.coldRoom?.quantity,
    0,
  );
  if (coldRoomQty > 0) {
    equipment_list.push({
      equipment_type: "cold_room",
      quantity: coldRoomQty,
      hours_per_day: hours,
    });
  }

  const uses_diesel = !!formData?.energy?.uses_diesel;

  const payload = {
    business_name: (formData?.businessName || "").trim(),
    businessType, // ✅ required key
    country, // ✅ required key
    city, // ✅ required key
    latitude, // ✅ must be valid number
    longitude, // ✅ must be valid number
    equipment_list, // ✅ correct key
    uses_diesel,
  };

  // If uses_diesel=true, you MUST send valid diesel fields (and within ranges)
  if (uses_diesel) {
    payload.diesel_hours_per_day = toNumberOrFallback(
      formData?.energy?.diesel?.hours_per_day,
      0,
    );
    payload.diesel_price_per_liter = toNumberOrFallback(
      formData?.energy?.diesel?.price_per_liter,
      0,
    );
  }

  return payload;
}
