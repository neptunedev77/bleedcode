// bleedcode: the site's only script. Everything here is an enhancement:
// without it the site still works (mailto links, CSS-only filters, plain hover).
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------------------------------------------
     1. Click-to-copy email ([data-copy]). Swaps the text in [data-copy-text]
        to a "copied" message for 2s and announces it; icon-only links get a
        CSS tag instead. Falls back to the mailto: link if nothing can copy.
     ------------------------------------------------------------------ */
  const status = document.querySelector('[data-copy-status]');
  const doneText = status?.dataset.done ?? 'copied ✓';
  const announceText = status?.dataset.announce ?? 'Copied';

  const legacyCopy = (text) => {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    area.remove();
    return ok;
  };

  document.addEventListener('click', async (event) => {
    const link = event.target instanceof Element ? event.target.closest('[data-copy]') : null;
    if (!link) return;
    event.preventDefault();
    const text = link.getAttribute('data-copy');
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      ok = legacyCopy(text);
    }
    if (!ok) {
      window.location.href = link.getAttribute('href');
      return;
    }
    const label = link.querySelector('[data-copy-text]');
    if (label && !label.dataset.original) label.dataset.original = label.textContent;
    if (label) label.textContent = doneText;
    link.classList.add('copied');
    if (status) status.textContent = announceText;
    clearTimeout(link._copyTimer);
    link._copyTimer = setTimeout(() => {
      if (label) label.textContent = label.dataset.original;
      link.classList.remove('copied');
      if (status) status.textContent = '';
    }, 2000);
  });

  /* ------------------------------------------------------------------
     2. Border trace ([data-trace]). On hover a red line grows from the point
        where the pointer came in, both ways round, until it closes; on leave
        it shrinks back into the point where the pointer left.
     ------------------------------------------------------------------ */
  const SVG = 'http://www.w3.org/2000/svg';
  const STROKE = 2;
  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';

  const traceFor = (el) => {
    if (el._trace) return el._trace;
    const svg = document.createElementNS(SVG, 'svg');
    svg.setAttribute('class', 'trace');
    svg.setAttribute('aria-hidden', 'true');
    const rect = document.createElementNS(SVG, 'rect');
    svg.appendChild(rect);
    el.appendChild(svg);
    el._trace = { svg, rect, anim: null };
    return el._trace;
  };

  // distance along the rect outline (clockwise from top-left) nearest to the pointer
  const along = (el, x, y) => {
    const r = el.getBoundingClientRect();
    const w = r.width - STROKE;
    const h = r.height - STROKE;
    const px = Math.min(Math.max(x - r.left, 0), w);
    const py = Math.min(Math.max(y - r.top, 0), h);
    const d = { top: py, right: w - px, bottom: h - py, left: px };
    const min = Math.min(d.top, d.right, d.bottom, d.left);
    let p;
    if (min === d.top) p = px;
    else if (min === d.right) p = w + py;
    else if (min === d.bottom) p = w + h + (w - px);
    else p = 2 * w + h + (h - py);
    return { p, P: 2 * (w + h), w, h };
  };

  const frames = (p, P, grow) => {
    const empty = { strokeDasharray: `0 ${P}`, strokeDashoffset: `${-p}` };
    const full = { strokeDasharray: `${P} 0`, strokeDashoffset: `${-(p - P / 2)}` };
    return grow ? [empty, full] : [full, empty];
  };

  const onEnter = (event) => {
    if (reduceMotion.matches || event.pointerType === 'touch') return;
    const el = event.currentTarget;
    const t = traceFor(el);
    const { p, P, w, h } = along(el, event.clientX, event.clientY);
    t.rect.setAttribute('x', String(STROKE / 2));
    t.rect.setAttribute('y', String(STROKE / 2));
    t.rect.setAttribute('width', String(w));
    t.rect.setAttribute('height', String(h));
    t.anim?.cancel();
    t.anim = t.rect.animate(frames(p, P, true), { duration: 340, easing: ease, fill: 'forwards' });
  };

  const onLeave = (event) => {
    const el = event.currentTarget;
    const t = el._trace;
    if (!t?.anim) return;
    if (t.anim.playState === 'running') {
      t.anim.reverse();
      return;
    }
    const { p, P } = along(el, event.clientX, event.clientY);
    t.anim.cancel();
    t.anim = t.rect.animate(frames(p, P, false), { duration: 240, easing: ease, fill: 'forwards' });
  };

  document.querySelectorAll('[data-trace]').forEach((el) => {
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);
  });
  document.documentElement.classList.add('has-trace');

  /* ------------------------------------------------------------------
     3. Project filters ([data-browser]). Takes over from the CSS-only
        version so the change can run inside a view transition: cards that
        leave fade and shrink, cards that stay glide to their new place,
        cards that come back rise in.
     ------------------------------------------------------------------ */
  document.querySelectorAll('[data-browser]').forEach((browser) => {
    const items = [...browser.querySelectorAll('.grid > li')];
    if (!items.length) return;
    browser.dataset.js = '';
    const apply = (value) => {
      items.forEach((li) => {
        li.hidden = value !== 'all' && li.dataset.status !== value;
      });
    };
    apply(browser.querySelector('input[type="radio"]:checked')?.value ?? 'all');

    browser.addEventListener('change', (event) => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement) || input.type !== 'radio') return;
      if (!document.startViewTransition || reduceMotion.matches) {
        apply(input.value);
        return;
      }
      items.forEach((li, i) => {
        li.style.viewTransitionName = `pcard-${i}`;
        li.style.viewTransitionClass = 'pcard';
      });
      const root = document.documentElement;
      root.classList.add('filtering');
      const transition = document.startViewTransition(() => apply(input.value));
      transition.finished.finally(() => {
        items.forEach((li) => {
          li.style.viewTransitionName = '';
          li.style.viewTransitionClass = '';
        });
        root.classList.remove('filtering');
      });
    });
  });
})();
