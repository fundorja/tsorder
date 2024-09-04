const sound = new Audio("pickupCoin.wav");
const powerUpSound = new Audio("powerUp.wav");
const explosionSound = new Audio("explosion.wav");
let isClicked = false;

sound.volume = 0.4;
powerUpSound.volume = 0.5;
explosionSound.volume = 0.8;

function addLiHover() {
    const nameElements = document.querySelectorAll(".ts-wrap li");

    console.log(isClicked);
    nameElements.forEach((name) => {
        if (isClicked) {
            name.addEventListener("mouseover", () => {
                sound.currentTime = 0;
                sound.play();
            });
        }
    });
}
function addLiClickListeners() {
    const nameElements = document.querySelectorAll(".ts-wrap li");

    nameElements.forEach((name) => {
        name.addEventListener("click", () => {
            isClicked = true;
            addLiHover();

            if (name.classList.contains("strike")) {
                name.classList.remove("strike");
                powerUpSound.currentTime = 0;
                powerUpSound.play();
            } else {
                name.classList.add("strike");
                explosionSound.currentTime = 0;
                explosionSound.play();
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
