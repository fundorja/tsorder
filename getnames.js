const sound = new Audio("laserShoot1.wav");
const powerUpSound = new Audio("powerUp.wav");
const explosionSound = new Audio("explosion.wav");

function addLiClickListeners() {
    const hoverTargets = document.querySelectorAll(".ts-wrap li");

    hoverTargets.forEach((hoverTarget) => {
        hoverTarget.addEventListener("mouseover", () => {
            sound.currentTime = 0; // Setzt den Sound auf den Anfang zurück
            sound.play();
            sound.play().catch((error) => {
                console.error("Error playing sound:", error);
            });
        });

        hoverTarget.addEventListener("click", () => {
            if (hoverTarget.classList.contains("strike")) {
                hoverTarget.classList.remove("strike");
                powerUpSound.currentTime = 0; // Setzt den Sound auf den Anfang zurück
                powerUpSound.play().catch((error) => {
                    console.error("Error playing sound:", error);
                });
            } else {
                hoverTarget.classList.add("strike");
                explosionSound.currentTime = 0; // Setzt den Sound auf den Anfang zurück
                explosionSound.play().catch((error) => {
                    console.error("Error playing sound:", error);
                });
            }
        });
    });
}

fetch("shuffled_names.json")
    .then((response) => response.json())
    .then((data) => {
        const nameList = document.getElementById("nameList");
        data.forEach((name) => {
            const li = document.createElement("li");
            li.textContent = name;
            nameList.appendChild(li);
        });

        addLiClickListeners();
    })
    .catch((error) => console.error("Fehler beim Laden der Namensliste:", error));
