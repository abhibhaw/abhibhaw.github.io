// Impact card stack: one card in front, the rest peek behind it.
// Autoplay advances when the active tab's progress bar finishes.
const root = document.querySelector('[data-stack]');
if (root) {
  const cards = [...root.querySelectorAll('.impact')];
  const tabs = [...root.querySelectorAll('[data-go]')];
  const pauseBtn = root.querySelector('[data-pause]');
  const live = root.querySelector('.stack-cards');
  const n = cards.length;
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  let front = 0;
  let stopped = still.matches;
  let visible = true;

  const depth = (i) => (i - front + n) % n;

  // The front card replays its story: the after bar collapses, the number counts up.
  function play(card) {
    if (still.matches) return;
    const row = card.querySelector('.meter-row.is-after');
    if (row) {
      row.classList.add('is-arming');
      void row.offsetWidth;
      row.classList.remove('is-arming');
    }
    const num = card.querySelector('[data-count]');
    const m = num && num.textContent.match(/^(\D*)([\d,]+)(.*)$/);
    if (!m) return;
    const target = Number(m[2].replace(/,/g, ''));
    const fmt = (v) => m[1] + Math.round(v).toLocaleString('en-US') + m[3];
    const t0 = performance.now();
    const dur = 900;
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      num.textContent = fmt(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(tick);
    };
    num.setAttribute('aria-label', m[0]);
    requestAnimationFrame(tick);
  }

  function paint() {
    cards.forEach((card, i) => {
      const d = depth(i);
      card.style.setProperty('--d', d);
      card.toggleAttribute('data-front', d === 0);
      card.toggleAttribute('data-hide', d > 2);
      card.setAttribute('aria-hidden', d === 0 ? 'false' : 'true');
      card.querySelector('a').tabIndex = d === 0 ? 0 : -1;
    });
    tabs.forEach((t, i) => t.setAttribute('aria-current', i === front ? 'true' : 'false'));
    // Restart the progress animation on the new active tab.
    if (root.classList.contains('is-playing')) {
      root.classList.remove('is-playing');
      void root.offsetWidth;
      root.classList.add('is-playing');
    }
  }

  function show(i, user) {
    const next = (i + n) % n;
    if (next === front) return;
    const old = cards[front];
    front = next;
    if (user) live.setAttribute('aria-live', 'polite');
    // The card that leaves the front drops away, then rejoins at the back.
    if (!still.matches && old.animate) {
      const ghost = old.animate(
        [{ opacity: 1, translate: '0 0' }, { opacity: 0, translate: '0 28px' }],
        { duration: 320, easing: 'cubic-bezier(.55,0,1,.45)' }
      );
      old.style.transition = 'none';
      ghost.finished.then(() => { old.style.transition = ''; }).catch(() => {});
    }
    paint();
    play(cards[front]);
  }

  function sync() {
    const play = !stopped && visible;
    root.classList.toggle('is-playing', play);
    root.classList.toggle('is-stopped', stopped);
    pauseBtn.setAttribute('aria-label', stopped ? 'Play the cards' : 'Pause the cards');
  }

  function stop() { stopped = true; sync(); }

  // Autoplay: the active tab's bar fills, then the stack advances.
  root.addEventListener('animationend', (e) => {
    if (e.animationName === 'tab-fill' && root.classList.contains('is-playing')) show(front + 1, false);
  });

  // Hold while the pointer or focus is inside.
  const hold = (on) => root.classList.toggle('is-held', on);
  root.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') hold(true); });
  root.addEventListener('pointerleave', () => hold(false));
  root.addEventListener('focusin', () => hold(true));
  root.addEventListener('focusout', (e) => { if (!root.contains(e.relatedTarget)) hold(false); });

  tabs.forEach((t, i) => t.addEventListener('click', () => { stop(); show(i, true); }));
  pauseBtn.hidden = still.matches;
  pauseBtn.addEventListener('click', () => { stopped = !stopped; sync(); });

  // A card behind the front one comes forward when clicked.
  cards.forEach((card, i) => card.addEventListener('click', (e) => {
    if (depth(i) !== 0) { e.preventDefault(); stop(); show(i, true); }
  }));

  // Arrow keys and swipes move through the stack.
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault(); stop();
      show(front + (e.key === 'ArrowRight' ? 1 : -1), true);
      tabs[front].focus();
    }
  });
  let x0 = null;
  live.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') x0 = e.clientX; });
  live.addEventListener('pointerup', (e) => {
    if (x0 === null) return;
    const dx = e.clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) { stop(); show(front + (dx < 0 ? 1 : -1), true); }
  });

  // Play only while the stack is on screen and the tab is visible.
  new IntersectionObserver(([en]) => { visible = en.isIntersecting && !document.hidden; sync(); }, { threshold: 0.4 }).observe(root);
  document.addEventListener('visibilitychange', () => { visible = !document.hidden; sync(); });

  paint();
  sync();
  // Play the first card once the hero has entered.
  setTimeout(() => play(cards[front]), 500);
}
