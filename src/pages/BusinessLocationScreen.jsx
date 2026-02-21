import React, { useState, useMemo } from "react";
import BackNav from "../components/common/BackNav";
import StickyContinue from "../components/common/StickyContinue";

import LocationStepHeader from "../components/assessment/location/StepHeader";
import CountrySelect from "../components/assessment/location/CountrySelect";
import StateCityFields from "../components/assessment/location/StateCityFields";
import AddressField from "../components/assessment/location/AddressField";
import DetectedCurrencyBadge from "../components/assessment/location/DetectedCurrencyBadge";

import EnergyStepHeader from "../components/assessment/energy-context/StepHeader";
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
        label: "Fully Grid",
        desc: "You mainly use grid electricity.",
        icon: "power",
    },
    {
        id: "diesel_replacement",
        label: "Off Grid with Diesel Generator",
        desc: "You use generator for a significant portion of power.",
        icon: "local_gas_station",
    },
];

import ProgressBar from "../components/common/ProgressBar";

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
                <LocationStepHeader title="Where is your business located?" />

                <div className="space-y-6 mb-12">
                    <CountrySelect
                        country={country}
                        setCountry={setCountry}
                        countries={COUNTRIES}
                    />

                    <StateCityFields
                        state={state}
                        setState={setState}
                        city={city}
                        setCity={setCity}
                    />

                    <AddressField address={address} setAddress={setAddress} />

                    {currency && <DetectedCurrencyBadge currency={currency} />}
                </div>

                {/* --- ENERGY SECTION --- */}
                {isLocationValid && (
                    <div className="animate-slide-up opacity-0 animation-delay-100">
                        <EnergyStepHeader title="Power Supply Details" />

                        <div className="space-y-8 mt-6">
                            <ScenarioSelector
                                label="How does your business currently get electricity?"
                                scenarios={SCENARIOS}
                                value={scenario}
                                onChange={setScenario}
                            />

                            {showDiesel && (
                                <DieselDetails
                                    dieselHoursPerDay={dieselHoursPerDay}
                                    setDieselHoursPerDay={setDieselHoursPerDay}
                                    dieselPricePerLiter={dieselPricePerLiter}
                                    setDieselPricePerLiter={setDieselPricePerLiter}
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>

            <StickyContinue canContinue={isValid} onClick={handleContinue} />
        </div>
    );
}
