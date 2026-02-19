import React from "react";
import Typography from "../../ui/Typography";

export default function CountrySelect({ country, setCountry, countries }) {
  return (
    <div className="animate-slide-up opacity-0 animation-delay-100">
      <label htmlFor="country-select" className="block mb-2 px-1">
        <Typography
          variant="caption"
          className="font-bold text-gray-700 uppercase tracking-widest"
        >
          Country
        </Typography>
      </label>

      <select
        id="country-select"
        name="country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="w-full bg-white border border-gray-200 rounded-xl pl-4 pr-12 py-4 focus:ring-2 focus:ring-[#2E7D32] outline-none shadow-sm appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%23111827%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22m19%209-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[position:right_1rem_center] bg-no-repeat"
      >
        <option value="">Select country</option>
        {countries.map((c) => (
          <option key={c.name} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
