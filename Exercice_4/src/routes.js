const express = require("express");
const router = express.Router();
const { convertCurrency, calculateTTC, applyDiscount } = require("./services");

router.get("/convert", (req, res) => {
    const { from, to, amount } = req.query;
    const amt = parseFloat(amount);

    if (!from || !to || isNaN(amt) || amt < 0) {
        return res.status(400).json({ error: "Invalid parameters" });
    }

    try {
        const converted = convertCurrency(from, to, amt);
        res.json({ from, to, originalAmount: amt, convertedAmount: converted });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/tva", (req, res) => {
    const ht = parseFloat(req.query.ht);
    const taux = parseFloat(req.query.taux);

    if (isNaN(ht) || isNaN(taux) || ht < 0 || taux < 0) {
        return res.status(400).json({ error: "Invalid parameters" });
    }

    res.json({ ht, taux, ttc: calculateTTC(ht, taux) });
});

router.get("/remise", (req, res) => {
    const prix = parseFloat(req.query.prix);
    const pourcentage = parseFloat(req.query.pourcentage);

    if (isNaN(prix) || isNaN(pourcentage) || prix < 0 || pourcentage < 0) {
        return res.status(400).json({ error: "Invalid parameters" });
    }

    res.json({ prixInitial: prix, pourcentage, prixFinal: applyDiscount(prix, pourcentage) });
});

module.exports = router;
