// Aplica el modo oscuro lo antes posible
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark');
}

// Modo oscuro
document.addEventListener('DOMContentLoaded', function() {
	const toggle = document.querySelector('.dark-mode-toggle');
	
	if (localStorage.getItem('darkMode') === 'enabled') {
		document.body.classList.add('dark');
	}
	toggle?.addEventListener('click', function() {
		document.body.classList.toggle('dark');
		
		if (document.body.classList.contains('dark')) {
			localStorage.setItem('darkMode', 'enabled');
		} else {
			localStorage.setItem('darkMode', 'disabled');
		}
	});
});
