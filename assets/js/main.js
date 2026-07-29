/* WAXIS — Animações, Canvas Neural e Controladores JS */

document.addEventListener("DOMContentLoaded", () => {
  // --- 0. CANVAS INTERATIVO DE REDE NEURAL (Efeito de Pontos Conectados no Mouse) ---
  const canvas = document.createElement("canvas");
  canvas.id = "neural-canvas";
  document.body.prepend(canvas);
  const ctx = canvas.getContext("2d");

  let width, height;
  let particles = [];
  const particleCount = 45;
  const maxDistance = 140;

  let mouse = { x: null, y: null, radius: 180 };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
  });

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = document.body.scrollHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(104, 0, 224, 0.4)";
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // Conexão com o mouse
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - particles[i].x;
        const dy = mouse.y - particles[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(139, 61, 255, ${0.35 * (1 - dist / mouse.radius)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Conexão entre partículas próximas
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(104, 0, 224, ${0.15 * (1 - dist / maxDistance)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // --- Lenis Smooth Scroll ---
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  gsap.registerPlugin(ScrollTrigger);
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // --- 1. HERO ANIMATION ---
  const heroTl = gsap.timeline({
    defaults: { ease: "power3.out", duration: 1 }
  });

  heroTl.from(".hero-badge", { y: -20, opacity: 0, delay: 0.2 })
        .from(".hero-title", { y: 40, opacity: 0 }, "-=0.6")
        .from(".hero-subtitle", { y: 30, opacity: 0 }, "-=0.6")
        .from(".hero-cta", { y: 20, opacity: 0 }, "-=0.6")
        .from(".hero-mockup", { y: 80, scale: 0.95, opacity: 0, duration: 1.2 }, "-=0.4");

  gsap.to(".hero-mockup", {
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: true
    },
    y: 60,
    scale: 0.98
  });

  // --- 2. CENTERPIECE ---
  const centerpieceTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".centerpiece-section",
      start: "top top",
      end: "+=150%",
      pin: true,
      scrub: 1,
      anticipatePin: 1
    }
  });

  centerpieceTl
    .to(".centerpiece-state-1", { opacity: 0, y: -30, duration: 0.8 })
    .fromTo(".centerpiece-state-2", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, "-=0.3")
    .fromTo(".centerpiece-dashboard", { scale: 0.9, opacity: 0.5 }, { scale: 1, opacity: 1, duration: 1.2 }, "-=0.8");

  // --- 3. CONVERGÊNCIA OMNICHANNEL ---
  gsap.from(".omnichannel-channel-left", {
    scrollTrigger: {
      trigger: ".omnichannel-section",
      start: "top 80%",
      end: "top 30%",
      scrub: 1
    },
    x: -120,
    opacity: 0
  });

  gsap.from(".omnichannel-channel-right", {
    scrollTrigger: {
      trigger: ".omnichannel-section",
      start: "top 80%",
      end: "top 30%",
      scrub: 1
    },
    x: 120,
    opacity: 0
  });

  // --- 4. TOUR DA PLATAFORMA (Scrollytelling sem Bugs) ---
  const tourItems = document.querySelectorAll(".tour-step");
  const tourPrints = document.querySelectorAll(".tour-print-img");

  tourItems.forEach((step, index) => {
    ScrollTrigger.create({
      trigger: step,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => activateTourStep(index),
      onEnterBack: () => activateTourStep(index)
    });

    step.addEventListener("click", () => {
      activateTourStep(index);
    });
  });

  function activateTourStep(index) {
    tourItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add("border-waxis-purple", "bg-purple-50/50");
        item.classList.remove("border-transparent");
      } else {
        item.classList.remove("border-waxis-purple", "bg-purple-50/50");
        item.classList.add("border-transparent");
      }
    });

    tourPrints.forEach((img, i) => {
      if (i === index) {
        img.classList.remove("hidden");
        gsap.to(img, { opacity: 1, scale: 1, duration: 0.4 });
      } else {
        gsap.to(img, { opacity: 0, scale: 0.98, duration: 0.3, onComplete: () => img.classList.add("hidden") });
      }
    });
  }

  // --- 5. BENTO GRID ---
  gsap.from(".bento-card", {
    scrollTrigger: {
      trigger: ".bento-section",
      start: "top 75%",
    },
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: "power2.out"
  });

  // --- 6. INTEGRAÇÕES ---
  gsap.from(".integrations-print", {
    scrollTrigger: {
      trigger: ".integrations-section",
      start: "top 70%"
    },
    y: 50,
    opacity: 0,
    duration: 1
  });

  // --- 7. FAQ ACORDEÃO ---
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const btn = item.querySelector(".faq-btn");
    const content = item.querySelector(".faq-content");
    const icon = item.querySelector(".faq-icon");

    btn.addEventListener("click", () => {
      const isOpen = !content.classList.contains("hidden");
      
      faqItems.forEach(other => {
        other.querySelector(".faq-content").classList.add("hidden");
        other.querySelector(".faq-icon").style.transform = "rotate(0deg)";
      });

      if (!isOpen) {
        content.classList.remove("hidden");
        icon.style.transform = "rotate(180deg)";
      }
    });
  });
});
