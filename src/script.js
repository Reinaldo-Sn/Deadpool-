document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('[data-tab-button]');

  function hideAllTabs() {
    document.querySelectorAll('[data-tab-id]').forEach(tab => {
      tab.classList.remove('movies__list--is-active');
    });
  }

  function deactivateAllButtons() {
    buttons.forEach(btn => {
      btn.classList.remove('movies__tabs__button--is-active');
    });
  }

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.tabButton;
      const targetTab = document.querySelector(`[data-tab-id="${targetId}"]`);

      hideAllTabs();
      deactivateAllButtons();

      targetTab.classList.add('movies__list--is-active');
      button.classList.add('movies__tabs__button--is-active');
    });
  });

  document.querySelectorAll('.faq__question').forEach(question => {
    question.addEventListener('click', () => {
      const isOpen = question.getAttribute('aria-expanded') === 'true';
      const answer = question.nextElementSibling;

      document.querySelectorAll('.faq__question').forEach(q => {
        q.setAttribute('aria-expanded', 'false');
        q.nextElementSibling.classList.remove('faq__answer--open');
      });

      if (!isOpen) {
        question.setAttribute('aria-expanded', 'true');
        answer.classList.add('faq__answer--open');
      }
    });
  });
});
