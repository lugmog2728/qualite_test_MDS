# Client Management Module - TDD Exercise

## 🚀 Installation

1️⃣ Clonez le dépôt ou récupérez les fichiers du projet.

2️⃣ Installez les dépendances :

```bash
npm install
```

---

## 📂 Structure du projet

```
/src
  clientService.js       # Module à développer

/tests
  clientService.test.js  # Tests à faire passer (TDD fourni)

package.json             # Configuration du projet (inclut Jest)
```

---

## 📌 Commande pour lancer les tests

```bash
npm test
```

✅ Tous les tests doivent passer si le module est correctement implémenté.

---

## 📝 Exercice attendu

Vous devez :

- Étudier la batterie de tests dans `tests/clientService.test.js`.
- Écrire le code nécessaire dans `src/clientService.js` pour faire passer les tests un par un.
- Comprendre les règles métiers implicites :

  - `firstName`, `lastName`, `email` obligatoires.
  - `email` doit être valide et unique.
  - `phone` si présent doit être au format `+33...`.
  - Les autres champs sont optionnels.

## 📌 Bonus

Vous pouvez exécuter Jest avec des options utiles :

```bash
npm test -- --watch
npm test -- --detectOpenHandles
```
