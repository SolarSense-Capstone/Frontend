// Exchange rates: 1 USD = X local currency
// Last updated approximate rates — should be refreshed regularly
export const EXCHANGE_RATES = {
    NGN: 1600,   // Nigerian Naira
    GHS: 15.4,   // Ghanaian Cedi
    KES: 129,    // Kenyan Shilling
    ZAR: 18.5,   // South African Rand
    ETB: 56.5,   // Ethiopian Birr
    UGX: 3750,   // Ugandan Shilling
    TZS: 2520,   // Tanzanian Shilling
    RWF: 1330,   // Rwandan Franc
};

export function localToUSD(value, currencyCode) {
    if (!value || isNaN(value)) return 0;
    const rate = EXCHANGE_RATES[currencyCode];
    if (!rate) return value; // Unknown currency: assume already USD
    return value / rate;
}

export function usdToLocal(usdValue, currencyCode) {
    if (!usdValue || isNaN(usdValue)) return 0;
    const rate = EXCHANGE_RATES[currencyCode];
    if (!rate) return usdValue; // Unknown currency: return as-is
    return usdValue * rate;
}
