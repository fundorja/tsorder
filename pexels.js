const apiKey = "563492ad6f917000010000018eab46c0ee374b6eb502a86a04ce109c";

// const endpoont = "https://api.pexels.com/v1/curated?per_page=1";
// const videoEndpoint = "https://api.pexels.com/videos/videos/";
const natureEndpoint = "https://api.pexels.com/v1/search?query=nature?curated?per_page=1";

async function setBackground() {
    try {
        const response = await fetch(natureEndpoint, {
            headers: {
                Authorization: apiKey,
            },
        });
        const data = await response.json();
        const imageUrl = data.photos[0].src.large2x;
        document.body.style.backgroundImage = `url(${imageUrl})`;
    } catch (error) {
        console.error("Error fetching the image:", error);
    }
}

// Rufe das Hintergrundbild ab und setze es
setBackground();

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
