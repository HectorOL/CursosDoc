const menuIcon = document.getElementById("menu-icon");
const navLinks = document.querySelector(".nav-links");
menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("menu-active");
    showIcons();
});

const showIcons = () => {
    const icons = document.querySelectorAll(".disable-icons");
    icons.forEach(icon => {
        icon.style.display = "inline-block";
    });
};

window.addEventListener("resize", () => {
    const icons = document.querySelectorAll(".nav-links li i");
    if (window.innerWidth > 1000) {
        icons.forEach(icon => {
            icon.style.display = "none";
        });
    } else {
        icons.forEach(icon => {
            icon.style.display = "inline-block";
        });
    }
});