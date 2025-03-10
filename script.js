document.addEventListener("DOMContentLoaded", function () {
    const perfilHeaders = document.querySelectorAll(".perfil-header");

    perfilHeaders.forEach(button => {
        const perfil = button.parentElement;
        const perfilImagen = perfil.querySelector(".perfil-imagen");

        if (perfilImagen) {
            // Bandera para evitar que la animación se repita si el mouse sigue dentro del botón
            let imagenVisible = false;

            // Evento cuando el mouse entra en el título del perfil
            button.addEventListener("mouseenter", function () {
                if (!perfil.classList.contains("active") && !imagenVisible) {
                    imagenVisible = true;
                    perfilImagen.style.display = "block";
                    perfilImagen.style.opacity = "0";
                    perfilImagen.style.transform = "rotateY(180deg) scale(0.5)";

                    setTimeout(() => {
                        perfilImagen.style.transition = "transform 0.6s ease, opacity 0.6s ease";
                        perfilImagen.style.opacity = "1";
                        perfilImagen.style.transform = "rotateY(0deg) scale(1)";
                    }, 10);
                }
            });

            // Evento cuando el mouse sale COMPLETAMENTE del botón del perfil
            button.addEventListener("mouseleave", function () {
                imagenVisible = false;
                perfilImagen.style.transition = "transform 0.6s ease, opacity 0.6s ease";
                perfilImagen.style.opacity = "0";
                perfilImagen.style.transform = "rotateY(180deg) scale(0.5)";

                setTimeout(() => {
                    if (!imagenVisible) {
                        perfilImagen.style.display = "none";
                    }
                }, 600);
            });
        }
    });

    // Lógica para expandir el perfil
    perfilHeaders.forEach(button => {
        button.addEventListener("click", function (event) {
            event.stopPropagation();

            const perfil = this.parentElement;
            const perfilInfo = perfil.querySelector(".perfil-info");
            const perfilImagen = perfil.querySelector(".perfil-imagen");
            const isExpanded = perfil.classList.contains("active");

            // Cierra todos los perfiles antes de abrir el actual
            document.querySelectorAll(".perfil").forEach(p => {
                p.classList.remove("active");
                p.querySelector(".perfil-info").style.display = "none";
                p.querySelector(".perfil-header span").textContent = "+";
                if (p.querySelector(".perfil-imagen")) {
                    p.querySelector(".perfil-imagen").style.opacity = "0";
                    p.querySelector(".perfil-imagen").style.transform = "rotateY(180deg) scale(0.5)";
                    setTimeout(() => {
                        p.querySelector(".perfil-imagen").style.display = "none";
                    }, 600);
                }
            });

            // Si no estaba expandido, lo abrimos
            if (!isExpanded) {
                perfil.classList.add("active");
                perfilInfo.style.display = "block";
                this.querySelector("span").textContent = "−";

                // Ocultar la imagen si la información está expandida
                if (perfilImagen) {
                    perfilImagen.style.opacity = "0";
                    perfilImagen.style.transform = "rotateY(180deg) scale(0.5)";
                    setTimeout(() => {
                        perfilImagen.style.display = "none";
                    }, 600);
                }
            }
        });
    });

    // Cierra la información si se hace clic fuera de los perfiles
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".perfil")) {
            document.querySelectorAll(".perfil").forEach(perfil => {
                perfil.classList.remove("active");
                perfil.querySelector(".perfil-info").style.display = "none";
                perfil.querySelector(".perfil-header span").textContent = "+";
                perfil.querySelector(".perfil-imagen").style.opacity = "0";
                perfil.querySelector(".perfil-imagen").style.transform = "rotateY(180deg) scale(0.5)";
                setTimeout(() => {
                    perfil.querySelector(".perfil-imagen").style.display = "none";
                }, 600);
            });
        }
    });

    // Si se hace clic en la imagen, que desaparezca
    document.querySelectorAll(".perfil-imagen").forEach(imagen => {
        imagen.addEventListener("click", function () {
            this.style.transition = "transform 0.6s ease, opacity 0.6s ease";
            this.style.opacity = "0";
            this.style.transform = "rotateY(180deg) scale(0.5)";

            setTimeout(() => {
                this.style.display = "none";
            }, 600);
        });
    });
});


        const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100vw";
canvas.style.height = "100vh";
canvas.style.pointerEvents = "none";
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let particles = [];
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    for (let i = 0; i < 3; i++) {
        particles.push(new Particle(mouse.x, mouse.y, false));
    }
});

