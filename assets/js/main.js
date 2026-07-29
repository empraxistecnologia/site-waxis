/* WAXIS — Animações e Controladores JavaScript (Lenis + GSAP) */

document.addEventListener("DOMContentLoaded", () => {
  // Inicialização do Lenis Smooth Scroll
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

  // Registrar Plugins do GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Sincronizar Lenis com ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // --- 1. HERO ANIMATION (Revelação Cinematográfica do Produto) ---
  const heroTl = gsap.timeline({
    defaults: { ease: "power3.out", duration: 1 }
  });

  heroTl.from(".hero-badge", { y: -20, opacity: 0, delay: 0.2 })
        .from(".hero-title", { y: 40, opacity: 0 }, "-=0.6")
        .from(".hero-subtitle", { y: 30, opacity: 0 }, "-=0.6")
        .from(".hero-cta", { y: 20, opacity: 0 }, "-=0.6")
        .from(".hero-mockup", { y: 80, scale: 0.95, opacity: 0, duration: 1.2 }, "-=0.4");

  // Parallax do mockup no hero
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

  // --- 2. CENTERPIECE (Do Caos à Operação Inteligente - Pin & Scrub) ---
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

  // --- 4. TOUR DA PLATAFORMA (Scrollytelling com Troca de Tela) ---
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
  });

  function activateTourStep(index) {
    tourItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add("border-purple-600", "bg-purple-50/50");
        item.classList.remove("border-transparent");
      } else {
        item.classList.remove("border-purple-600", "bg-purple-50/50");
        item.classList.add("border-transparent");
      }
    });

    tourPrints.forEach((img, i) => {
      if (i === index) {
        gsap.to(img, { opacity: 1, scale: 1, duration: 0.5, display: "block" });
      } else {
        gsap.to(img, { opacity: 0, scale: 0.96, duration: 0.5, display: "none" });
      }
    });
  }

  // --- 5. BENTO GRID REVEALS ---
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
      
      // Fechar outros
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
