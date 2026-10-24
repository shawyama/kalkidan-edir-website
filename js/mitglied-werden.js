/* Funktionen für die Mitglied-werden-Seite. Der Dialog ist derzeit deaktiviert;
   diese Datei ist vorbereitet, falls der PDF-Dialog später wieder aktiviert wird. */
(() => {
  const modal = document.getElementById('applicationPdfModal');
  const open = document.getElementById('openApplicationPdf');
  if (!modal || !open) return;
  const closeButtons = modal.querySelectorAll('[data-close-application-modal]');
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('application-modal-open');
    open.focus();
  }
  open.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('application-modal-open');
    modal.querySelector('.application-modal-close').focus();
  });
  closeButtons.forEach(button => button.addEventListener('click', closeModal));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });
})();
