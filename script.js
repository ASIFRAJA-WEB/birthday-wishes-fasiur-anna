/* =========================================
   BASIC SETTINGS
========================================= */

const FRIEND_NAME = "FASIUR RAHMAN ANNA SENPAI";


/* =========================================
   SCREEN ELEMENTS
========================================= */

const screens =
    document.querySelectorAll(".screen");

const holdButton =
    document.getElementById("holdButton");

const holdRing =
    document.getElementById("holdRing");

const countNumber =
    document.getElementById("countNumber");

const memoryImage =
    document.getElementById("memoryImage");

const memoryText =
    document.getElementById("memoryText");

const photoNumber =
    document.getElementById("photoNumber");

const photoCard =
    document.getElementById("photoCard");

const dots =
    document.getElementById("dots");

const typingText =
    document.getElementById("typingText");

const wishButton =
    document.getElementById("wishButton");


/* =========================================
   NAME
========================================= */

document.querySelector(".friend-name")
    .textContent = FRIEND_NAME;

document.querySelector(".final-name")
    .textContent =
        FRIEND_NAME + " ❤️";


/* =========================================
   SCREEN SWITCH
========================================= */

function showScreen(id) {

    screens.forEach(screen => {

        screen.classList.remove("active");

    });

    document
        .getElementById(id)
        .classList.add("active");
}


/* =========================================
   HOLD TO OPEN
========================================= */

let holding = false;

let holdStart = 0;

let holdAnimation;

const HOLD_TIME = 1800;


function startHold(e) {

    e.preventDefault();

    if (holding) return;

    holding = true;

    holdStart = Date.now();

    animateHold();

}


function endHold() {

    if (!holding) return;

    holding = false;

    cancelAnimationFrame(
        holdAnimation
    );

    holdRing.style.background =
        "conic-gradient(#ff4ecd 0deg, transparent 0deg)";

}


function animateHold() {

    if (!holding) return;

    const elapsed =
        Date.now() - holdStart;

    const progress =
        Math.min(
            elapsed / HOLD_TIME,
            1
        );

    const degrees =
        progress * 360;

    holdRing.style.background =
        `conic-gradient(
            #ff4ecd ${degrees}deg,
            #32153f ${degrees}deg
        )`;

    if (progress >= 1) {

        holding = false;

        openSurprise();

        return;
    }

    holdAnimation =
        requestAnimationFrame(
            animateHold
        );
}


holdButton.addEventListener(
    "pointerdown",
    startHold
);

holdButton.addEventListener(
    "pointerup",
    endHold
);

holdButton.addEventListener(
    "pointercancel",
    endHold
);

holdButton.addEventListener(
    "pointerleave",
    endHold
);


/* =========================================
   OPEN SURPRISE
========================================= */

function openSurprise() {

    holdRing.style.background =
        "conic-gradient(#ffd166 360deg, #ffd166 360deg)";

    setTimeout(() => {

        showScreen("countdown");

        startCountdown();

    }, 500);
}


/* =========================================
   COUNTDOWN
========================================= */

function startCountdown() {

    let count = 3;

    countNumber.textContent =
        count;

    countNumber.style.animation =
        "none";

    void countNumber.offsetWidth;

    countNumber.style.animation =
        "countPop 1s ease";


    const timer =
        setInterval(() => {

            count--;

            if (count > 0) {

                countNumber.textContent =
                    count;

                countNumber.style.animation =
                    "none";

                void countNumber.offsetWidth;

                countNumber.style.animation =
                    "countPop 1s ease";

            }
            else {

                clearInterval(timer);

                showScreen(
                    "nameReveal"
                );

                setTimeout(() => {

                    showScreen(
                        "memories"
                    );

                    startMemories();

                }, 3000);

            }

        }, 1000);
}


/* =========================================
   MEMORIES
========================================= */

const memories = [

    {
        image:
            "photo1.jpeg",

        text:
            "One of those moments I'll always remember ❤️"
    },

    {
        image:
            "photo2.jpeg",

        text:
            "Too many memories, too little space 😂"
    },

    {
        image:
            "photo3.jpeg",

        text:
            "The kind of moments that never get old 🤝"
    },

    {
        image:
            "photo4.jpeg",

        text:
            "And many more memories waiting to happen... ❤️"
    }

];

let currentMemory = 0;


/* =========================================
   DOTS
========================================= */

memories.forEach(
    (_, index) => {

        const dot =
            document.createElement("div");

        dot.className =
            "dot";

        if (index === 0) {

            dot.classList.add(
                "active"
            );
        }

        dots.appendChild(dot);

    }
);


function updateDots() {

    document
        .querySelectorAll(".dot")
        .forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === currentMemory
                );

            }
        );
}


/* =========================================
   CHANGE PHOTO
========================================= */

