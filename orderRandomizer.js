const TS_MEMBERS = ["Christian", "Niko", "Olga", "Elisa", "Krystyna", "Iryna Z", "Stefanos", "Julia", "Hasan", "Thomas", "Iryna P", "Anna", "Robert"];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function checkAndShuffleDaily() {
    const now = new Date();
    const currentDay = now.toISOString().split("T")[0]; // Current date in YYYY-MM-DD format

    const lastShuffle = localStorage.getItem("lastShuffleDate");
    const shuffledArray = localStorage.getItem("shuffledTSMembers");

    if (!lastShuffle || lastShuffle !== currentDay || !shuffledArray) {
        const newShuffledArray = shuffleArray([...TS_MEMBERS]);
        localStorage.setItem("lastShuffleDate", currentDay);
        localStorage.setItem("shuffledTSMembers", JSON.stringify(newShuffledArray));
        return newShuffledArray;
    }

    return JSON.parse(shuffledArray);
}

const shuffledTSMembers = checkAndShuffleDaily();
console.log(shuffledTSMembers); // Display the shuffled array in the console

// Optionally, display the shuffled array in the HTML
document.body.innerHTML = `<ul>${shuffledTSMembers.map((member) => `<li>${member}</li>`).join("")}</ul>`;

console.log("## ", TS_MEMBERS);
