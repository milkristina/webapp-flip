// Modal functionality
(() => {
  const modal = document.getElementById('modal');
  const modalDesc = document.getElementById('modal-desc');
  const modalTitle = document.getElementById('modal-title');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const tipsPage = document.getElementById('tips-page');
  const tipsList = document.getElementById('tips-list');
  const btnTips = document.getElementById('btn-tips');

  modalCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function openModal(title, text, showRestart = false, showCloseBtn = true, bgColor = null) {
    modalTitle.textContent = title;
    modalDesc.textContent = text;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    document.getElementById('modal-footer').style.display = showRestart ? 'block' : 'none';

    const closeBtn = document.getElementById('modal-close-btn');
    closeBtn.style.display = showCloseBtn ? 'inline-block' : 'none';
    if (showCloseBtn) closeBtn.focus();

    const modalContent = document.querySelector('.modal-content');
    const color = bgColor ?? 'var(--modal-text-bg)';

    modalContent.style.background = color;
    const restartBtn = document.getElementById('restart-btn');
    if (restartBtn) {
      restartBtn.style.background = color;
      restartBtn.style.borderColor = color;
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    const footer = document.getElementById('modal-footer');
    footer.style.display = 'none';

    if (tipsPage.style.display === 'flex') {
      const firstTipBtn = tipsList.querySelector('button.tip-btn');
      firstTipBtn?.focus();
    } else {
      btnTips.focus();
    }
  }

  window.AppModules = window.AppModules || {};
  window.AppModules.modal = {
    openModal,
    closeModal
  };
})();