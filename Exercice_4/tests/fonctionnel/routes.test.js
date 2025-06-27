const request = require("supertest");
const app = require("../../src/app");

// describe("/convert", () => {
//     it("Convertit EUR vers USD", async () => {
//         const res = await request(app).get("/convert?from=EUR&to=USD&amount=100");
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toEqual({
//             from: "EUR",
//             to: "USD",
//             originalAmount: 100,
//             convertedAmount: 110
//         });
//     });
//
//     it("Retourne une erreur pour devise inconnue", async () => {
//         const res = await request(app).get("/convert?from=TOTO&to=USD&amount=100");
//         expect(res.statusCode).toBe(400);
//     });
//
//     it("Retourne une erreur pour un montant négatif", async () => {
//         const res = await request(app).get("/convert?from=EUR&to=USD&amount=-100");
//         expect(res.statusCode).toBe(400);
//     });
// });

// describe("/tva", () => {
//     it("Calcule le TTC", async () => {
//         const res = await request(app).get("/tva?ht=100&taux=20");
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toEqual({
//             ht: 100,
//             taux: 20,
//             ttc: 120
//         });
//     });
//
//     it("Retourne une erreur pour ht manquant", async () => {
//         const res = await request(app).get("/tva?taux=20");
//         expect(res.statusCode).toBe(400);
//     });
//
//     it("Retourne une erreur pour ht négatif", async () => {
//         const res = await request(app).get("/tva?ht=-100&taux=20");
//         expect(res.statusCode).toBe(400);
//     });
// });
//
// describe("/remise", () => {
//     it("Calcule le prix avec remise", async () => {
//         const res = await request(app).get("/remise?prix=100&pourcentage=10");
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toEqual({
//             prixInitial: 100,
//             pourcentage: 10,
//             prixFinal: 90
//         });
//     });
//
//     it("retourne une erreur pour pourcentage négatif", async () => {
//         const res = await request(app).get("/remise?prix=100&pourcentage=-5");
//         expect(res.statusCode).toBe(400);
//     });
//
//     it("Retourne une erreur pour prix manquant", async () => {
//         const res = await request(app).get("/remise?pourcentage=10");
//         expect(res.statusCode).toBe(400);
//     });
// });
