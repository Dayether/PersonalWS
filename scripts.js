// Scroll Visibility and Navigation
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= -100 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 100
    );
}
function handleScroll() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (isElementInViewport(section) && !section.classList.contains('visible') && !section.classList.contains('force-visible')) {
            section.classList.add('visible');
        }
    });
}
// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Ensure Home section is visible
    document.getElementById('dayether').classList.add('visible');
    // Check initial visibility
    handleScroll();
    // Fallback: Make all sections visible after 1 second
    setTimeout(() => {
        document.querySelectorAll('section').forEach(section => {
            if (!section.classList.contains('visible') && !section.classList.contains('force-visible')) {
                section.classList.add('visible');
            }
        });
    }, 1000);
});
// Scroll event
window.addEventListener('scroll', handleScroll);
// Navigation clicks
// Smooth Scrolling with Section-by-Section Animation
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        // Get all sections and calculate the current and target indices
        const sections = Array.from(document.querySelectorAll('section'));
        const currentSectionIndex = sections.findIndex(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
        });
        const targetSectionIndex = sections.findIndex(section => section.id === targetId);

        // If the target section is already in view, do nothing
        if (currentSectionIndex === targetSectionIndex) return;

        // Determine the scroll direction
        const scrollDirection = targetSectionIndex > currentSectionIndex ? 1 : -1;

        // Scroll through each section one by one
        let currentIndex = currentSectionIndex;
        const scrollStep = () => {
            if (currentIndex === targetSectionIndex) return; // Stop when the target section is reached

            currentIndex += scrollDirection;
            const nextSection = sections[currentIndex];
            nextSection.scrollIntoView({ behavior: 'smooth' });

            // Continue scrolling after a delay
            requestAnimationFrame(scrollStep); // Use requestAnimationFrame for smoother scrolling
        };

        scrollStep(); // Start scrolling immediately
    });
});
// Mobile Card Text Toggle
function toggleCardText(card) {
    const body = card.querySelector('.card-body, .skill-box-body');
    if (body) {
        body.classList.toggle('visible');
        body.style.opacity = body.classList.contains('visible') ? '1' : '0';
        body.style.visibility = body.classList.contains('visible') ? 'visible' : 'hidden';
    }
}
// Form Validation with SweetAlert Confirmation
function validateForm() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Show SweetAlert confirmation
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to invoke this message?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#4cc9f0',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, send it!'
        }).then((result) => {
            if (result.isConfirmed) {
                if (form.checkValidity()) {
                    Swal.fire({
                        title: 'Message Sent!',
                        text: 'Your message has been successfully sent.',
                        icon: 'success',
                        confirmButtonColor: '#4cc9f0'
                    });
                    form.reset();
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Please fill out all required fields.',
                        icon: 'error',
                        confirmButtonColor: '#d33'
                    });
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.card, .skill-box').forEach(card => {
        card.addEventListener('touchstart', () => toggleCardText(card));
    });
    validateForm();
});

// Particle Animation
const canvas = document.getElementById("invoker-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
const colors = {
    quas: "#4cc9f0",
    wex: "#b14cff",
    exort: "#ffa63d"
};
for (let i = 0; i < 100; i++) {
    const type = ["quas", "wex", "exort"][Math.floor(Math.random() * 3)];
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 7 + 5,
        color: colors[type],
        type: type,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        alpha: Math.random() * 0.3 + 0.7,
        pulse: Math.random() * Math.PI * 2,
        trail: []
    });
}
function drawParticle(p) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.imageSmoothingEnabled = true;
    ctx.shadowBlur = 15;
    ctx.shadowColor = p.color;
    if (p.type === "quas") {
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, `rgba(76, 201, 240, ${p.alpha})`);
        gradient.addColorStop(1, `rgba(76, 201, 240, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.radius, p.radius * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
        p.trail.forEach((t, i) => {
            ctx.globalAlpha = p.alpha * (1 - i / p.trail.length) * 0.5;
            ctx.beginPath();
            ctx.arc(t.x, t.y, p.radius * 0.5, 0, Math.PI * 2);
            ctx.fill();
        });
    } else if (p.type === "wex") {
        ctx.fillStyle = p.color;
        const angle = Math.random() * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(p.x + p.radius * Math.cos(angle), p.y + p.radius * Math.sin(angle));
        ctx.lineTo(
            p.x + p.radius * Math.cos(angle + (2 * Math.PI) / 3),
            p.y + p.radius * Math.sin(angle + (2 * Math.PI) / 3)
        );
        ctx.lineTo(
            p.x + p.radius * Math.cos(angle + (4 * Math.PI) / 3),
            p.y + p.radius * Math.sin(angle + (4 * Math.PI) / 3)
        );
        ctx.closePath();
        ctx.fill();
        p.trail.forEach((t, i) => {
            ctx.globalAlpha = p.alpha * (1 - i / p.trail.length) * 0.3;
            ctx.beginPath();
            ctx.arc(t.x, t.y, p.radius * 0.3, 0, Math.PI * 2);
            ctx.fill();
        });
    } else if (p.type === "exort") {
        const gradient = ctx.createLinearGradient(p.x, p.y - p.radius, p.x, p.y + p.radius);
        gradient.addColorStop(0, `rgba(255, 166, 61, ${p.alpha})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${p.alpha * 0.8})`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.radius * 0.6, p.radius, 0, 0, Math.PI * 2);
        ctx.fill();
        p.trail.forEach((t, i) => {
            ctx.globalAlpha = p.alpha * (1 - i / p.trail.length) * 0.4;
            ctx.beginPath();
            ctx.arc(t.x, t.y, p.radius * 0.4, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.restore();
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        if (p.type === "quas") {
            p.alpha = 0.7 + Math.sin(p.pulse) * 0.2;
            p.pulse += 0.05;
        } else if (p.type === "wex") {
            p.alpha = 0.7 + Math.random() * 0.3;
        }
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 5) p.trail.shift();
        drawParticle(p);
    });
    requestAnimationFrame(animate);
}
animate();
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Animation for Projects Section Boxes
function animateProjects() {
    const projectBoxes = document.querySelectorAll('.project-box');
    projectBoxes.forEach(box => {
        const rect = box.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top <= windowHeight - 100) {
            box.style.opacity = 1;
            box.style.transform = 'translateY(0) scale(1)';
            box.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        } else {
            box.style.opacity = 0;
            box.style.transform = 'translateY(50px) scale(0.95)';
            box.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    animateProjects();
});

window.addEventListener('scroll', () => {
    animateProjects();
});

// Enhanced Entrance Animations for All Sections
function animateSectionsOnScroll() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        if (rect.top <= windowHeight - 100 && !section.classList.contains('visible')) {
            section.classList.add('visible');
            if (section.dataset.animation) {
                section.style.animationName = section.dataset.animation;
                section.style.animationDuration = '1.5s'; // Make animations longer
                section.style.animationTimingFunction = 'ease-out'; // Smooth easing
                section.style.animationIterationCount = '1'; // Play once
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', animateSectionsOnScroll);
window.addEventListener('scroll', animateSectionsOnScroll);