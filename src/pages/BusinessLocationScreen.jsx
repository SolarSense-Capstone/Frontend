import React, { useState, useMemo } from "react";
import BackNav from "../components/common/BackNav";
import StickyContinue from "../components/common/StickyContinue";
import ProgressBar from "../components/common/ProgressBar";

import CountrySelect from "../components/assessment/location/CountrySelect";
import DieselDetails from "../components/assessment/energy-context/DieselDetails";
import ScenarioSelector from "../components/assessment/energy-context/ScenarioSelector";

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

export default function BusinessLocationScreen({
    initialLocation,
    initialEnergy,
    onContinue,
    onBack,
}) {
    // Location States
    const [country, setCountry] = useState(initialLocation?.country || "");
    const [state, setState] = useState(initialLocation?.state || "");
    const [city, setCity] = useState(initialLocation?.city || "");
    const [address, setAddress] = useState(initialLocation?.address || "");

    // Energy States
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

        const locationObj = { country, state, city, address };
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
            <div className="max-w-xl mx-auto w-full">
                <BackNav onBack={onBack} />
                <ProgressBar step={3} totalSteps={5} />

                {/* --- LOCATION SECTION --- */}
                <div className="mb-12">
                    <p className="text-[18px] md:text-xl font-bold text-gray-900 mb-2 text-center">
                        Where is your business located?
                    </p>
                    <p className="text-gray-400 text-sm text-center mb-10">
                        Solar estimates are based on regional data.
                    </p>

                    {/* Row 1: Country + State/Province */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        {/* Country */}
                        <div>
                            <label htmlFor="country-select" className="block mb-2 px-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">COUNTRY</span>
                            </label>
                            <select
                                id="country-select"
                                name="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full bg-white border border-gray-100/80 rounded-xl pl-4 pr-10 py-3.5 text-[13px] font-medium focus:ring-2 focus:ring-[#2E7D32] outline-none shadow-sm appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%23111827%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22m19%209-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.1rem] bg-[position:right_0.75rem_center] bg-no-repeat"
                            >
                                <option value="" className="text-gray-400">Select country</option>
                                {COUNTRIES.map((c) => (
                                    <option key={c.name} value={c.name}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* State / Province */}
                        <div>
                            <label htmlFor="state-input" className="block mb-2 px-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">STATE / PROVINCE</span>
                            </label>
                            <input
                                id="state-input"
                                name="state"
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                placeholder="Enter state"
                                className="w-full bg-white border border-gray-100/80 rounded-xl px-4 py-3.5 text-[13px] font-medium placeholder-gray-400 focus:ring-2 focus:ring-[#2E7D32] outline-none shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Row 2: City + Street Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* City */}
                        <div>
                            <label htmlFor="city-input" className="block mb-2 px-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">CITY</span>
                            </label>
                            <input
                                id="city-input"
                                name="city"
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Enter city"
                                className="w-full bg-white border border-gray-100/80 rounded-xl px-4 py-3.5 text-[13px] font-medium placeholder-gray-400 focus:ring-2 focus:ring-[#2E7D32] outline-none shadow-sm"
                            />
                        </div>

                        {/* Street Address */}
                        <div>
                            <label htmlFor="street-address" className="block mb-2 px-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">STREET ADDRESS (OPTIONAL)</span>
                            </label>
                            <input
                                id="street-address"
                                name="address"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter address"
                                className="w-full bg-white border border-gray-100/80 rounded-xl px-4 py-3.5 text-[13px] font-medium placeholder-gray-400 focus:ring-2 focus:ring-[#2E7D32] outline-none shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* --- ENERGY SECTION --- */}
                <div>
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

            <StickyContinue canContinue={isValid} onClick={handleContinue} />
        </div>
    );
}
