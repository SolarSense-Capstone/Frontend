export const EXCHANGE_RATES = {
    NGN: 1550, // Updated approximate rate
    KES: 129,
    GHS: 12.5,
    ZAR: 19,
    ETB: 57,
    UGX: 3800,
    TZS: 2500,
    RWF: 1280,
    USD: 1 // Baseline
};

export function localToUSD(value, currencyCode) {
    if (!value || isNaN(value)) return 0;

    const rate = EXCHANGE_RATES[currencyCode];
    if (!rate) return value; // Fallback: no conversion if rate unknown (assume already USD)

    return value / rate;
}

export function usdToLocal(usdValue, currencyCode) {
    if (!usdValue || isNaN(usdValue)) return 0;

    const rate = EXCHANGE_RATES[currencyCode];
    if (!rate) return usdValue; // Fallback: no conversion

    return usdValue * rate;
}
