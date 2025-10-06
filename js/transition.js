// Transiciones suaves para navegación
document.addEventListener('DOMContentLoaded', function() {
    // Solo aplicar transiciones a enlaces internos
    const navLinks = document.querySelectorAll('nav a[href^="../"], nav a[href^="./"], nav a[href^="/"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Solo aplicar transición si es un enlace interno válido
            if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                e.preventDefault();
                
                // Agregar transición de salida
                document.body.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
                document.body.style.opacity = '0';
                document.body.style.transform = 'translateY(-20px)';
                
                // Navegar después de la transición
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
});