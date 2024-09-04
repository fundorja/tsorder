VanillaTilt.init(document.querySelector(".ts-wrap"), {
    scale: 1.02,
    max: 5,
    speed: 700,
    glare: false,
});

//It also supports NodeList
VanillaTilt.init(document.querySelectorAll("li"), {
    scale: 1.05,
    max: 5,
    speed: 300,
    glare: false,
});
