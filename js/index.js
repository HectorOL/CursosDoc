// Controlar animaciones de burbujas sincronizadas con la imagen
document.addEventListener('DOMContentLoaded', function() {
    // Primera burbuja aparece desde la derecha (3.5s total)
    setTimeout(function() {
      document.getElementById('bubble1').classList.add('animate__animated', 'animate__fadeIn');
    }, 3500);
    
    // Segunda burbuja aparece desde la izquierda (3.7s total)
    setTimeout(function() {
      document.getElementById('bubble2').classList.add('animate__animated', 'animate__fadeIn');
    }, 3700);
});