window.addEventListener("click", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    for (let i = 0; i < 20; i++) {
        particles.push(new Particle(mouse.x, mouse.y, true));
    }
});

class Particle {
    constructor(x, y, isClick) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * (isClick ? 2.5 : 1.5) + 0.5; // MÁS PEQUEÑAS
        this.life = 1;
        this.velocityX = (Math.random() - 0.5) * (isClick ? 5 : 1.5);
        this.velocityY = (Math.random() - 0.5) * (isClick ? 5 : 1.5);
        this.color = isClick ? this.randomColor() : "rgba(138, 43, 226, 1)";
    }

    randomColor() {
        const colors = ["rgba(255, 87, 51, 1)", "rgba(46, 204, 113, 1)", "rgba(52, 152, 219, 1)", "rgba(241, 196, 15, 1)"];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.life -= 0.03;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (particle.life <= 0) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

animate();





 

document.addEventListener("DOMContentLoaded", () => {
    const tarjetas = document.querySelectorAll(".tarjeta");

    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener("click", () => {
            const tarjetaInner = tarjeta.querySelector(".tarjeta-inner");
            tarjetaInner.classList.toggle("volteada");
        });
    });
});



document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    // Animación para las secciones (Visión, Misión, Sobre Nosotros, etc.)
    gsap.from(".contenedor", {
        opacity: 0,
        y: 50, // Se mueve desde abajo hacia arriba
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".contenedor",
            start: "top 80%", // Se activa cuando el 80% del elemento entra en pantalla
            toggleActions: "play none none reverse" // La animación se revierte cuando se hace scroll hacia arriba
        }
    });

    // Animación para los perfiles
    gsap.from(".perfil", {
        opacity: 0,
        x: (index) => (index % 2 === 0 ? -100 : 100), // Alterna entre izquierda y derecha
        duration: 1.2,
        ease: "elastic.out(1, 0.3)", // Efecto rebote suave
        stagger: 0.3, // Retraso entre cada perfil
        scrollTrigger: {
            trigger: ".perfil-container",
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });

    // Animación para el título de la página
    gsap.from("header h1", {
        opacity: 0,
        scale: 0.5, // Aparece desde más pequeño
        duration: 1.5,
        ease: "back.out(1.7)"
    });

    // Animación para los iconos superiores
    gsap.from(".top-icons i", {
        opacity: 0,
        y: -30, // Baja desde arriba
        duration: 1,
        ease: "bounce.out",
        stagger: 0.2
    });

    // Animación para los servicios (tarjetas)
    gsap.from(".tarjeta", {
        opacity: 0,
        scale: 0.5, // Aparecen como si "explotaran"
        duration: 1,
        ease: "power4.out",
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".servicios-contenedor",
            start: "top 85%"
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const carouselImages = document.querySelectorAll(".carousel-img");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let currentIndex = 0;

    function updateCarousel(direction) {
        gsap.to(carouselImages[currentIndex], {
            y: direction === "up" ? -100 : 100,
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                // Pausar video si es necesario
                if (carouselImages[currentIndex].tagName === "VIDEO") {
                    carouselImages[currentIndex].pause();
                }

                carouselImages[currentIndex].classList.remove("active");

                currentIndex = (direction === "up")
                    ? (currentIndex + 1) % carouselImages.length
                    : (currentIndex - 1 + carouselImages.length) % carouselImages.length;

                carouselImages[currentIndex].classList.add("active");

                gsap.fromTo(carouselImages[currentIndex], 
                    { y: direction === "up" ? 100 : -100, opacity: 0 }, 
                    { y: 0, opacity: 1, duration: 0.5 });

                // Reproducir video si es necesario
                if (carouselImages[currentIndex].tagName === "VIDEO") {
                    carouselImages[currentIndex].play();
                }
            }
        });
    }

    nextBtn.addEventListener("click", function () {
        updateCarousel("up");
    });

    prevBtn.addEventListener("click", function () {
        updateCarousel("down");
    });

    // Click en la imagen para hacerla la principal
    carouselImages.forEach((img, index) => {
        img.addEventListener("click", function () {
            if (index !== currentIndex) {
                currentIndex = index;
                updateCarousel("up");
            }
        });
    });

    // Animación de entrada para el título
    gsap.from(".titulo-productos", {
        opacity: 0,
        y: -20,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".titulo-productos",
            start: "top 85%",
            toggleActions: "play none none reverse",
        }
    });

    // Asegurar que el video inicial se reproduzca si es un video
    if (carouselImages[currentIndex].tagName === "VIDEO") {
        carouselImages[currentIndex].play();
    }
});
