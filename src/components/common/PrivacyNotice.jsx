import React, { useState } from "react";

/**
 * PrivacyNotice — Security Checklist Requirement: UI > Privacy Notices
 * Shown on first visit. Explains data use in plain, simple language.
 * Stored in sessionStorage so it shows once per session (not persisted in localStorage).
 */
export default function PrivacyNotice() {
    const [dismissed, setDismissed] = useState(() => {
        try {
            return sessionStorage.getItem("solarsense_privacy_accepted") === "true";
        } catch {
            return false;
        }
    });

    const handleAccept = () => {
        try {
            sessionStorage.setItem("solarsense_privacy_accepted", "true");
        } catch {
            // sessionStorage may be blocked (private browsing), ignore
        }
        setDismissed(true);
    };

    if (dismissed) return null;

    return (
        <div
            role="dialog"
            aria-live="polite"
            aria-label="Privacy Notice"
            className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 md:px-8"
        >
            <div className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12)] p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] flex items-center justify-center flex-shrink-0">
                    <span className="material-icons-outlined text-[#0F9D58] text-[20px]">lock</span>
                </div>

                {/* Text */}
                <div className="flex-1">
                    <p className="text-[13px] font-bold text-gray-900 mb-0.5">How we use your data</p>
                    <p className="text-[12px] text-gray-500 leading-relaxed">
                        We use the business information you enter (name, location, equipment, and energy usage) only to
                        calculate your solar viability assessment. <strong>We do not store or sell your data.</strong>{" "}
                        Nothing you enter is shared with third parties.
                    </p>
                </div>

                {/* CTA */}
                <button
                    onClick={handleAccept}
                    className="flex-shrink-0 bg-[#0F9D58] text-white text-[12px] font-bold px-5 py-2.5 rounded-xl hover:bg-[#0c7d47] transition-colors whitespace-nowrap"
                >
                    Got it
                </button>
            </div>
        </div>
    );
}
