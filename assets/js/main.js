/* WAXIS — Controladores de Animação Ultrarrápidos & Leves (Performance de 60fps) */

document.addEventListener("DOMContentLoaded", () => {
  // --- TOUR DA PLATAFORMA (Troca Instantânea e Sem Travamentos) ---
  const tourItems = document.querySelectorAll(".tour-step");
  const tourPrints = document.querySelectorAll(".tour-print-img");

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
      } else {
        img.classList.add("hidden");
      }
    });
  }

  tourItems.forEach((step, index) => {
    step.addEventListener("mouseenter", () => activateTourStep(index));
    step.addEventListener("click", () => activateTourStep(index));
  });

  // --- FAQ ACORDEÃO (Leve e Direto) ---
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
