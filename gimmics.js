function updateDateTime() {
    const dateElement = document.querySelector(".date");
    const timeElement = document.querySelector(".time");

    const now = new Date();

    // Wochentag ermitteln
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = daysOfWeek[now.getDay()];

    // Datum formatieren: Tag.Monat.Jahr
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Monat wird 0-basiert gezählt, daher +1
    const year = now.getFullYear();
    const formattedDate = `${dayOfWeek} ${day}.${month}.${year}`;

    // Zeit formatieren: Stunden:Minuten:Sekunden
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    // Datum und Zeit in die entsprechenden Elemente einfügen
    dateElement.textContent = formattedDate;
    timeElement.textContent = formattedTime;
}

// Initiales Update und Intervall für das Zeit-Update setzen
updateDateTime();
setInterval(updateDateTime, 1000);

const sound = new Audio("laserShoot1.wav");
const powerUpSound = new Audio("powerUp.wav");
const explosionSound = new Audio("explosion.wav");

const hoverTargets = document.querySelectorAll(".ts-wrap li");

hoverTargets.forEach((hoverTarget) => {
    hoverTarget.addEventListener("mouseover", () => {
        // sound.currentTime = 0; // Setzt den Sound auf den Anfang zurück
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

// jTrbo(document).ready(function () {
//     console.log("## trbo init", jTrbo("li"));
//     jTrbo("li").on("click", function () {
//         console.log("## click li");
//         if (!jTrbo(this).hasClass("strike")) {
//             jTrbo(this).addClass("strike");
//         } else {
//             jTrbo(this).removeClass("strike");
//         }
//     });
// });
