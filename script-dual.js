document.addEventListener('DOMContentLoaded', () => {

    /* ===== LÓGICA DEL INTERRUPTOR DE TEMA (Invertida) ===== */
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // 1. Revisa si "science" está guardado (Tech es el default, así que no se guarda)
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'science') {
        body.classList.add('science-mode');
        themeToggle.checked = true; // Marca el interruptor si está en modo ciencia
    }

    // 2. Añade el listener al interruptor
    themeToggle.addEventListener('change', () => {
        body.classList.toggle('science-mode'); // Activa/desactiva el modo ciencia
        
        // 3. Guarda la preferencia en localStorage
        if (body.classList.contains('science-mode')) {
            localStorage.setItem('theme', 'science');
        } else {
            // Limpia el storage si vuelve al default (Tech)
            localStorage.setItem('theme', 'tech'); // O puedes usar localStorage.removeItem('theme');
        }
    });


    /* ===== Animación de Texto (Typing Effect) ===== */
    // ... (Tu código de 'type' no necesita cambios) ...
    const typingText = document.querySelector('.typing-text');
    const texts = ["Desarrolladora Java Full-Stack", "Científica de datos en formación", "Apasionada por la ciencia y la tecnología"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        let displayText = '';

        if (isDeleting) {
            displayText = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            displayText = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        typingText.textContent = displayText;

        let typeSpeed = isDeleting ? 100 : 200;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    if (typingText) {
        type();
    }

    /* ===== Resaltado de Navegación Activa al Hacer Scroll ===== */
    // ... (Tu código de 'highlightNavLink' no necesita cambios) ...
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.header').offsetHeight;

    function highlightNavLink() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - headerHeight - 50;
            const sectionId = current.getAttribute('id');

            const currentLink = document.querySelector('.nav-link[href*=' + sectionId + ']');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active-link'));
                if (currentLink) {
                    currentLink.classList.add('active-link');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
});