// Wetter-Effekte via Open-Meteo (kostenlos, kein API-Key nötig)
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";
const DEFAULT_COORDS = { lat: 52.52, lon: 13.405 }; // Fallback: Berlin

// WMO Weather interpretation codes -> Effekt-Typ
function mapWeatherCode(code) {
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
    if ([51, 53, 55, 56, 57].includes(code)) return "drizzle";
    if ([61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code)) return "rain";
    if ([0, 1].includes(code)) return "sun";
    if ([2, 3, 45, 48].includes(code)) return "wind";
    return "sun";
}

async function fetchWeather(lat, lon) {
    const url = `${WEATHER_API}?latitude=${lat}&longitude=${lon}&current=weather_code,wind_speed_10m`;
    const res = await fetch(url);
    const data = await res.json();
    return {
        code: data.current.weather_code,
        windSpeed: data.current.wind_speed_10m,
    };
}

function initWeatherEffects() {
    const start = ({ lat, lon }) => {
        fetchWeather(lat, lon)
            .then(({ code, windSpeed }) => {
                const type = mapWeatherCode(code);
                console.log("## weather code", code, "-> effect", type);
                applyWeatherEffect(type, windSpeed);
            })
            .catch((error) => {
                console.error("Weather fetch failed, falling back to sun effect:", error);
                applyWeatherEffect("sun", 0);
            });
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => start({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
            () => start(DEFAULT_COORDS),
            { timeout: 5000 },
        );
    } else {
        start(DEFAULT_COORDS);
    }
}

// --- Canvas Partikel-System ---

let canvas, ctx;
let particles = [];
let animationId;

function setupCanvas() {
    canvas = document.getElementById("weather-canvas");
    ctx = canvas.getContext("2d");
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function clearEffect() {
    if (animationId) cancelAnimationFrame(animationId);
    particles = [];
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function createParticles(count, factory) {
    particles = Array.from({ length: count }, factory);
}

function applyWeatherEffect(type, windSpeed = 0) {
    if (!canvas) setupCanvas();
    clearEffect();

    const windDrift = Math.min(windSpeed / 10, 3);

    switch (type) {
        case "rain":
            createParticles(120, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                len: 15 + Math.random() * 15,
                speed: 8 + Math.random() * 6,
                drift: windDrift + 1,
            }));
            animateRain(0.6);
            break;
        case "drizzle":
            createParticles(60, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                len: 6 + Math.random() * 6,
                speed: 3 + Math.random() * 2,
                drift: windDrift * 0.5,
            }));
            animateRain(0.35);
            break;
        case "snow":
            createParticles(80, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: 1.5 + Math.random() * 2.5,
                speed: 0.5 + Math.random() * 1.5,
                drift: windDrift,
                sway: Math.random() * Math.PI * 2,
            }));
            animateSnow();
            break;
        case "sun":
            createParticles(40, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: 0.5 + Math.random() * 1.5,
                alpha: Math.random(),
                speed: 0.005 + Math.random() * 0.02,
            }));
            animateSparkle();
            break;
        case "wind":
            createParticles(25, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                len: 40 + Math.random() * 60,
                speed: 3 + windDrift * 2,
            }));
            animateWind();
            break;
    }
}

function animateRain(opacity) {
    function step() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = `rgba(174, 214, 241, ${opacity})`;
        ctx.lineWidth = 1.5;
        particles.forEach((p) => {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x + p.drift, p.y + p.len);
            ctx.stroke();
            p.y += p.speed;
            p.x += p.drift * 0.3;
            if (p.y > canvas.height) {
                p.y = -p.len;
                p.x = Math.random() * canvas.width;
            }
        });
        animationId = requestAnimationFrame(step);
    }
    step();
}

function animateSnow() {
    function step() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        particles.forEach((p) => {
            p.sway += 0.02;
            ctx.beginPath();
            ctx.arc(p.x + Math.sin(p.sway) * 1.5, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
            p.y += p.speed;
            p.x += p.drift * 0.2;
            if (p.y > canvas.height) {
                p.y = -p.r;
                p.x = Math.random() * canvas.width;
            }
        });
        animationId = requestAnimationFrame(step);
    }
    step();
}

function animateSparkle() {
    function step() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
            p.alpha += p.speed;
            if (p.alpha > 1 || p.alpha < 0) p.speed *= -1;
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 250, 205, ${Math.abs(Math.sin(p.alpha))})`;
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });
        animationId = requestAnimationFrame(step);
    }
    step();
}

function animateWind() {
    function step() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
        ctx.lineWidth = 1;
        particles.forEach((p) => {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - p.len, p.y + p.len * 0.1);
            ctx.stroke();
            p.x += p.speed;
            if (p.x > canvas.width + p.len) {
                p.x = -p.len;
                p.y = Math.random() * canvas.height;
            }
        });
        animationId = requestAnimationFrame(step);
    }
    step();
}

initWeatherEffects();
