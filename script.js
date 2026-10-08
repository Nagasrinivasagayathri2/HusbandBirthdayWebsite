/* =====================================================
   PAGE LOADER
===================================================== */

window.addEventListener("load", function () {

    const loader =
        document.getElementById("loader");

    setTimeout(function () {

        loader.classList.add("hide");

    }, 1000);

});



/* =====================================================
   NAVBAR
===================================================== */

const navbar =
    document.querySelector(".navbar");


window.addEventListener("scroll", function () {

    if (window.scrollY > 80) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});



/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn =
    document.getElementById("menuBtn");

const navMenu =
    document.getElementById("navMenu");


menuBtn.addEventListener(
    "click",
    function () {

        navMenu.classList.toggle("active");

    }
);



/* Close mobile menu after clicking */

document.querySelectorAll(
    "#navMenu a"
).forEach(function (link) {

    link.addEventListener(
        "click",
        function () {

            navMenu.classList.remove("active");

        }
    );

});



/* =====================================================
   START STORY
===================================================== */

function startStory() {

    document
        .getElementById("story")
        .scrollIntoView({
            behavior: "smooth"
        });

}



/* =====================================================
   IMAGE GALLERY
===================================================== */

/*
   All images used in the website.
   This lets the full-screen viewer move
   between photos.
*/

const galleryImages =
    Array.from(
        document.querySelectorAll(
            ".photo-card img"
        )
    );

let currentImageIndex = 0;



/* =====================================================
   OPEN IMAGE
===================================================== */

function openImage(src) {

    const viewer =
        document.getElementById(
            "imageViewer"
        );

    const largeImage =
        document.getElementById(
            "largeImage"
        );


    currentImageIndex =
        galleryImages.findIndex(
            function (image) {

                return image.src === src;

            }
        );


    if (currentImageIndex < 0) {

        currentImageIndex = 0;

    }


    largeImage.src = src;

    viewer.classList.add("active");

    document.body.style.overflow = "hidden";

}



/* =====================================================
   CLOSE IMAGE
===================================================== */

function closeImage() {

    const viewer =
        document.getElementById(
            "imageViewer"
        );

    viewer.classList.remove("active");

    document.body.style.overflow = "";

}



/* =====================================================
   NEXT IMAGE
===================================================== */

function nextImage() {

    if (galleryImages.length === 0) {
        return;
    }


    currentImageIndex++;

    if (
        currentImageIndex >=
        galleryImages.length
    ) {

        currentImageIndex = 0;

    }


    updateViewer();

}



/* =====================================================
   PREVIOUS IMAGE
===================================================== */

function previousImage() {

    if (galleryImages.length === 0) {
        return;
    }


    currentImageIndex--;

    if (currentImageIndex < 0) {

        currentImageIndex =
            galleryImages.length - 1;

    }


    updateViewer();

}



/* =====================================================
   UPDATE VIEWER
===================================================== */

function updateViewer() {

    const largeImage =
        document.getElementById(
            "largeImage"
        );


    largeImage.src =
        galleryImages[
            currentImageIndex
        ].src;

}



/* =====================================================
   CLICK OUTSIDE IMAGE
===================================================== */

document
    .getElementById("imageViewer")
    .addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                this
            ) {

                closeImage();

            }

        }
    );



/* =====================================================
   KEYBOARD CONTROLS
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        const viewer =
            document.getElementById(
                "imageViewer"
            );


        if (
            !viewer.classList.contains(
                "active"
            )
        ) {

            return;

        }


        if (event.key === "Escape") {

            closeImage();

        }


        if (
            event.key === "ArrowRight"
        ) {

            nextImage();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            previousImage();

        }

    }
);



/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".timeline-item, .memory-block, .about-inner, .family-content, .letter-paper"
    );


const revealObserver =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    function (element) {

        element.classList.add(
            "reveal"
        );

        revealObserver.observe(
            element
        );

    }
);



/* =====================================================
   FLOATING HEARTS
===================================================== */

function createHeart() {

    const heart =
        document.createElement(
            "div"
        );


    heart.innerHTML = "♥";


    heart.style.position =
        "fixed";

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.bottom =
        "-30px";

    heart.style.fontSize =
        12 + Math.random() * 18 + "px";

    heart.style.color =
        "#c17a8b";

    heart.style.opacity =
        "0.5";

    heart.style.pointerEvents =
        "none";

    heart.style.zIndex =
        "999";


    const duration =
        5 + Math.random() * 5;


    heart.style.transition =
        `transform ${duration}s linear, opacity ${duration}s linear`;


    document.body.appendChild(
        heart
    );


    requestAnimationFrame(
        function () {

            heart.style.transform =
                `translateY(-${window.innerHeight + 100}px) rotate(360deg)`;

            heart.style.opacity =
                "0";

        }
    );


    setTimeout(
        function () {

            heart.remove();

        },
        duration * 1000
    );

}


/*
   Keep the hearts subtle.
*/

setInterval(
    createHeart,
    3000
);