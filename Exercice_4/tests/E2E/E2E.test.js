const request = require("supertest");
const app = require("../../src/app");


describe("Apply discount then calculate VAT and convert", () => {
    it("should apply 30% discount then calculate 5.5% VAT", async () => {
        const prixInitial = 150;
        const pourcentageRemise = 30;
        const tauxTVA = 5.5;

        const remiseRes = await request(app)
            .get("/remise")
            .query({ prix: prixInitial, pourcentage: pourcentageRemise });

        expect(remiseRes.statusCode).toBe(200);
        const prixRemise = remiseRes.body.prixFinal;
        expect(typeof prixRemise).toBe("number");


        const tvaRes = await request(app)
            .get("/tva")
            .query({ ht: prixRemise, taux: tauxTVA });

        expect(tvaRes.statusCode).toBe(200);
        const ttc = tvaRes.body.ttc;

        const convertResponse = await request(app)
            .get("/convert")
            .query({ from: "USD", to: "EUR", amount: ttc });

        expect(convertResponse.statusCode).toBe(200);
        const convertedAmount = convertResponse.body.convertedAmount;
        expect(typeof convertedAmount).toBe("number");


        const prixAttendu = parseFloat((prixInitial * (1 - pourcentageRemise / 100)).toFixed(2));
        const ttcAttendu = parseFloat((prixAttendu * (1 + tauxTVA / 100)).toFixed(2))
        const convertedExpected = parseFloat((ttcAttendu * (1 / 1.1)).toFixed(2));


        expect(prixRemise).toBe(prixAttendu);
        expect(ttc).toBe(ttcAttendu);
        expect(convertedAmount).toBe(convertedExpected);
    });
});