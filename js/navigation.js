// Navigation and routing functionality
(() => {
  // DOM elements
  const home = document.getElementById('home');
  const tipsPage = document.getElementById('tips-page');
  const budgetPage = document.getElementById('budget-page');
  const rulesPage = document.getElementById('rules-page');
  const familyBudgetPage = document.getElementById('family-budget-page');
  const childBudgetPage = document.getElementById('child-budget-page');
  const parentBudgetPage = document.getElementById('parent-budget-page');
  const budgetSelection = document.getElementById('budget-selection');
  const budgetHeading = document.getElementById('budget-heading');
  const introScreen = document.getElementById('intro-screen');

  // Navigation buttons
  const btnTips = document.getElementById('btn-tips');
  const btnBudget = document.getElementById('btn-budget');
  const btnRules = document.getElementById('btn-rules');
  const btnStartGame = document.getElementById('btn-start-game');
  const btnBackFromTips = document.getElementById('btn-back-from-tips');
  const btnBackFromBudget = document.getElementById('btn-back-from-budget');
  const btnBackFromRules = document.getElementById('btn-back-from-rules');
  const btnBackFromFamilyBudget = document.getElementById('btn-back-from-family-budget');
  const btnBackFromChildBudget = document.getElementById('btn-back-from-child-budget');
  const btnBackFromParentBudget = document.getElementById('btn-back-from-parent-budget');

  // Budget type buttons
  const familyBudgetBtn = document.getElementById('family-budget-btn');
  const childBudgetBtn = document.getElementById('child-budget-btn');
  const parentBudgetBtn = document.getElementById('parent-budget-btn');

  // Navigation event listeners
  btnTips.addEventListener('click', () => {
    window.AppModules.tips.populateTips();
    showSection(tipsPage);
  });

  btnBudget.addEventListener('click', () => {
    showSection(budgetPage);
    budgetSelection.style.display = 'flex';
    familyBudgetPage.style.display = 'none';
    childBudgetPage.style.display = 'none';
    parentBudgetPage.style.display = 'none';
    toggleGeneralBackButton(true);
  });

  btnRules.addEventListener('click', () => {
    showSection(rulesPage);
  });

  btnStartGame.addEventListener('click', () => {
    requestFullscreen();
    introScreen.style.display = 'none';
    showSection(home);
  });

  // Back navigation buttons
  btnBackFromTips.addEventListener('click', () => {
    showSection(home);
  });

  btnBackFromBudget.addEventListener('click', () => {
    showSection(home);
    budgetSelection.style.display = 'flex';
    familyBudgetPage.style.display = 'none';
    childBudgetPage.style.display = 'none';
    parentBudgetPage.style.display = 'none';
    familyBudgetPage.setAttribute('aria-hidden', 'true');
    childBudgetPage.setAttribute('aria-hidden', 'true');
    parentBudgetPage.setAttribute('aria-hidden', 'true');
  });

  btnBackFromRules.addEventListener('click', () => {
    showSection(home);
    document.querySelector('.background-figure')?.classList.remove('rules-background-under');
  });

  btnBackFromFamilyBudget.addEventListener('click', () => {
    familyBudgetPage.style.display = 'none';
    familyBudgetPage.setAttribute('aria-hidden', 'true');
    budgetSelection.style.display = 'flex';
    toggleGeneralBackButton(true);
    budgetHeading.style.display = 'block';
  });

  btnBackFromChildBudget.addEventListener('click', () => {
    childBudgetPage.style.display = 'none';
    childBudgetPage.setAttribute('aria-hidden', 'true');
    budgetSelection.style.display = 'flex';
    toggleGeneralBackButton(true);
    budgetHeading.style.display = 'block';
  });

  btnBackFromParentBudget.addEventListener('click', () => {
    parentBudgetPage.style.display = 'none';
    parentBudgetPage.setAttribute('aria-hidden', 'true');
    budgetSelection.style.display = 'flex';
    toggleGeneralBackButton(true);
    budgetHeading.style.display = 'block';
  });

  // Budget type navigation
  familyBudgetBtn.addEventListener('click', () => {
    budgetSelection.style.display = 'none';
    familyBudgetPage.style.display = 'block';
    familyBudgetPage.setAttribute('aria-hidden', 'false');
    toggleGeneralBackButton(false);
    budgetHeading.style.display = 'none';
  });

  childBudgetBtn.addEventListener('click', () => {
    budgetSelection.style.display = 'none';
    childBudgetPage.style.display = 'block';
    childBudgetPage.setAttribute('aria-hidden', 'false');
    toggleGeneralBackButton(false);
    budgetHeading.style.display = 'none';
  });

  parentBudgetBtn.addEventListener('click', () => {
    budgetSelection.style.display = 'none';
    budgetHeading.style.display = 'none';
    if (window.AppModules.parentBudget.getInitialBudget() !== null) {
      window.AppModules.parentBudget.openParentBudgetPage();
    } else {
      document.getElementById('adult-budget-selection').style.display = 'flex';
      toggleGeneralBackButton(false);
    }
  });

  // Utility functions
  function showSection(sectionToShow) {
    [home, tipsPage, budgetPage, rulesPage].forEach(section => {
      if (section === sectionToShow) {
        section.style.display = 'flex';
        section.setAttribute('aria-hidden', 'false');
        if (typeof section.focus === 'function') {
          section.focus();
        }
      } else {
        section.style.display = 'none';
        section.setAttribute('aria-hidden', 'true');
      }
    });
    window.AppModules.modal.closeModal();
  }

  function toggleGeneralBackButton(show) {
    const btn = document.getElementById('btn-back-from-budget');
    btn.style.visibility = show ? 'visible' : 'hidden';
  }

  function requestFullscreen() {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  // Export functions for use by other modules
  window.AppModules = window.AppModules || {};
  window.AppModules.navigation = {
    showSection,
    toggleGeneralBackButton,
    requestFullscreen
  };
})();