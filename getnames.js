// const hoverSound = new Audio("pickupCoin.wav");
// const strokeSound = new Audio("chalkScratch.wav");
// const unstrokeSound = new Audio("bubbles-03-91268.wav");
// const pageLoadSound = new Audio("sub-drop-short-232033.wav");
const hoverSound = new Audio("bubbles-03-91268.wav");
const strokeSound = new Audio("sub-drop-short-232033.wav");
const unstrokeSound = new Audio("chalkScratch.wav");
const pageLoadSound = new Audio("pickupCoin.wav");
let isClicked = false;

hoverSound.volume = 0.1;
strokeSound.volume = 0.6;
unstrokeSound.volume = 0.2;

function addLiHover() {
    const nameElements = document.querySelectorAll(".ts-wrap li");

    console.log(isClicked);
    nameElements.forEach((name) => {
        if (isClicked) {
            name.addEventListener("mouseover", () => {
                hoverSound.currentTime = 0;
                hoverSound.play();
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
                unstrokeSound.currentTime = 0;
                unstrokeSound.play();
            } else {
                name.classList.add("strike");
                strokeSound.currentTime = 0;
                strokeSound.play();
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
