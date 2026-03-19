import React, { useState, useMemo } from "react";
import BackNav from "../components/common/BackNav";
import StickyContinue from "../components/common/StickyContinue";
import ProgressBar from "../components/common/ProgressBar";
import StepIntro from "../components/assessment/business-context/StepIntro";
import ScenarioSelector from "../components/assessment/energy-context/ScenarioSelector";
import DieselDetails from "../components/assessment/energy-context/DieselDetails";

const COUNTRIES = [
    { name: "Nigeria", currency: "₦", code: "NGN" },
    { name: "Ghana", currency: "GH₵", code: "GHS" },
    { name: "Kenya", currency: "KSh", code: "KES" },
    { name: "South Africa", currency: "R", code: "ZAR" },
    { name: "Ethiopia", currency: "Br", code: "ETB" },
    { name: "Uganda", currency: "USh", code: "UGX" },
    { name: "Tanzania", currency: "TSh", code: "TZS" },
    { name: "Rwanda", currency: "FRw", code: "RWF" },
];

const SCENARIOS = [
    {
        id: "grid_only",
        label: "Fully on grid",
        icon: "bolt",
    },
    {
        id: "diesel_replacement",
        label: "Grid + diesel generator",
        icon: "local_gas_station",
    },
];

const CITY_COORDINATES = {
    // Nigeria
    "Lagos": { lat: 6.4969, lng: 3.3553 },
    "Abuja": { lat: 9.0765, lng: 7.3986 },
    "Kano": { lat: 12.0022, lng: 8.5920 },
    "Ibadan": { lat: 7.3775, lng: 3.9470 },
    "Port Harcourt": { lat: 4.8156, lng: 7.0498 },
    // Ghana
    "Accra": { lat: 5.6037, lng: -0.1870 },
    "Kumasi": { lat: 6.6666, lng: -1.6125 },
    // Kenya
    "Nairobi": { lat: -1.2921, lng: 36.8219 },
    "Mombasa": { lat: -4.0435, lng: 39.6682 },
    // South Africa
    "Johannesburg": { lat: -26.2041, lng: 28.0473 },
    "Cape Town": { lat: -33.9249, lng: 18.4241 },
};

