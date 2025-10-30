document.addEventListener('DOMContentLoaded', () => {

    /* ===== Animación de Texto (Typing Effect) ===== */
    const typingText = document.querySelector('.typing-text');
    const texts = ["Web Developer", "Java Full-Stack", "Científica de Datos"]; // Ajustado para un texto más corto y directo
    
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

    /* ===== Resaltado de Navegación Activa al Hacer Scroll ====== */
    function highlightNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const headerElement = document.querySelector('.header');
        const headerHeight = headerElement ? headerElement.offsetHeight : 0; 
        
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