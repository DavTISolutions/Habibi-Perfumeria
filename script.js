document.addEventListener('DOMContentLoaded', () => {

    /* ===========================================================
       1. MENÚ MÓVIL (Hamburguesa)
    =========================================================== */
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Cambiar ícono de hamburguesa a X
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Cerrar menú automáticamente al hacer clic en un enlace
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
       2. SCROLL REVEAL (Animaciones de entrada)
    =========================================================== */
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '40px',
            duration: 1000,
            delay: 100,
            easing: 'ease-in-out',
            reset: false
        });

        sr.reveal('.sr-item', { interval: 150 });
        sr.reveal('.section-title', { delay: 50 });
        sr.reveal('.hero-content', { delay: 200, distance: '60px' });
    }

    /* ===========================================================
       3. SWIPER (CARRUSEL DE PRODUCTOS) - CONFIGURACIÓN MÓVIL
    =========================================================== */
    setTimeout(() => {
        if (typeof Swiper !== 'undefined') {
            const swiper = new Swiper('.swiper-container', {
                // Parámetros Generales
                loop: true,
                speed: 600,
                grabCursor: true,
                observer: true,
                observeParents: true,

                // Paginación y Flechas
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                // Configuración Adaptativa
                breakpoints: {
                    // Celulares
                    0: {
                        slidesPerView: 1.15,
                        spaceBetween: 15,
                        centeredSlides: true
                    },
                    // Tablets
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                        centeredSlides: false
                    },
                    // Desktop / Laptop
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                        centeredSlides: false
                    }
                }
            });
        }
    }, 100);

    /* ===========================================================
       4. IMAGE CYCLER (Rotación automática de fotos del producto)
    =========================================================== */
    const cyclers = document.querySelectorAll('.image-cycler');

    cyclers.forEach(cycler => {
        const images = cycler.querySelectorAll('img');

        // Seguridad: Asegurar que al menos la primera imagen sea visible
        if (images.length > 0) {
            let hasActive = false;
            images.forEach(img => {
                if (img.classList.contains('active-image')) hasActive = true;
            });
            if (!hasActive) images[0].classList.add('active-image');
        }

        // Solo iniciar el ciclo si hay más de 1 imagen
        if (images.length > 1) {
            let currentIndex = 0;
            // Obtener intervalo personalizado del HTML o usar 3 segs por defecto
            const intervalTime = parseInt(cycler.getAttribute('data-cycle-interval')) || 3000;

            images.forEach((img, i) => {
                if (img.classList.contains('active-image')) currentIndex = i;
            });

            setInterval(() => {
                // Ocultar imagen actual
                images[currentIndex].classList.remove('active-image');
                images[currentIndex].classList.add('inactive-image');

                // Calcular siguiente índice
                currentIndex = (currentIndex + 1) % images.length;

                // Mostrar siguiente imagen
                images[currentIndex].classList.remove('inactive-image');
                images[currentIndex].classList.add('active-image');
            }, intervalTime);
        }
    });

    /* ===========================================================
       5. CONFIGURACIÓN DINÁMICA DE WHATSAPP (Nueva Función)
    =========================================================== */
    // Configura aquí tu número (código país + número)
    const whatsappNumber = '9871044515';

    const buyButtons = document.querySelectorAll('.buy-btn');

    buyButtons.forEach(btn => {
        // Encontrar la tarjeta del producto padre
        const card = btn.closest('.product-card');
        if (card) {
            // Extraer nombre y precio
            const productName = card.querySelector('h3').innerText.trim();
            const productPrice = card.querySelector('.price').innerText.trim();

            // Crear mensaje personalizado
            const message = `Hola Habibi Perfumeria, me interesa comprar: ${productName} con precio de ${productPrice}. ¿Tienen disponibilidad?`;

            // Generar enlace
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            // Asignar al botón y abrir en nueva pestaña
            btn.href = whatsappUrl;
            btn.target = "_blank";
        }
    });

});