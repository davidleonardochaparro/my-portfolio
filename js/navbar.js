const siteNavbar = document.querySelector("#site-navbar");
let hideNavbarTimer;
let isNavbarHovered = false;

function hideNavbarAfterInactivity() {
    clearTimeout(hideNavbarTimer);

    if (window.scrollY <= 70 || isNavbarHovered) {
        return;
    }

    hideNavbarTimer = setTimeout(() => {
        siteNavbar.classList.add("navbar-hidden");
    }, 1000);
}

function showNavbarWhileScrolling() {
    siteNavbar.classList.remove("navbar-hidden");
    hideNavbarAfterInactivity();
}

window.addEventListener("scroll", showNavbarWhileScrolling, { passive: true });
siteNavbar.addEventListener("mouseenter", () => {
    isNavbarHovered = true;
    clearTimeout(hideNavbarTimer);
    siteNavbar.classList.remove("navbar-hidden");
});
siteNavbar.addEventListener("mouseleave", () => {
    isNavbarHovered = false;
    hideNavbarAfterInactivity();
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