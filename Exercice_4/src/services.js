const rates = {
    EUR: { USD: 1.1 },
    USD: { EUR: 1 / 1.1, GBP: 0.8 },
    GBP: { USD: 1 / 0.8 }
};

function convertCurrency(from, to, amount) {
    if (!rates[from] || !rates[from][to]) throw new Error("Error rates");
    return parseFloat((amount * rates[from][to]).toFixed(2));
}

function calculateTTC(ht, taux) {
    return parseFloat((ht * (1 + taux / 100)).toFixed(2));
}

function applyDiscount(prix, pourcentage) {
    return parseFloat((prix * (1 - pourcentage / 100)).toFixed(2));
}

module.exports = { convertCurrency, calculateTTC, applyDiscount };
