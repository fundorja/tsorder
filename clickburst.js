window.addEventListener("DOMContentLoaded", (event) => {
    if (typeof mojs === "undefined") {
        console.error("mo.js is not loaded");
    } else {
        const burst = new mojs.Burst({
            left: 0,
            top: 0,
            radius: { 4: 19 },
            angle: 45,
            children: {
                shape: "line",
                radius: 3,
                scale: 1,
                stroke: "#FD7932",
                strokeDasharray: "100%",
                strokeDashoffset: { "-100%": "100%" },
                duration: 700,
                easing: "quad.out",
            },
        });

        document.addEventListener("click", function (e) {
            burst.tune({ x: e.pageX, y: e.pageY }).replay();
        });

        // new MojsPlayer({ add: burst, isPlaying: true, isRepeat: true });
    }
});
