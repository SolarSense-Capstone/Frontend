import React, { useState } from "react";
import BackNav from "../components/common/BackNav";
import StickyContinue from "../components/common/StickyContinue";

import StepHeader from "../components/assessment/location/StepHeader";
import CountrySelect from "../components/assessment/location/CountrySelect";
import StateCityFields from "../components/assessment/location/StateCityFields";
import AddressField from "../components/assessment/location/AddressField";
import DetectedCurrencyBadge from "../components/assessment/location/DetectedCurrencyBadge";

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

export default function LocationScreen({ onContinue, onBack }) {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");

  const selectedCountry = COUNTRIES.find((c) => c.name === country);
  const currency = selectedCountry ? selectedCountry.currency : "";
  const currencyCode = selectedCountry ? selectedCountry.code : "";

  const isValid = country && city;

  const handleContinue = () => {
    if (!isValid) return;
    onContinue(
      { country, state, city, address },
      { currencySymbol: currency, currencyCode },
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F9FAFB] px-6 pt-12 md:pt-24 pb-32 md:pb-40">
      <div className="max-w-xl mx-auto w-full">
        <BackNav onBack={onBack} />

        <StepHeader title="Where is your business located?" />

        <div className="space-y-6">
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
      </div>

      <StickyContinue canContinue={!!isValid} onClick={handleContinue} />
    </div>
  );
}
