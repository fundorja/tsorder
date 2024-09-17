const apiKey = "563492ad6f917000010000018eab46c0ee374b6eb502a86a04ce109c";

// const endpoont = "https://api.pexels.com/v1/curated?per_page=1";
// const videoEndpoint = "https://api.pexels.com/videos/videos/";
// const natureEndpoint = "https://api.pexels.com/v1/search?query=breathtaking?per_page=1";
// const query = "breathtaking";
// const query = "background";
const query = "nature background";
const totalPages = 1024;

function getRandomPage() {
    return Math.floor(Math.random() * totalPages) + 1;
}

async function setBackgroundImage() {
    const page = getRandomPage();
    const endpoint = `https://api.pexels.com/v1/search?query=${query}&per_page=1&page=${page}`;

    try {
        const response = await fetch(endpoint, {
            headers: {
                Authorization: apiKey,
            },
        });
        const data = await response.json();

        if (data.photos.length > 0) {
            const imageUrl = data.photos[0].src.large2x;
            checkImage(imageUrl);
        } else {
            console.error("No images found, trying another one...");
            setBackgroundImage(); // Versuche ein anderes Bild, wenn keines gefunden wurde
        }
    } catch (error) {
        console.error("Error fetching the image:", error);
        setBackgroundImage(); // Versuche ein anderes Bild bei einem API-Fehler
    }
}

function checkImage(url) {
    const img = new Image();
    img.onload = function () {
        document.body.style.backgroundImage = `url(${url})`;

        const backgroundImageUrl = getComputedStyle(document.body).backgroundImage.slice(5, -2);

        isImageDark(backgroundImageUrl, (isDark) => {
            if (isDark) {
                document.querySelector(".date").style.color = "white";
                document.querySelector(".time").style.color = "white";
                document.querySelector(".ts-wrap").classList.add("darkBG");
                document.querySelector(".ts-wrap h1").classList.add("darkBG");
                document.querySelectorAll(".ts-wrap li").forEach((name) => {
                    name.classList.add("darkBG");
                });
                console.log("## dunkel 1");
            } else {
                document.querySelector(".date").style.color = "black";
                document.querySelector(".time").style.color = "black";
                document.querySelector(".ts-wrap").classList.remove("darkBG");
                document.querySelector(".ts-wrap h1").classList.remove("darkBG");
                document.querySelectorAll(".ts-wrap li").forEach((name) => {
                    name.classList.remove("darkBG");
                });
                console.log("## hell 1");
            }
        });
    };
    img.onerror = function () {
        console.error("Failed to load image, trying another one...");
        setBackgroundImage(); // Versuche ein anderes Bild, wenn das aktuelle nicht geladen werden kann
    };
    img.src = url;
}

setBackgroundImage();

function isImageDark(imageUrl, callback) {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Notwendig für CORS, falls Bild von anderer Domain kommt
    img.src = imageUrl;

    img.onload = function () {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;

        context.drawImage(img, 0, 0);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        let r, g, b, avg;
        let totalBrightness = 0;
        let numPixels = 0;

        for (let i = 0; i < data.length; i += 4) {
            r = data[i];
            g = data[i + 1];
            b = data[i + 2];

            // Helligkeit nach der Formel Y = 0.299R + 0.587G + 0.114B
            avg = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            totalBrightness += avg;
            numPixels++;
        }

        const averageBrightness = totalBrightness / numPixels;
        const isDark = averageBrightness < 0.3; // Schwellenwert für Dunkelheit

        callback(isDark);
    };

    img.onerror = function () {
        console.error("Fehler beim Laden des Bildes");
    };
}
