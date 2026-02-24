import React, { useState } from "react";
import BackNav from "../components/common/BackNav";
import StickyContinue from "../components/common/StickyContinue";
import StepIntro from "../components/assessment/business-context/StepIntro";
import BusinessNameField from "../components/assessment/business-context/BusinessNameField";

import ProgressBar from "../components/common/ProgressBar";

export default function BusinessNameScreen({ initialName = "", onContinue, onBack }) {
    const [businessName, setBusinessName] = useState(initialName);

    const canContinue = businessName.trim() !== "";

    return (
        <div className="flex-1 flex flex-col bg-[#F9FAFB] px-6 pt-12 md:pt-24 pb-32 md:pb-40">
            <div className="max-w-xl mx-auto w-full flex flex-col items-center">
                <div className="w-full self-stretch mb-4">
                    <ProgressBar step={1} totalSteps={5} />
                </div>
                <div className="w-full self-start mb-4">
                    <BackNav onBack={onBack} />
                </div>

                <StepIntro
                    title="What is the name of your business?"
                    subtitle="This will personalise your solar assessment report."
                    className="text-center mb-8 animate-slide-up opacity-0"
                />

                <BusinessNameField value={businessName} onChange={setBusinessName} />
            </div>

            <StickyContinue
                canContinue={canContinue}
                onClick={() => canContinue && onContinue({ businessName: businessName.trim() })}
                maxWidthClass="max-w-xl"
            />
        </div>
    );
}
