// Comportement "Voir plus / Voir moins" accessible pour plusieurs blocs.
// - Attache sur les boutons .toggle-desc
// - Chaque bouton doit avoir aria-controls="<ID>" ciblant .desc-text element
// - Gère clavier (Enter / Space), resize, et animation propre basée sur scrollHeight

(function () {
  'use strict';

  // Helpers
  const qs = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const isButton = el => el && el.classList && el.classList.contains('toggle-desc');

  // Initialise les blocs trouvés au chargement
  function initAll() {
    const buttons = qsa('.toggle-desc');
    buttons.forEach(initButton);
    // Ensure initial collapsed state for any desc-text without explicit inline style
    qsa('.desc-text').forEach(zone => {
      if (!zone.hasAttribute('data-initialized')) {
        zone.setAttribute('aria-hidden', 'true');
        zone.style.maxHeight = '0px';
        zone.setAttribute('data-initialized', 'true');
      }
    });
  }

  // Initialise un bouton (idempotent)
  function initButton(btn) {
    if (!btn || btn.__toggleInit) return;
    btn.__toggleInit = true;

    // keyboard support: Enter / Space
    btn.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        handleToggle(btn);
      }
    });

    // click support
    btn.addEventListener('click', function (ev) {
      ev.preventDefault();
      handleToggle(btn);
    });
  }

  // Toggle handler
  function handleToggle(btn) {
    const targetId = btn.getAttribute('aria-controls');
    if (!targetId) return;
    const zone = document.getElementById(targetId);
    if (!zone) return;

    const currentlyExpanded = btn.getAttribute('aria-expanded') === 'true';

    if (!currentlyExpanded) {
      openZone(btn, zone);
    } else {
      closeZone(btn, zone);
    }
  }

  // Open: measure scrollHeight and animate to that height
  function openZone(btn, zone) {
    // mark expanded
    btn.setAttribute('aria-expanded', 'true');
    zone.setAttribute('aria-hidden', 'false');

    // ensure element is visible for measurement
    zone.classList.add('open');

    // Remove any previously set inline transition to measure accurately
    zone.style.transition = 'none';
    zone.style.maxHeight = '0px';

    // Force style flush
    // eslint-disable-next-line no-unused-expressions
    zone.offsetHeight;

    const full = zone.scrollHeight + 'px';

    // apply transition and set final height
    zone.style.transition = 'max-height 340ms cubic-bezier(.2,.8,.2,1)';
    zone.style.maxHeight = full;

    // change button label if present as textContent; keep any inner icons intact by preferring dataset label
    if (btn.dataset.moreLabel) btn.textContent = btn.dataset.lessLabel || 'Voir moins';
    else if (btn.textContent.trim().toLowerCase().includes('voir')) btn.textContent = 'Voir moins';
    // optional: keep focus on button
    btn.focus();

    // cleanup after transition to allow natural height growth (remove inline maxHeight)
    const tidy = () => {
      zone.style.maxHeight = '';
      zone.style.transition = '';
      zone.removeEventListener('transitionend', tidy);
    };
    zone.addEventListener('transitionend', tidy);
  }

  // Close: animate to 0 then cleanup
  function closeZone(btn, zone) {
    btn.setAttribute('aria-expanded', 'false');
    zone.setAttribute('aria-hidden', 'true');

    // set explicit starting height to current computed height to animate from
    const current = zone.scrollHeight + 'px';
    zone.style.maxHeight = current;

    // Force flush
    // eslint-disable-next-line no-unused-expressions
    zone.offsetHeight;

    zone.style.transition = 'max-height 260ms cubic-bezier(.2,.8,.2,1)';
    zone.style.maxHeight = '0px';

    if (btn.dataset.moreLabel) btn.textContent = btn.dataset.moreLabel || 'Voir plus';
    else if (btn.textContent.trim().toLowerCase().includes('voir')) btn.textContent = 'Voir plus';

    // after transition, remove .open class
    const after = () => {
      zone.classList.remove('open');
      // cleanup inline styles
      zone.style.maxHeight = '';
      zone.style.transition = '';
      zone.removeEventListener('transitionend', after);
    };
    zone.addEventListener('transitionend', after);
  }

  // Recalculate open zones on resize (keeps them sized to content)
  function handleResize() {
    qsa('.desc-text.open').forEach(zone => {
      // temporarily remove transition to measure, then reapply maxHeight to new scrollHeight
      zone.style.transition = 'none';
      zone.style.maxHeight = zone.scrollHeight + 'px';
      // force repaint
      // eslint-disable-next-line no-unused-expressions
      zone.offsetHeight;
      zone.style.transition = 'max-height 340ms cubic-bezier(.2,.8,.2,1)';
      // leave maxHeight unset to allow natural growth after a short timeout
      setTimeout(() => {
        zone.style.maxHeight = '';
        zone.style.transition = '';
      }, 360);
    });
  }

  // Mutation observer to auto-init dynamically added buttons/blocks
  function observeMutations() {
    const mo = new MutationObserver(muts => {
      muts.forEach(m => {
        if (m.addedNodes && m.addedNodes.length) {
          m.addedNodes.forEach(node => {
            if (!(node instanceof Element)) return;
            if (node.matches && node.matches('.toggle-desc')) initButton(node);
            qsa('.toggle-desc', node).forEach(initButton);
            qsa('.desc-text', node).forEach(z => {
              if (!z.hasAttribute('data-initialized')) {
                z.setAttribute('aria-hidden', 'true');
                z.style.maxHeight = '0px';
                z.setAttribute('data-initialized', 'true');
              }
            });
          });
        }
      });
    });

    mo.observe(document.documentElement || document.body, {
      childList: true,
      subtree: true
    });
  }

  // Debounced resize
  let resizeTimer = null;
  function initResizeHandler() {
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 180);
    });
  }

  // Public init
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initAll();
        observeMutations();
        initResizeHandler();
      });
    } else {
      initAll();
      observeMutations();
      initResizeHandler();
    }
  }

  // Start
  init();

  // expose for debug (optional)
  window.__toggleDesc = {
    initAll,
    openZone,
    closeZone
  };
})();
