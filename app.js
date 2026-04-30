/* ============================================================
   GFX Passion — interactivity
   ============================================================ */
(function () {
  'use strict';

  // -------- DATA --------
  const CLIENTS = ['NORTHWIND','KILO LABS','PARSEC','OAK & BONE','FORMA','HAVEN/CO','TIDE','HERTZ','MOON CLUB','ARCHIVE 88','STUDIO ESM'];

  const SERVICES = [
    { n: '01', t: 'Logo Design', d: 'Marks that survive a screenshot. Refined sketch-to-vector pipelines, real-world stress tests, deliverables ready for stamping anywhere.' },
    { n: '02', t: 'Brand Identity', d: 'Full visual system — type, color, voice, motion. The kit your team can ship with for years without asking us.' },
    { n: '03', t: 'Web Design', d: 'Marketing sites and product surfaces. Built handoff-ready in Figma, or shipped end-to-end with our dev partners.' },
    { n: '04', t: 'Illustrations', d: 'Custom editorial and product illustration systems. Made to scale across docs, decks, and feature pages.' },
    { n: '05', t: 'Motion Graphics', d: 'Logo animation, micro-interactions, and short-form pieces for social and product launches.' },
    { n: '06', t: 'Packaging', d: 'Physical-world identity. Structural design, dielines, print-ready files, and on-shelf prototyping.' },
  ];

  const WORK = [
    { c: 'Xyneris', s: 'Brand identity, 2025', span: 7, h: 480, lbl: 'campaign film still', img: 'images/work/project-xyneris.jpg' },
    { c: 'Vertexa Solution',  s: 'Logo + web, 2025',     span: 5, h: 480, lbl: 'wordmark study',      img: 'images/work/project-vertexa solution.jpg' },
    { c: 'Crypto Learn', s: 'Branding & Web Design, 2024',      span: 4, h: 380, lbl: 'box mock',            img: 'images/work/project-cryptolearn.jpg' },
    { c: 'Ecom Web',     s: 'Web design, 2023',     span: 8, h: 380, lbl: 'product hero',        img: 'images/work/project-shoes.jpg' },
    { c: 'Gaming',      s: 'Landing Page, 2024', span: 6, h: 360, lbl: 'logo animation',      img: 'images/work/project-gaming.jpg' },
    { c: 'AAEarners',   s: 'Logo and Branding, 2022',   span: 6, h: 360, lbl: 'editorial set',       img: 'images/work/project-aaearners.jpg' },
  ];

  const PROCESS = [
    { n: '01', t: 'Discover', d: 'Two weeks. Audit, interviews, competitor sweep, founding-story dig.' },
    { n: '02', t: 'Define',   d: 'Strategic direction & moodboards. We pick a single bet — not three.' },
    { n: '03', t: 'Design',   d: 'Identity, web, motion, every artifact. Reviewed weekly with founders.' },
    { n: '04', t: 'Deliver',  d: 'Brand book, source files, Figma library, training session for your team.' },
  ];

  const TEAM = [
    { name: 'M Bilal - Founder',  img: 'images/team/team-bilal.jpg',   role: 'Creative Director' },
    { name: 'Shameer - Web Developer',  img: 'images/team/team-shameer.jpg',  role: 'Web Developer' },
    { name: 'Shahbaz - Web Designer',  img: 'images/team/team-shahbaz.jpg',  role: 'Web Designer' },
    { name: 'Qasim - Brand Designer',    img: 'images/team/team-qasim.jpg',    role: 'Brand Designer' },
  ];

  const TESTIMONIALS = [
    { q: 'They built the identity that finally made our investors stop asking what we do.', a: 'Sarah K.', r: 'CEO, Northwind' },
    { q: 'Three weeks ahead of schedule and twice the work I expected. Unbelievable rate of output.', a: 'Devon M.', r: 'Founder, Kilo Labs' },
    { q: 'The brand book is more useful than the deck we paid an agency 6× more for.', a: 'Priya R.', r: 'COO, Forma' },
  ];

  const TIERS = [
    { t: 'Spark',  p: '$500',     d: '1 wks',   f: ['Logo + Brand Design','3 initial Concepts','App icon+Favicon','Color Scheme', 'Social Media Kit','3D Mockups', 'Full branding kit','Brand guidelines', 'Typography Guidelines'], cta: 'Book Spark', hi: false },
    { t: 'Studio', p: '$500 - $5,000',    d: '2 wks',   f: ['Custom website Design', 'Figma design', 'Webflow development', 'Wordpress Development', 'SAAS Software Websites', 'Digital Products',  'Long-term support & maintenance'], cta: 'Book Studio', hi: true },
    { t: 'Empire', p: 'Contact for Pricing',  d: '4 wks', f: ['Everything in Studio','Custom illustration set','Full website + dev','Packaging system','All source files'], cta: 'Talk to us', hi: false },
  ];

  const FAQS = [
    { q: 'How fast can you start?', a: 'We open one to two slots a month. If you book before the 15th we can usually start the same month; otherwise the following.' },
    { q: 'Do you work with agencies?', a: 'Yes — we partner with 4 agencies on overflow design work. Reach out for white-label rates.' },
    { q: 'What about development?', a: 'We design, our two dev partners build (Webflow, Next.js, Framer). You can hire us together as one team.' },
    { q: 'Can we own the source files?', a: 'Always. Every package ships with editable Figma + AI/SVG sources. They\'re yours.' },
    { q: 'Do you do AI-generated logos?', a: 'No. Every mark we ship was drawn, considered, and stress-tested by a human designer.' },
  ];

  const CHIPS = ['Logo','Brand','Web','Motion','Illustration','Packaging'];

  // -------- HELPERS --------
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
  const el = (tag, attrs={}, ...kids) => {
    const n = document.createElement(tag);
    for (const k in attrs) {
      if (k === 'class') n.className = attrs[k];
      else if (k === 'html') n.innerHTML = attrs[k];
      else if (k.startsWith('on') && typeof attrs[k] === 'function') n.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] !== undefined && attrs[k] !== null) n.setAttribute(k, attrs[k]);
    }
    for (const k of kids.flat()) {
      if (k == null) continue;
      n.appendChild(typeof k === 'string' ? document.createTextNode(k) : k);
    }
    return n;
  };

  // -------- RENDER: marquee --------
  function renderMarquee() {
    const row = $('#marquee-row');
    if (!row) return;
    const seq = (CLIENTS.concat(CLIENTS)).map(c =>
      el('span', { class: 'marquee-item' }, c, el('span', { class: 'star' }, '✦'))
    );
    seq.forEach(n => row.appendChild(n));
    // Clone the whole row track to make a seamless loop
    const track = row.parentElement;
    const dup = row.cloneNode(true);
    dup.setAttribute('aria-hidden', 'true');
    track.appendChild(dup);
  }

  // -------- RENDER: services --------
  function renderServices() {
    const wrap = $('#services-list');
    if (!wrap) return;
    SERVICES.forEach(s => {
      const row = el('div', { class: 'service-row reveal-item', tabindex: '0' },
        el('div', { class: 'num' }, s.n),
        el('div', { class: 'h3' }, s.t),
        el('div', { class: 'desc body-text' }, s.d),
        el('div', { class: 'arrow' }, '→')
      );
      wrap.appendChild(row);
    });
  }

  // -------- RENDER: work --------
  function renderWork() {
    const wrap = $('#work-grid');
    if (!wrap) return;
    WORK.forEach(p => {
      const card = el('div', { class: 'work-card reveal-item', style: `grid-column: span ${p.span};` },
        el('img', { class: 'work-img', src: p.img, alt: p.lbl, style: `min-height: ${p.h}px; width:100%; object-fit:cover; display:block;` }),
        el('div', { class: 'card-foot' },
          el('div', {},
            el('div', { class: 'card-title' }, p.c),
            el('div', { class: 'eyebrow', style: 'margin-top:4px;' }, p.s)
          ),
          el('div', { class: 'stamp' }, 'CASE STUDY')
        )
      );
      wrap.appendChild(card);
    });
  }

  // -------- RENDER: process --------
  function renderProcess() {
    const wrap = $('#process-grid');
    if (!wrap) return;
    PROCESS.forEach(p => {
      const step = el('div', { class: 'process-step reveal-item' },
        el('div', { class: 'step-num' }, `STEP / ${p.n}`),
        el('div', { class: 'h3' }, p.t),
        el('p', { class: 'body-text' }, p.d)
      );
      wrap.appendChild(step);
    });
  }

  // -------- RENDER: team --------
  function renderTeam() {
    const wrap = $('#team-grid');
    if (!wrap) return;
    TEAM.forEach((n, i) => {
      const card = el('div', { class: 'team-card reveal-item' },
        el('img', { src: n.img, alt: n.name, style: 'width:100%; aspect-ratio:3/4; object-fit:cover; display:block;' }),
        el('div', { class: 'name-row' },
          el('span', {}, n.name),
          el('span', { class: 'num' }, `0${i+1}`)
        )
      );
      wrap.appendChild(card);
    });
  }

  // -------- RENDER: testimonials --------
  function renderTestimonials() {
    const wrap = $('#testimonials');
    if (!wrap) return;
    TESTIMONIALS.forEach(t => {
      const card = el('div', { class: 'testimonial reveal-item' },
        el('div', { class: 'quote-mark' }, '"'),
        el('p', { class: 'quote' }, t.q),
        el('div', { class: 'author-row' },
          el('div', {},
            el('div', { class: 'author' }, t.a),
            el('div', { class: 'role' }, t.r)
          ),
          el('div', { class: 'stars' }, '★ ★ ★ ★ ★')
        )
      );
      wrap.appendChild(card);
    });
  }

  // -------- RENDER: pricing --------
  function renderPricing() {
    const wrap = $('#pricing-grid');
    if (!wrap) return;
    TIERS.forEach(tier => {
      const features = el('ul', {});
      tier.f.forEach(f => features.appendChild(el('li', {}, f)));
      const card = el('div', { class: `tier reveal-item${tier.hi ? ' hi' : ''}` },
        el('div', { class: 'tier-head' },
          el('div', { class: 'h3' }, tier.t),
          el('span', { class: 'eyebrow duration' }, tier.d)
        ),
        el('div', { class: 'price' }, tier.p),
        features,
        el('a', {
          class: tier.hi ? 'btn btn-ghost' : 'btn btn-primary',
          href: '#contact'
        }, `${tier.cta} →`)
      );
      wrap.appendChild(card);
    });
  }

  // -------- RENDER: faq --------
  function renderFaq() {
    const wrap = $('#faq-list');
    if (!wrap) return;
    FAQS.forEach((item, i) => {
      const id = `faq-a-${i}`;
      const a = el('div', { class: 'faq-a', id },
        el('p', {}, item.a)
      );
      const btn = el('button', {
        class: 'faq-q',
        type: 'button',
        'aria-expanded': 'false',
        'aria-controls': id,
        onclick: function () {
          const faq = this.closest('.faq');
          const open = faq.classList.toggle('open');
          this.setAttribute('aria-expanded', open ? 'true' : 'false');
        }
      },
        el('span', {}, item.q),
        el('span', { class: 'faq-toggle', 'aria-hidden': 'true' }, '+')
      );
      wrap.appendChild(el('div', { class: 'faq reveal-item' }, btn, a));
    });
  }

  // -------- RENDER: chips --------
  function renderChips() {
    const wrap = $('#chips');
    if (!wrap) return;
    CHIPS.forEach(name => {
      const c = el('button', {
        class: 'chip', type: 'button', 'aria-pressed': 'false',
        onclick: function () {
          const on = this.getAttribute('aria-pressed') === 'true';
          this.setAttribute('aria-pressed', on ? 'false' : 'true');
        }
      }, name);
      wrap.appendChild(c);
    });
  }

  // -------- INTERACTIONS --------
  // Cursor halo
  function initCursor() {
    const halo = $('#cursor-halo');
    if (!halo) return;
    if (window.matchMedia('(hover: none)').matches) return;
    let tx = -1000, ty = -1000, x = -1000, y = -1000, raf;
    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      halo.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
    window.addEventListener('mouseout', (e) => { if (!e.relatedTarget) { tx = -1000; ty = -1000; } });
    raf = requestAnimationFrame(tick);
  }

  // Scroll reveal
  function initReveal() {
    const items = $$('.reveal-item');
    if (!('IntersectionObserver' in window)) {
      items.forEach(i => i.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(i => io.observe(i));
  }

  // Mobile nav
  function initMobileNav() {
    const btn = $('.nav-toggle');
    const menu = $('#mobile-nav');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    menu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        menu.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Form submit
  function initForm() {
    const form = $('#contact-form');
    const status = $('#form-status');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      if (!name || !email) {
        status.textContent = 'Please add your name and email so we can reply.';
        status.style.color = '#ff7a7a';
        return;
      }
      const services = $$('#chips .chip[aria-pressed="true"]').map(c => c.textContent);
      const subject = `New brief — ${name}${data.get('company') ? ' / ' + data.get('company') : ''}`;
      const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${data.get('company') || ''}`,
        `Services: ${services.join(', ') || '(none selected)'}`,
        '',
        'Project:',
        (data.get('message') || '').toString(),
      ].join('\n');
      const href = `mailto:gfxpassion@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = href;
      status.textContent = 'Opening your email client… if nothing happens, send the brief to gfxpassion@outlook.com.';
      status.style.color = '';
    });
  }

  // -------- BOOT --------
  document.addEventListener('DOMContentLoaded', () => {
    renderMarquee();
    renderServices();
    renderWork();
    renderProcess();
    renderTeam();
    renderTestimonials();
    renderPricing();
    renderFaq();
    renderChips();
    initCursor();
    initReveal();
    initMobileNav();
    initForm();
  });
})();
