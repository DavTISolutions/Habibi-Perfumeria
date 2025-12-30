document.addEventListener('DOMContentLoaded', () => {

    /* ===========================================================
       1. MENÚ MÓVIL
    =========================================================== */
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Cerrar al hacer click en link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    /* ===========================================================
       2. SCROLL REVEAL (Animaciones)
    =========================================================== */
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '50px',
            duration: 1200,
            delay: 100,
            easing: 'cubic-bezier(0.5, 0, 0, 1)', // Movimiento más elegante
            reset: false
        });

        sr.reveal('.sr-item', { interval: 150 });
        sr.reveal('.section-title', { delay: 50 });

        // Animación para los productos (Zig Zag)
        // Alternamos el origen de la animación según si es par o impar
        document.querySelectorAll('.showcase-item').forEach((item, index) => {
            let originSide = index % 2 === 0 ? 'left' : 'right';

            // En móvil, siempre desde abajo para no marear
            if (window.innerWidth < 768) originSide = 'bottom';

            sr.reveal(item, {
                origin: originSide,
                distance: '60px',
                delay: 200,
                viewFactor: 0.3 // Se anima cuando el 30% del elemento es visible
            });
        });
    }

    /* ===========================================================
       3. WHATSAPP DINÁMICO
    =========================================================== */
    const whatsappNumber = '9871044515';
    const buyButtons = document.querySelectorAll('.buy-btn');
    const mainWhatsappBtn = document.querySelector('.whatsapp-main');

    // Botón general de contacto
    if (mainWhatsappBtn) {
        mainWhatsappBtn.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola Habibi Perfumeria, me gustaría recibir asesoría personalizada.")}`;
    }

    // Botones de cada producto
    buyButtons.forEach(btn => {
        // Buscamos el contenedor padre .showcase-text
        const textContainer = btn.closest('.showcase-text');

        if (textContainer) {
            const productName = textContainer.querySelector('h3').innerText.trim();
            const productPrice = textContainer.querySelector('.price').innerText.trim();

            const message = `Hola, estoy cautivado/a por el perfume *${productName}* (${productPrice}). ¿Podrían darme más detalles para adquirirlo?`;

            btn.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            btn.target = "_blank";
        }
    });

});