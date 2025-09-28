// Aplica el modo oscuro lo antes posible
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark');
}

document.addEventListener('DOMContentLoaded', function() {
	const toggle = document.querySelector('.dark-mode-toggle');
	
	if (localStorage.getItem('darkMode') === 'enabled') {
		document.body.classList.add('dark');
	}
	
	toggle?.addEventListener('click', function() {
		toggle.style.transform = 'scale(0.9)';
		toggle.style.transition = 'transform 0.2s ease-in-out';
		
		setTimeout(() => {
			toggle.style.transform = 'scale(1)';
		}, 100);
		
		document.body.classList.toggle('dark');
		

		if (document.body.classList.contains('dark')) {
			localStorage.setItem('darkMode', 'enabled');
		} else {
			localStorage.setItem('darkMode', 'disabled');
		}
		
	
		const allElements = document.querySelectorAll('*');
		allElements.forEach(element => {
			element.style.transition = 'background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease';
		});
		
		setTimeout(() => {
			allElements.forEach(element => {
				element.style.transition = '';
			});
		}, 400);
	});
});
