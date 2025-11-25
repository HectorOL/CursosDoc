const menuIcon = document.getElementById("menu-icon");
const navLinks = document.querySelector(".nav-links");
const headerEl = document.querySelector('header');

const updateHeaderSpacing = () => {
    const isMobile = window.innerWidth <= 1000;
    const isOpen = navLinks.classList.contains('menu-active');
    if (isMobile && isOpen) {
        // Esperar al reflow para medir la altura del dropdown visible
        requestAnimationFrame(() => {
            const h = navLinks.offsetHeight || 0;
            headerEl.style.marginBottom = h + 'px';
        });
    } else {
        headerEl.style.marginBottom = '0px';
    }
};

menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("menu-active");
    showIcons();
    updateHeaderSpacing();
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
        // Cerrar menú y limpiar espaciado si se pasa a desktop
        navLinks.classList.remove('menu-active');
        headerEl.style.marginBottom = '0px';
    } else {
        icons.forEach(icon => {
            icon.style.display = "inline-block";
        });
    }
    updateHeaderSpacing();
});

// Efectos hover con animate.css
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.buttons a');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.3s ease';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Efectos hover para iconos de redes sociales
    const socialIcons = document.querySelectorAll('.social-networks a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.transition = 'transform 0.3s ease';
        });
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Efectos hover para elementos de navegación
    const navItems = document.querySelectorAll('.nav-links li');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
            this.style.transition = 'transform 0.3s ease';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Efecto hover para la imagen personal
    const personalImg = document.querySelector('.personal-img');
    if (personalImg) {
        personalImg.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        personalImg.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    updateHeaderSpacing();
});