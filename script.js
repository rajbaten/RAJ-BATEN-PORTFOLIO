/* =====================================================
   PRELOADER
===================================================== */

window.addEventListener("load", () => {

    const preloader = document.querySelector(".preloader");

    setTimeout(() => {
        preloader.classList.add("hide");
    }, 700);

});


/* =====================================================
   MOUSE LIGHT
===================================================== */

const mouseLight = document.querySelector(".mouse-light");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let currentX = mouseX;
let currentY = mouseY;

window.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

});


function animateMouseLight() {

    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    mouseLight.style.left = `${currentX}px`;
    mouseLight.style.top = `${currentY}px`;

    requestAnimationFrame(animateMouseLight);

}

animateMouseLight();


/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");

menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

    });

});


/* =====================================================
   WATER RIPPLE
===================================================== */

document.addEventListener("click", (event) => {

    const target = event.target.closest(".ripple");

    if (!target) return;


    const ripple = document.createElement("span");

    ripple.classList.add("ripple-effect");


    const rect = target.getBoundingClientRect();

    const size =
        Math.max(rect.width, rect.height) * 1.2;


    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;


    ripple.style.left =
        `${event.clientX - rect.left - size / 2}px`;

    ripple.style.top =
        `${event.clientY - rect.top - size / 2}px`;


    target.appendChild(ripple);


    setTimeout(() => {

        ripple.remove();

    }, 900);

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   PORTFOLIO 3D GLASS MOVEMENT
===================================================== */

document.querySelectorAll(".project-card").forEach(card => {

    card.addEventListener("mousemove", (event) => {

        if (window.innerWidth < 900) return;

        const rect = card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;


        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;


        const rotateX =
            ((y - centerY) / centerY) * -2.5;

        const rotateY =
            ((x - centerX) / centerX) * 2.5;


        card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "";

    });

});


/* =====================================================
   VIDEO MODAL
===================================================== */

const modal =
    document.querySelector(".video-modal");

const modalVideo =
    document.querySelector(".modal-video");

const modalTitle =
    document.querySelector(".modal-title");

const modalDescription =
    document.querySelector(".modal-description");

const modalClose =
    document.querySelector(".modal-close");

const modalBackdrop =
    document.querySelector(".modal-backdrop");


const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach(card => {

    card.addEventListener("click", () => {

        const video =
            card.dataset.video;

        const title =
            card.dataset.title;

        const description =
            card.dataset.description;


        if (!video) return;


        modalVideo.src = video;

        modalTitle.textContent = title;

        modalDescription.textContent =
            description;


        modal.classList.add("active");

        document.body.classList.add("modal-open");


        modalVideo.currentTime = 0;

        modalVideo.play().catch(() => {});

    });

});


function closeModal() {

    modal.classList.remove("active");

    document.body.classList.remove("modal-open");

    modalVideo.pause();

    modalVideo.removeAttribute("src");

    modalVideo.load();

}


modalClose.addEventListener(
    "click",
    closeModal
);


modalBackdrop.addEventListener(
    "click",
    closeModal
);


document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        modal.classList.contains("active")
    ) {

        closeModal();

    }

});


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.querySelector(".contact-form");

const formMessage =
    document.querySelector(".form-message");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const name =
        contactForm.querySelector(
            'input[name="name"]'
        ).value;


    formMessage.textContent =
        `Thank you, ${name}. Your inquiry has been received.`;


    contactForm.reset();


    setTimeout(() => {

        formMessage.textContent = "";

    }, 5000);

});


/* =====================================================
   NAVBAR BACKGROUND ON SCROLL
===================================================== */

const navbar =
    document.querySelector(".navbar");


window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        navbar.style.background =
            "rgba(5,7,10,0.82)";

        navbar.style.borderColor =
            "rgba(255,255,255,0.14)";

    } else {

        navbar.style.background =
            "rgba(8,10,14,0.62)";

        navbar.style.borderColor =
            "rgba(255,255,255,0.1)";

    }

});


/* =====================================================
   IMAGE LOADING EFFECT
===================================================== */

document.querySelectorAll(".project-image img").forEach(img => {

    img.addEventListener("load", () => {

        img.style.opacity = "1";

    });

});


/* =====================================================
   HOVER MOUSE LIGHT
===================================================== */

document.querySelectorAll(
    ".glass-button, .project-card, .service-card"
).forEach(element => {

    element.addEventListener("mouseenter", () => {

        mouseLight.style.width = "420px";
        mouseLight.style.height = "420px";

    });


    element.addEventListener("mouseleave", () => {

        mouseLight.style.width = "300px";
        mouseLight.style.height = "300px";

    });

});


/* =====================================================
   SMOOTH ANCHOR OFFSET
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

        const targetId =
            this.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }


        const target =
            document.querySelector(targetId);


        if (!target) return;


        event.preventDefault();


        const navbarHeight =
            document.querySelector(".navbar")
                .offsetHeight;


        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight -
            20;


        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});