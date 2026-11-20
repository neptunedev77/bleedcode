// bleedcode: the site's only script. Everything here is an enhancement:
// without it the site still works (mailto links, CSS-only filters, plain hover).
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------------------------------------------
     1. Click-to-copy email (<button data-copy="address">). Shows a toast at
        the bottom of the screen; if nothing can copy, the toast shows the
        address instead so it can be copied by hand.
     ------------------------------------------------------------------ */
  const toast = document.querySelector('[data-toast]');
  let toastTimer;
  const showToast = (text, isError) => {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.toggle('error', Boolean(isError));
    toast.classList.remove('show');
    void toast.offsetWidth; // restart the rise-in if it is already showing
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), isError ? 4000 : 2000);
  };

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
    const button = event.target instanceof Element ? event.target.closest('[data-copy]') : null;
    if (!button) return;
    event.preventDefault();
    const text = button.getAttribute('data-copy');
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      ok = legacyCopy(text);
    }
    if (ok) showToast(toast?.dataset.done ?? 'copied ✓', false);
    else showToast(text, true);
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
    // rounded boxes: follow the same corner radius (perimeter loses (8 - 2π)·r)
    const radius = Math.max(parseFloat(getComputedStyle(el).borderTopLeftRadius) - STROKE / 2, 0) || 0;
    const P = 2 * (w + h) - (8 - 2 * Math.PI) * radius;
    return { p: (p * P) / (2 * (w + h)), P, w, h, radius };
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
    const { p, P, w, h, radius } = along(el, event.clientX, event.clientY);
    t.rect.setAttribute('x', String(STROKE / 2));
    t.rect.setAttribute('y', String(STROKE / 2));
    t.rect.setAttribute('width', String(w));
    t.rect.setAttribute('height', String(h));
    t.rect.setAttribute('rx', String(radius));
    t.rect.setAttribute('ry', String(radius));
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
        leave switch off like an old CRT, cards that stay glide to their new
        place, cards that come back switch on (styles in global.css).
     ------------------------------------------------------------------ */
  document.querySelectorAll('[data-browser]').forEach((browser) => {
    const items = [...browser.querySelectorAll(':scope > .grid > li')];
    if (!items.length) return;
    browser.dataset.js = '';
    const empty = browser.querySelector('[data-empty]');
    const apply = (value) => {
      let shown = 0;
      items.forEach((li) => {
        li.hidden = value !== 'all' && li.dataset.status !== value;
        if (!li.hidden) shown += 1;
      });
      if (empty) empty.hidden = shown > 0;
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
