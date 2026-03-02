export const EXCHANGE_RATES = {
    NGN: 494,
    KES: 129,
    // others can be added here
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