function changeMemory(index) {

    if (
        index < 0 ||
        index >= memories.length
    ) return;

    currentMemory = index;

    memoryImage.style.opacity =
        "0";

    memoryImage.style.transform =
        "scale(.94)";


    setTimeout(() => {

        memoryImage.src =
            memories[
                currentMemory
            ].image;

        memoryText.textContent =
            memories[
                currentMemory
            ].text;

        photoNumber.textContent =
            String(
                currentMemory + 1
            ).padStart(2, "0")
            + " / 04";


        memoryImage.style.opacity =
            "1";

        memoryImage.style.transform =
            "scale(1)";

        updateDots();

    }, 200);
}


/* =========================================
   SWIPE
========================================= */

let touchStartX = 0;

let touchEndX = 0;


photoCard.addEventListener(
    "touchstart",
    e => {

        touchStartX =
            e.changedTouches[0].screenX;

    },
    { passive: true }
);


photoCard.addEventListener(
    "touchend",
    e => {

        touchEndX =
            e.changedTouches[0].screenX;

        handleSwipe();

    },
    { passive: true }
);


function handleSwipe() {

    const difference =
        touchStartX -
        touchEndX;

    if (
        Math.abs(difference) < 50
    ) return;


    if (difference > 0) {

        // Swipe left
        if (
            currentMemory <
            memories.length - 1
        ) {

            changeMemory(
                currentMemory + 1
            );

        }

    }
    else {

        // Swipe right
        if (currentMemory > 0) {

            changeMemory(
                currentMemory - 1
            );

        }

    }
}


/* =========================================
   AUTOMATIC MEMORY SLIDES
========================================= */

function startMemories() {

    currentMemory = 0;

    changeMemory(0);

    let memoryTimer =
        setInterval(() => {

            if (
                currentMemory <
                memories.length - 1
            ) {

                changeMemory(
                    currentMemory + 1
                );

            }
            else {

                clearInterval(
                    memoryTimer
                );

                setTimeout(() => {

                    showScreen(
                        "typing"
                    );

                    startTyping();

                }, 1200);

            }

        }, 2800);
}


/* =========================================
   TYPING
========================================= */

const typingLines = [

    "From random conversations...",

    "to endless laughs...",

    "from silly arguments...",

    "to unforgettable memories...",

    "some friendships simply become a part of your story. ❤️"

];

let lineIndex = 0;


function startTyping() {

    typingText.textContent =
        "";

    lineIndex = 0;

    typeNextLine();

}


function typeNextLine() {

    if (
        lineIndex >=
        typingLines.length
    ) {

        setTimeout(() => {

            showScreen(
                "finalWish"
            );

        }, 1800);

        return;
    }


    const line =
        typingLines[
            lineIndex
        ];

    let charIndex = 0;

    typingText.textContent =
        "";


    const timer =
        setInterval(() => {

            typingText.textContent +=
                line.charAt(charIndex);

            charIndex++;


            if (
                charIndex >=
                line.length
            ) {

                clearInterval(timer);

                lineIndex++;

                setTimeout(
                    typeNextLine,
                    900
                );

            }

        }, 45);
}


/* =========================================
   FIREWORKS
========================================= */

wishButton.addEventListener(
    "click",
    startFireworks
);


function startFireworks() {

    const canvas =
        document.getElementById(
            "fireworks"
        );

    const ctx =
        canvas.getContext("2d");

    canvas.style.display =
        "block";


    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;


    let particles = [];

    let running = true;


    function createFirework(
        x,
        y
    ) {

        for (
            let i = 0;
            i < 80;
            i++
        ) {

            const angle =
                Math.random() *
                Math.PI * 2;

            const speed =
                Math.random() * 6 + 2;


            particles.push({

                x: x,

                y: y,

                vx:
                    Math.cos(angle)
                    * speed,

                vy:
                    Math.sin(angle)
                    * speed,

                life: 100,

                size:
                    Math.random()
                    * 3 + 1,

                hue:
                    Math.random()
                    * 360

            });

        }

    }


    function animate() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        particles.forEach(
            particle => {

                particle.x +=
                    particle.vx;

                particle.y +=
                    particle.vy;

                particle.vy +=
                    .05;

                particle.life--;


                ctx.globalAlpha =
                    particle.life / 100;

                ctx.fillStyle =
                    `hsl(
                        ${particle.hue},
                        100%,
                        65%
                    )`;


                ctx.beginPath();

                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );

                ctx.fill();

            }
        );


        particles =
            particles.filter(
                particle =>
                    particle.life > 0
            );


        if (
            running ||
            particles.length > 0
        ) {

            requestAnimationFrame(
                animate
            );

        }

    }


    let explosions = 0;


    const interval =
        setInterval(() => {

            createFirework(

                Math.random()
                * canvas.width,

                Math.random()
                * canvas.height
                * .55

            );


            explosions++;


            if (
                explosions >= 10
            ) {

                clearInterval(
                    interval
                );

                setTimeout(() => {

                    running = false;

                }, 3500);

            }

        }, 550);


    animate();

}