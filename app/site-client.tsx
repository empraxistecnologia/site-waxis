"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function Experience() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = document.querySelector(".nav-shell");
    const menu = document.querySelector<HTMLElement>("[data-menu-button]");
    const stage = document.querySelector<HTMLElement>("[data-hero-stage]");
    const transformation = document.querySelector<HTMLElement>(".transformation");
    const progress = document.querySelector<HTMLElement>("[data-transform-progress]");
    const frame = document.querySelector<HTMLElement>("[data-dashboard-frame]");
    const tour = document.querySelector<HTMLElement>("[data-tour]");
    const copies = Array.from(document.querySelectorAll<HTMLElement>("[data-tour-copy]"));
    const images = Array.from(document.querySelectorAll<HTMLElement>("[data-tour-image]"));
    const dots = Array.from(document.querySelectorAll<HTMLElement>("[data-tour-dot]"));

    const onMenu = () => {
      const open = document.body.classList.toggle("menu-open");
      menu?.setAttribute("aria-expanded", String(open));
    };
    menu?.addEventListener("click", onMenu);

    const onMouse = (event: MouseEvent) => {
      if (!stage || reduce) return;
      const rect = stage.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      stage.style.setProperty("--mouse-x", x.toFixed(3));
      stage.style.setProperty("--mouse-y", y.toFixed(3));
    };
    stage?.addEventListener("mousemove", onMouse);

    let ticking = false;
    const render = () => {
      nav?.classList.toggle("is-scrolled", window.scrollY > 24);
      if (transformation && progress && frame) {
        const rect = transformation.getBoundingClientRect();
        const range = Math.max(1, transformation.offsetHeight - innerHeight);
        const p = Math.min(1, Math.max(0, -rect.top / range));
        progress.style.transform = `scaleY(${p})`;
        frame.style.setProperty("--scene-progress", p.toFixed(3));
      }
      if (tour && copies.length) {
        const rect = tour.getBoundingClientRect();
        const range = Math.max(1, tour.offsetHeight - innerHeight);
        const p = Math.min(0.999, Math.max(0, -rect.top / range));
        const active = Math.min(copies.length - 1, Math.floor(p * copies.length));
        [...copies, ...images, ...dots].forEach((el) => el.classList.remove("is-active"));
        copies[active]?.classList.add("is-active");
        images[active]?.classList.add("is-active");
        dots[active]?.classList.add("is-active");
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(render);
      }
    };
    render();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      menu?.removeEventListener("click", onMenu);
      stage?.removeEventListener("mousemove", onMouse);
      removeEventListener("scroll", onScroll);
    };
  }, []);
  return null;
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(localStorage.getItem("waxis-cookie-consent") === null), []);
  const choose = (value: "essential" | "all") => {
    localStorage.setItem("waxis-cookie-consent", value);
    setVisible(false);
  };
  if (!visible) return null;
  return (
    <aside className="cookie-banner" aria-label="Preferências de cookies">
      <div><strong>Sua privacidade, sob controle.</strong><p>Usamos cookies essenciais para o site funcionar. Cookies de análise só serão ativados com sua autorização. <Link href="/cookies">Saiba mais</Link>.</p></div>
      <div><button onClick={() => choose("essential")}>Somente essenciais</button><button className="button button--small" onClick={() => choose("all")}>Aceitar todos</button></div>
    </aside>
  );
}
