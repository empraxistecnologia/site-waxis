/* =========================================================================
   WAXIS — main.js
   Interações: header, menu mobile, scroll reveal, contadores, FAQ, formulário
   ========================================================================= */
(function () {
  'use strict';

  /* ---------- Header sticky com blur ---------- */
  const header = document.querySelector('.header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.nav-menu-mobile');
  const overlay = document.querySelector('.nav-overlay');
  const toggleMenu = (open) => {
    if (!burger || !mobileMenu) return;
    burger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    if (overlay) overlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  if (burger) burger.addEventListener('click', () => toggleMenu(!burger.classList.contains('open')));
  if (overlay) overlay.addEventListener('click', () => toggleMenu(false));
  if (mobileMenu) mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  /* ---------- Scroll reveal ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Contadores animados ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = parseFloat(el.getAttribute('data-count'));
    const decimals = (el.getAttribute('data-decimals') || '0') | 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const dur = 1600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = (target * eased).toFixed(decimals);
      el.textContent = prefix + Number(val).toLocaleString('pt-BR') + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && counters.length) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { animateCount(e.target); co.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => co.observe(el));
  }

  /* ---------- FAQ acordeão ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Ano atual no footer ---------- */
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  /* ---------- Formulário de contato ----------
     Envio via EmailJS. Para ativar:
       1) Crie conta grátis em https://www.emailjs.com
       2) Configure Service + Template e pegue as 3 chaves abaixo.
       3) Preencha WAXIS_EMAILJS e descomente o <script> do EmailJS no HTML.
     Enquanto as chaves não forem preenchidas, o formulário faz um fallback
     abrindo o cliente de e-mail (mailto) para empraxisassessoria@gmail.com.
  ------------------------------------------------------------------------- */
  const WAXIS_EMAILJS = {
    publicKey: '',      // ex.: 'aBc123...'
    serviceId: '',      // ex.: 'service_xxx'
    templateId: '',     // ex.: 'template_xxx'
    toEmail: 'empraxisassessoria@gmail.com'
  };

  const form = document.getElementById('contact-form');
  if (form) {
    const msg = document.getElementById('form-msg');
    const btn = form.querySelector('button[type="submit"]');
    const showMsg = (type, text) => {
      if (!msg) return;
      msg.className = 'form-msg ' + type;
      msg.textContent = text;
      msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const consent = form.querySelector('#consent');
      if (consent && !consent.checked) {
        showMsg('err', 'Por favor, autorize o contato marcando a caixa de consentimento.');
        return;
      }

      const configured = WAXIS_EMAILJS.publicKey && WAXIS_EMAILJS.serviceId && WAXIS_EMAILJS.templateId && window.emailjs;

      if (configured) {
        const original = btn ? btn.innerHTML : '';
        if (btn) { btn.disabled = true; btn.innerHTML = 'Enviando…'; }
        window.emailjs.send(WAXIS_EMAILJS.serviceId, WAXIS_EMAILJS.templateId, data, WAXIS_EMAILJS.publicKey)
          .then(() => {
            showMsg('ok', '✅ Mensagem enviada com sucesso! Nossa equipe vai responder em breve.');
            form.reset();
          })
          .catch(() => {
            showMsg('err', 'Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.');
          })
          .finally(() => { if (btn) { btn.disabled = false; btn.innerHTML = original; } });
      } else {
        // Fallback: monta um e-mail via mailto
        const subject = encodeURIComponent('Contato pelo site Waxis — ' + (data.nome || ''));
        const body = encodeURIComponent(
          'Nome: ' + (data.nome || '') + '\n' +
          'E-mail: ' + (data.email || '') + '\n' +
          'WhatsApp: ' + (data.telefone || '') + '\n' +
          'Empresa: ' + (data.empresa || '') + '\n' +
          'Assunto: ' + (data.assunto || '') + '\n\n' +
          'Mensagem:\n' + (data.mensagem || '')
        );
        window.location.href = 'mailto:' + WAXIS_EMAILJS.toEmail + '?subject=' + subject + '&body=' + body;
        showMsg('ok', 'Abrimos seu aplicativo de e-mail para concluir o envio. Assim que configurar o EmailJS, o envio será automático.');
        form.reset();
      }
    });
  }
})();
