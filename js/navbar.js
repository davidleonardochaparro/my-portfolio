const siteNavbar = document.querySelector("#site-navbar");
const navCollapse = document.querySelector("#navbarNavAltMarkup");
const navToggler = document.querySelector(".navbar-toggler");
const navLinks = document.querySelectorAll(".nav-link");

let hideNavbarTimer;
let isNavbarHovered = false;

function clearHideTimer() {
    clearTimeout(hideNavbarTimer);
}

function showNavbar() {
    siteNavbar.classList.remove("navbar-hidden");
}

function hideNavbarAfterInactivity() {
    clearHideTimer();

    if (isNavbarHovered || window.scrollY <= 70) {
        return;
    }

    hideNavbarTimer = setTimeout(() => {
        siteNavbar.classList.add("navbar-hidden");
    }, 1500);
}

function handleScroll() {
    showNavbar();

    if (window.scrollY <= 70) {
        clearHideTimer();
        return;
    }

    hideNavbarAfterInactivity();
}

window.addEventListener("scroll", handleScroll, { passive: true });

siteNavbar.addEventListener("mouseenter", () => {
    isNavbarHovered = true;
    clearHideTimer();
    showNavbar();
});

siteNavbar.addEventListener("mouseleave", () => {
    isNavbarHovered = false;
    hideNavbarAfterInactivity();
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        showNavbar();
        clearHideTimer();

        if (navCollapse && navCollapse.classList.contains("show")) {
            navCollapse.classList.remove("show");
        }

        if (navToggler) {
            navToggler.classList.add("collapsed");
            navToggler.setAttribute("aria-expanded", "false");
        }

        if (window.scrollY > 70) {
            hideNavbarAfterInactivity();
        }
    });
});

window.addEventListener("load", () => {
    showNavbar();
    handleScroll();
});

const mailButton = document.querySelector('[data-bs-toggle="popover"]');
new bootstrap.Popover(mailButton, {
    container: "body",
    placement: () => window.matchMedia("(max-width: 767.98px)").matches
        ? "bottom"
        : "right",
    fallbackPlacements: [],
    html: true,
    sanitize: false
});

document.addEventListener("click", async (event) => {
    if (!event.target.matches(".copy-email")) {
        return;
    }

    await navigator.clipboard.writeText("davidlr.626@gmail.com");
    event.target.textContent = "Copied!";
});