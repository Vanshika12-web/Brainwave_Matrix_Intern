window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
function toggleMenu() {
    document.getElementById("sidebar-menu").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
}

function closeMenu() {
    document.getElementById("sidebar-menu").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
}

