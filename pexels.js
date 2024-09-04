const apiKey = "563492ad6f917000010000018eab46c0ee374b6eb502a86a04ce109c";
const endpoint = "https://api.pexels.com/v1/curated?per_page=1";
// const endpoint = "https://api.pexels.com/videos/videos/";

async function setBackground() {
    try {
        const response = await fetch(endpoint, {
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
