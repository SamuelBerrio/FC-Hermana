// Elementos del DOM
const playMusicBtn = document.getElementById('playMusic');
const audio = new Audio('cumpleaños.mp3');
let isPlaying = false;

// Reproducir/Pausar música al hacer clic en el botón
playMusicBtn.addEventListener('click', function() {
    if (!isPlaying) {
        audio.play();
        playMusicBtn.innerHTML = '⏸️ Pausar Canción';
    } else {
        audio.pause();
        playMusicBtn.innerHTML = '🎵 Reproducir Canción';
    }
    isPlaying = !isPlaying;
});

// Lógica del carrusel
const carouselItems = document.querySelectorAll('.carousel-item');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
let currentItem = 0;
let carouselInterval;

// Función para mostrar el elemento actual del carrusel
function showItem(index) {
    carouselItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

// Función para avanzar al siguiente elemento
function nextItem() {
    currentItem = (currentItem + 1) % carouselItems.length;
    showItem(currentItem);
}

// Función para retroceder al elemento anterior
function prevItem() {
    currentItem = (currentItem - 1 + carouselItems.length) % carouselItems.length;
    showItem(currentItem);
}

// Eventos de los botones del carrusel
nextButton.addEventListener('click', () => {
    nextItem();
    resetInterval();
});

prevButton.addEventListener('click', () => {
    prevItem();
    resetInterval();
});

// Auto-desplazamiento del carrusel cada 5 segundos
function startCarousel() {
    carouselInterval = setInterval(nextItem, 5000);
}

function resetInterval() {
    clearInterval(carouselInterval);
    startCarousel();
}

// Iniciar el carrusel
startCarousel();

// Deslizar en dispositivos táctiles
let startX = 0;
let isDragging = false;

const carousel = document.querySelector('.carousel');

carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

carousel.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    let currentX = e.touches[0].clientX;
    let diff = startX - currentX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            nextItem();
        } else {
            prevItem();
        }
        isDragging = false;
        resetInterval();
    }
});

carousel.addEventListener('touchend', () => {
    isDragging = false;
});

// Lógica del modal para el mensaje sorpresa
const modal = document.getElementById("myModal");
const btn = document.getElementById("surpriseButton");
const closeBtn = document.querySelector(".close");

btn.addEventListener('click', function() {
    modal.style.display = "block";
    modal.setAttribute('aria-hidden', 'false');
});

closeBtn.addEventListener('click', function() {
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
});

window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        modal.setAttribute('aria-hidden', 'true');
    }
});

// Accesibilidad para navegación con teclado
document.addEventListener('keydown', function(event) {
    if (modal.style.display === "block" && event.key === "Escape") {
        modal.style.display = "none";
        modal.setAttribute('aria-hidden', 'true');
    }
});

// Enfocar al primer elemento interactivo del modal al abrirlo
btn.addEventListener('click', function() {
    setTimeout(() => {
        closeBtn.focus();
    }, 100);
});

// Pausar música al cerrar el modal (si es necesario)
modal.addEventListener('hide', function() {
    if (isPlaying) {
        audio.pause();
        playMusicBtn.innerHTML = '🎵 Reproducir Canción';
        isPlaying = false;
    }
});

// Mejora de rendimiento: cargar imágenes del carrusel cuando se muestran
carouselItems.forEach((item) => {
    const img = item.querySelector('img');
    const src = img.getAttribute('data-src');
    if (src) {
        img.setAttribute('src', src);
        img.removeAttribute('data-src');
    }
});

// Lazy loading para imágenes (si no está soportado nativamente)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
        img.setAttribute('loading', 'lazy');
    });
} else {
    // Implementación de lazy loading con Intersection Observer
    const lazyImages = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.setAttribute('src', src);
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    lazyImages.forEach((img) => {
        imageObserver.observe(img);
    });
}
