const { convertCurrency, calculateTTC, applyDiscount } = require("../../src/services");

test("Convertion EUR => USD", () => {
    expect(convertCurrency("EUR", "USD", 100)).toBe(110);
});

test("Convertion USD => GBP", () => {
    expect(convertCurrency("USD", "GBP", 100)).toBe(80);
});

test("Calcule TTC", () => {
    expect(calculateTTC(100, 20)).toBe(120);
});

test("Appliquer réduction", () => {
    expect(applyDiscount(100, 10)).toBe(90);
});