export default function BusinessLocationScreen({
    initialLocation,
    initialEnergy,
    onContinue,
    onBack,
}) {
    const [country, setCountry] = useState(initialLocation?.country || "");
    const [state, setState] = useState(initialLocation?.state || "");
    const [city, setCity] = useState(initialLocation?.city || "");
    const [address, setAddress] = useState(initialLocation?.address || "");

    const [scenario, setScenario] = useState(initialEnergy?.energy_scenario || null);
    const [dieselHoursPerDay, setDieselHoursPerDay] = useState(
        initialEnergy?.diesel?.hours_per_day || ""
    );
    const [dieselPricePerLiter, setDieselPricePerLiter] = useState(
        initialEnergy?.diesel?.price_per_liter || ""
    );

    const selectedCountry = COUNTRIES.find((c) => c.name === country);
    const currency = selectedCountry ? selectedCountry.currency : "";
    const currencyCode = selectedCountry ? selectedCountry.code : "";

    const showDiesel = scenario === "diesel_replacement";
    const isLocationValid = country && city;

    const isEnergyValid = useMemo(() => {
        if (!scenario) return false;
        if (showDiesel) {
            const h = Number(dieselHoursPerDay);
            const p = Number(dieselPricePerLiter);
            if (Number.isNaN(h) || h <= 0 || h > 24) return false;
            if (Number.isNaN(p) || p <= 0) return false;
        }
        return true;
    }, [scenario, showDiesel, dieselHoursPerDay, dieselPricePerLiter]);

    const isValid = isLocationValid && isEnergyValid;

    const handleContinue = () => {
        if (!isValid) return;

        const normalizedCity = city.trim();
        let coords = CITY_COORDINATES[normalizedCity];

        // Provide default capital city coordinates if selected city is unmapped
        if (!coords) {
            const countryDefaults = {
                "Nigeria": CITY_COORDINATES["Lagos"],
                "Ghana": CITY_COORDINATES["Accra"],
                "Kenya": CITY_COORDINATES["Nairobi"],
                "South Africa": CITY_COORDINATES["Johannesburg"],
                "Ethiopia": { lat: 9.0054, lng: 38.7636 }, // Addis Ababa
                "Uganda": { lat: 0.3476, lng: 32.5825 }, // Kampala
                "Tanzania": { lat: -6.7924, lng: 39.2083 }, // Dar es Salaam
                "Rwanda": { lat: -1.9441, lng: 30.0619 }, // Kigali
            };
            coords = countryDefaults[country] || CITY_COORDINATES["Lagos"];
        }

        const locationObj = {
            country,
            state,
            city,
            address,
            latitude: coords.lat,
            longitude: coords.lng
        };

        const energyObj = {
            energy_scenario: scenario,
            uses_diesel: scenario === "diesel_replacement",
            currency: currencyCode || "USD",
            diesel:
                scenario === "diesel_replacement"
                    ? {
                        hours_per_day: Number(dieselHoursPerDay),
                        price_per_liter: Number(dieselPricePerLiter),
                    }
                    : null,
        };
        onContinue({
            location: locationObj,
            energy: energyObj,
            currencyInfo: { currencySymbol: currency, currencyCode }
        });
    };

    return (
        <div className="flex-1 flex flex-col bg-[#F9FAFB] px-6 pt-12 md:pt-24 pb-32 md:pb-40">
            <div className="max-w-2xl mx-auto w-full flex flex-col items-center">
                <div className="w-full self-stretch mb-4">
                    <ProgressBar step={3} totalSteps={5} />
                </div>
                <div className="w-full self-start mb-4">
                    <BackNav onBack={onBack} />
                </div>

                {/* LOCATION SECTION */}
                <div className="mb-10 w-full mt-4">
                    <StepIntro
                        title="Where is your business located?"
                        subtitle="Solar estimates are based on regional data."
                        className="text-center mb-8 animate-slide-up opacity-0"
                    />

                    {/* Row 1: Country + State/Province */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="country-select" className="block mb-2">
                                <span className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide">Country</span>
                            </label>
                            <select
                                id="country-select"
                                name="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-3.5 text-sm focus:ring-2 focus:ring-[#2E7D32] outline-none shadow-sm appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%23111827%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22m19%209-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.1rem] bg-[position:right_0.75rem_center] bg-no-repeat"
                            >
                                <option value="">Select country</option>
                                {COUNTRIES.map((c) => (
                                    <option key={c.name} value={c.name}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="state-input" className="block mb-2">
                                <span className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide">State / Province (Optional)</span>
                            </label>
                            <input
                                id="state-input"
                                name="state"
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                placeholder="Enter state"
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#2E7D32] outline-none shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Row 2: City + Street Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="city-input" className="block mb-2">
                                <span className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide">City</span>
                            </label>
                            <input
                                id="city-input"
                                name="city"
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Enter city"
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#2E7D32] outline-none shadow-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="street-address" className="block mb-2">
                                <span className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide">Street Address (Optional)</span>
                            </label>
                            <input
                                id="street-address"
                                name="address"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter address"
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#2E7D32] outline-none shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* ENERGY SECTION */}
                <div className="w-full">
                    <ScenarioSelector
                        label="How does your business currently get electricity?"
                        scenarios={SCENARIOS}
                        value={scenario}
                        onChange={setScenario}
                    />

                    {showDiesel && (
                        <div className="mt-4">
                            <DieselDetails
                                dieselHoursPerDay={dieselHoursPerDay}
                                setDieselHoursPerDay={setDieselHoursPerDay}
                                dieselPricePerLiter={dieselPricePerLiter}
                                setDieselPricePerLiter={setDieselPricePerLiter}
                                currencySymbol={currency}
                            />
                        </div>
                    )}
                </div>
            </div>

            <StickyContinue canContinue={isValid} onClick={handleContinue} maxWidthClass="max-w-2xl" />
        </div>
    );
}
