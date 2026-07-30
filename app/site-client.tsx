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
    const reality = document.querySelector<HTMLElement>("[data-reality]");
    const realityLines = Array.from(document.querySelectorAll<HTMLElement>("[data-reality-line]"));
    const progress = document.querySelector<HTMLElement>("[data-transform-progress]");
    const frame = document.querySelector<HTMLElement>("[data-dashboard-frame]");
    const tour = document.querySelector<HTMLElement>("[data-tour]");
    const copies = Array.from(document.querySelectorAll<HTMLElement>("[data-tour-copy]"));
    const images = Array.from(document.querySelectorAll<HTMLElement>("[data-tour-image]"));
    const tourCurrent = document.querySelector<HTMLElement>("[data-tour-current]");
    const particleCleanups: Array<() => void> = [];

    if (!reduce) {
      document.querySelectorAll<HTMLCanvasElement>("[data-particle-field]").forEach((canvas) => {
        const area = canvas.parentElement;
        const context = canvas.getContext("2d");
        if (!area || !context) return;

        type Point = { x: number; y: number; vx: number; vy: number; size: number; accent: boolean };
        let points: Point[] = [];
        let width = 0;
        let height = 0;
        let frameId = 0;
        const pointer = { x: -9999, y: -9999 };

        const resize = () => {
          const ratio = Math.min(devicePixelRatio, 2);
          width = area.clientWidth;
          height = area.clientHeight;
          canvas.width = width * ratio;
          canvas.height = height * ratio;
          canvas.style.width = `${width}px`;
          canvas.style.height = `${height}px`;
          context.setTransform(ratio, 0, 0, ratio, 0, 0);
          const amount = innerWidth < 680 ? 28 : Math.min(76, Math.round(width / 18));
          points = Array.from({ length: amount }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.18,
            size: Math.random() * 1.1 + 0.8,
            accent: Math.random() < 0.34,
          }));
        };

        const onPointerMove = (event: PointerEvent) => {
          const rect = canvas.getBoundingClientRect();
          pointer.x = event.clientX - rect.left;
          pointer.y = event.clientY - rect.top;
        };
        const onPointerLeave = () => {
          pointer.x = -9999;
          pointer.y = -9999;
        };

        const drawArrow = (point: Point) => {
          const pointerDistance = Math.hypot(point.x - pointer.x, point.y - pointer.y);
          const angle = pointerDistance < 210
            ? Math.atan2(pointer.y - point.y, pointer.x - point.x)
            : Math.atan2(point.vy, point.vx);
          context.save();
          context.translate(point.x, point.y);
          context.rotate(angle);
          context.beginPath();
          context.moveTo(4.5, 0);
          context.lineTo(-2.5, -2.4);
          context.lineTo(-1, 0);
          context.lineTo(-2.5, 2.4);
          context.closePath();
          context.fillStyle = point.accent ? "rgba(118,0,245,.58)" : "rgba(9,15,133,.28)";
          context.fill();
          context.restore();
        };

        const animate = () => {
          context.clearRect(0, 0, width, height);
          points.forEach((point) => {
            point.x += point.vx;
            point.y += point.vy;
            if (point.x < 0 || point.x > width) point.vx *= -1;
            if (point.y < 0 || point.y > height) point.vy *= -1;
            drawArrow(point);
          });
          for (let index = 0; index < points.length; index += 1) {
            const current = points[index];
            for (let next = index + 1; next < points.length; next += 1) {
              const other = points[next];
              const distance = Math.hypot(current.x - other.x, current.y - other.y);
              if (distance < 128) {
                context.beginPath();
                context.moveTo(current.x, current.y);
                context.lineTo(other.x, other.y);
                context.strokeStyle = `rgba(118,0,245,${(1 - distance / 128) * 0.12})`;
                context.lineWidth = 0.7;
                context.stroke();
              }
            }
            const pointerDistance = Math.hypot(current.x - pointer.x, current.y - pointer.y);
            if (pointerDistance < 210) {
              context.beginPath();
              context.moveTo(current.x, current.y);
              context.lineTo(pointer.x, pointer.y);
              context.strokeStyle = `rgba(118,0,245,${(1 - pointerDistance / 210) * 0.28})`;
              context.lineWidth = 0.8;
              context.stroke();
            }
          }
          frameId = requestAnimationFrame(animate);
        };

        resize();
        animate();
        const observer = new ResizeObserver(resize);
        observer.observe(area);
        area.addEventListener("pointermove", onPointerMove);
        area.addEventListener("pointerleave", onPointerLeave);
        particleCleanups.push(() => {
          cancelAnimationFrame(frameId);
          observer.disconnect();
          area.removeEventListener("pointermove", onPointerMove);
          area.removeEventListener("pointerleave", onPointerLeave);
        });
      });
    }

    const ecosystem = document.querySelector<HTMLElement>(".integration-network");
    const ecosystemCanvas = document.querySelector<HTMLCanvasElement>("[data-ecosystem-canvas]");
    const ecosystemRoute = document.querySelector<HTMLElement>("[data-ecosystem-route]");
    const ecosystemNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-eco-node]"));
    let ecosystemCleanup = () => {};

    if (ecosystem && ecosystemCanvas && ecosystemRoute && ecosystemNodes.length && innerWidth > 680) {
      const context = ecosystemCanvas.getContext("2d");
      if (context) {
        const routeByCategory: Record<string, (name: string) => string> = {
          ia: (name) => `Mensagem → ${name} → Classificação → CRM → Painel`,
          canal: (name) => `${name} → IA → CRM → Funil → Automação`,
          google: (name) => `CRM → ${name} → Sincronização → Cliente notificado`,
          pagamento: (name) => `Proposta → ${name} → Cobrança → Financeiro`,
          integracao: (name) => `Evento na Waxis → ${name} → Sistema externo → Retorno sincronizado`,
          automacao: (name) => `Ação na Waxis → ${name} → Fluxo externo → Dado de volta ao painel`,
        };
        const nodes = ecosystemNodes.map((element) => ({
          element,
          name: element.dataset.name ?? "",
          category: element.dataset.category ?? "integracao",
          color: element.dataset.color ?? "#7600f5",
          ring: Number(element.dataset.ring ?? 0),
          baseAngle: 0,
          x: 0,
          y: 0,
        }));
        [0, 1, 2].forEach((ring) => {
          const group = nodes.filter((node) => node.ring === ring);
          group.forEach((node, index) => {
            node.baseAngle = (index / group.length) * Math.PI * 2;
          });
        });

        let width = 0;
        let height = 0;
        let centerX = 0;
        let centerY = 0;
        let radii = [0, 0, 0];
        let active: (typeof nodes)[number] | null = null;
        let animationFrame = 0;
        let running = true;
        const speed = [0.00016, -0.00011, 0.00008];

        const measure = () => {
          const ratio = Math.min(devicePixelRatio, 2);
          width = ecosystem.clientWidth;
          height = ecosystem.clientHeight;
          ecosystemCanvas.width = width * ratio;
          ecosystemCanvas.height = height * ratio;
          ecosystemCanvas.style.width = `${width}px`;
          ecosystemCanvas.style.height = `${height}px`;
          context.setTransform(ratio, 0, 0, ratio, 0, 0);
          const size = Math.min(width, height);
          radii = [size * 0.2, size * 0.33, size * 0.445];
          centerX = width / 2;
          centerY = height / 2;
        };

        const setActive = (node: (typeof nodes)[number] | null) => {
          active = node;
          nodes.forEach((item) => item.element.classList.toggle("is-active", item === node));
          if (node) {
            ecosystemRoute.textContent = (routeByCategory[node.category] ?? routeByCategory.integracao)(node.name);
            ecosystemRoute.classList.add("is-active");
          } else {
            ecosystemRoute.textContent = "Passe o mouse sobre um serviço para ver o caminho dos dados.";
            ecosystemRoute.classList.remove("is-active");
          }
        };

        const listeners: Array<() => void> = [];
        nodes.forEach((node) => {
          const enter = () => setActive(node);
          const leave = () => setActive(null);
          node.element.addEventListener("mouseenter", enter);
          node.element.addEventListener("mouseleave", leave);
          node.element.addEventListener("focus", enter);
          node.element.addEventListener("blur", leave);
          listeners.push(() => {
            node.element.removeEventListener("mouseenter", enter);
            node.element.removeEventListener("mouseleave", leave);
            node.element.removeEventListener("focus", enter);
            node.element.removeEventListener("blur", leave);
          });
        });

        const draw = (time: number) => {
          context.clearRect(0, 0, width, height);
          nodes.forEach((node, index) => {
            const angle = node.baseAngle + (reduce ? 0 : time * speed[node.ring]);
            node.x = centerX + Math.cos(angle) * radii[node.ring];
            node.y = centerY + Math.sin(angle) * radii[node.ring];
            node.element.style.transform = `translate3d(${node.x}px,${node.y}px,0) translate(-50%,-50%)`;

            const highlighted = node === active;
            context.beginPath();
            context.moveTo(centerX, centerY);
            context.lineTo(node.x, node.y);
            context.strokeStyle = highlighted ? "rgba(155,77,255,.85)" : "rgba(155,77,255,.12)";
            context.lineWidth = highlighted ? 1.8 : 1;
            context.stroke();

            const phase = (time * 0.00018 + index * 0.37) % 1;
            const pulseX = centerX + (node.x - centerX) * phase;
            const pulseY = centerY + (node.y - centerY) * phase;
            context.beginPath();
            context.arc(pulseX, pulseY, highlighted ? 3 : 1.6, 0, Math.PI * 2);
            context.fillStyle = highlighted ? "rgba(255,255,255,.95)" : "rgba(155,77,255,.58)";
            context.fill();
          });
          if (running && !reduce) animationFrame = requestAnimationFrame(draw);
        };

        ecosystem.classList.add("is-orbiting");
        measure();
        draw(0);
        const resizeObserver = new ResizeObserver(measure);
        resizeObserver.observe(ecosystem);
        const visibilityObserver = new IntersectionObserver(([entry]) => {
          if (reduce) return;
          const shouldRun = entry.isIntersecting;
          if (shouldRun && !running) {
            running = true;
            animationFrame = requestAnimationFrame(draw);
          } else if (!shouldRun && running) {
            running = false;
            cancelAnimationFrame(animationFrame);
          }
        }, { threshold: 0.1 });
        visibilityObserver.observe(ecosystem);

        ecosystemCleanup = () => {
          running = false;
          cancelAnimationFrame(animationFrame);
          resizeObserver.disconnect();
          visibilityObserver.disconnect();
          listeners.forEach((remove) => remove());
        };
      }
    }

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
      if (reality && realityLines.length) {
        const rect = reality.getBoundingClientRect();
        const p = Math.min(0.999, Math.max(0, (innerHeight * 0.72 - rect.top) / Math.max(1, rect.height * 0.72)));
        const active = Math.min(realityLines.length - 1, Math.floor(p * realityLines.length));
        realityLines.forEach((line, index) => line.classList.toggle("is-active", index <= active));
      }
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
        [...copies, ...images].forEach((el) => el.classList.remove("is-active"));
        copies[active]?.classList.add("is-active");
        images[active]?.classList.add("is-active");
        if (tourCurrent) tourCurrent.textContent = String(active + 1).padStart(2, "0");
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
      particleCleanups.forEach((cleanup) => cleanup());
      ecosystemCleanup();
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
