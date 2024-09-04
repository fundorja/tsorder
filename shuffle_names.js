const fs = require("fs");

// Namen laden
let names = require("./names.json");

// Funktion zum Mischen des Arrays
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(names);

// Die gemischte Liste als neue JSON-Datei speichern
fs.writeFileSync("shuffled_names.json", JSON.stringify(names));
