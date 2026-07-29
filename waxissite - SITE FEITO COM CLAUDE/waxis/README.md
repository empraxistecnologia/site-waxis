# Waxis — Site Institucional

Site de apresentação da **Waxis · Gestão Inteligente de Atendimento** — CRM omnichannel com Inteligência Artificial para WhatsApp, Instagram e Facebook.

Projeto **estático** (HTML + CSS + JavaScript puro), sem etapa de build. É só abrir e usar. Pensado para você continuar desenvolvendo no **Antigravity (Google)**.

---

## 📁 Estrutura

```
waxis/
├── index.html          → Página principal (home)
├── contato.html        → Página de contato + formulário
├── privacidade.html    → Política de Privacidade (LGPD)
├── termos.html         → Termos de Uso
├── site.webmanifest    → Configuração PWA (ícone/instalação)
├── robots.txt          → SEO
└── assets/
    ├── css/style.css   → Todo o estilo e as animações
    ├── js/main.js      → Interações (menu, scroll, FAQ, formulário)
    └── img/            → Logos e ícones da marca
```

## ▶️ Como visualizar

Basta abrir o `index.html` no navegador. Para ver com o comportamento 100% correto (fontes, formulário), rode um servidor local:

```bash
# opção 1 (Python)
python3 -m http.server 8000
# opção 2 (Node)
npx serve .
```

Depois acesse `http://localhost:8000`.

---

## 🎨 Identidade da marca

| Cor | Código | Uso |
|-----|--------|-----|
| Azul-marinho | `#000068` | Texto principal, seções escuras |
| Roxo | `#6800E0` | Destaques, botões, gradientes |
| Branco | `#FFFFFF` | Fundo |

- **Fontes:** Plus Jakarta Sans (títulos) + Inter (texto) — carregadas do Google Fonts.
- **Tokens CSS:** todas as cores, sombras e raios ficam em `:root`, no topo do `style.css`. Mude num lugar só e reflete no site inteiro.

---

## ✉️ Formulário de contato (importante)

O formulário em `contato.html` envia para **empraxisassessoria@gmail.com**.

Como o site é estático, o envio real de e-mail usa o serviço gratuito **EmailJS**. Para ativar:

1. Crie uma conta em <https://www.emailjs.com> (grátis).
2. Configure um **Service** (ligado ao seu Gmail) e um **Template** de e-mail.
3. No arquivo `contato.html`, **descomente** a linha do script do EmailJS (perto do `</head>`).
4. No arquivo `assets/js/main.js`, preencha as 3 chaves no objeto `WAXIS_EMAILJS`:
   ```js
   const WAXIS_EMAILJS = {
     publicKey: 'SUA_PUBLIC_KEY',
     serviceId: 'SEU_SERVICE_ID',
     templateId: 'SEU_TEMPLATE_ID',
     toEmail: 'empraxisassessoria@gmail.com'
   };
   ```

> Enquanto as chaves não estiverem preenchidas, o formulário funciona em **modo de segurança**: abre o aplicativo de e-mail do visitante já preenchido (mailto). Assim nada trava.

**Alternativa:** se preferir, dá para trocar por [Formspree](https://formspree.io) — nesse caso é só apontar o `action` do `<form>` para a URL do Formspree.

---

## 🔧 O que personalizar antes de publicar

- [ ] Número de **WhatsApp** (procure por `5566000000000` em `contato.html`).
- [ ] **Depoimentos** da home são exemplos — troque por clientes reais (`index.html`, seção "Clientes").
- [ ] **Estatísticas** da home (500+, 92%, 3x) são placeholders — ajuste para os seus números.
- [ ] **Redes sociais** no rodapé (links `href="#"`).
- [ ] **Dados da empresa** (razão social, CNPJ) nos textos legais — revise com um advogado.
- [ ] **Preços**: hoje os planos estão como "Sob consulta" com botão "Agendar demonstração". Quando definir valores, é só editar a seção `#planos`.
- [ ] Link do botão **"Entrar"** (hoje `href="#"`) → apontar para o painel da ferramenta.

---

## 🚀 Roadmap sugerido (próximas fases)

1. **Blog + Painel administrativo** — como o site é estático, o blog dinâmico virá com uma camada extra. Caminhos recomendados no Antigravity:
   - **Supabase** ou **Firebase** (banco + login prontos) para o painel de posts, mantendo o site como está; **ou**
   - Migrar as páginas para **Next.js** e usar rotas de API + um CMS headless.
2. **Domínio e hospedagem** — publique fácil na Vercel, Netlify ou Cloudflare Pages (arrastar e soltar a pasta).
3. **Analytics** — adicione Google Analytics / Meta Pixel para medir conversão.
4. **Sitemap.xml** — gerar para melhorar o SEO.

---

Feito com carinho para a Waxis 💜
