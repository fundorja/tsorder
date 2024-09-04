const apiKey = "563492ad6f917000010000018eab46c0ee374b6eb502a86a04ce109c";

// const endpoont = "https://api.pexels.com/v1/curated?per_page=1";
// const videoEndpoint = "https://api.pexels.com/videos/videos/";
// const natureEndpoint = "https://api.pexels.com/v1/search?query=breathtaking?per_page=1";
const query = "breathtaking";
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
    };
    img.onerror = function () {
        console.error("Failed to load image, trying another one...");
        setBackgroundImage(); // Versuche ein anderes Bild, wenn das aktuelle nicht geladen werden kann
    };
    img.src = url;
}

setBackgroundImage();

/*
const endpoint = "https://api.pexels.com/videos/search?query=breathtaking&per_page=1";

async function setBackgroundVideo() {
    try {
        const response = await fetch(endpoint, {
            headers: {
                Authorization: apiKey,
            },
        });
        const data = await response.json();
        const videoUrl = data.videos[0].video_files[0].link;
        const videoElement = document.getElementById("background-video");
        videoElement.src = videoUrl;
        videoElement.play();
    } catch (error) {
        console.error("Error fetching the video:", error);
    }
}

// Rufe das Hintergrundvideo ab und setze es
setBackgroundVideo();
*/
