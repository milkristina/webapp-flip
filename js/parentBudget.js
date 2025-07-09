// Parent budget functionality
(() => {
  let parentInitialBudget = null;
  let selectedColors = Array.from({ length: 6 }).fill(null);

  document.addEventListener('DOMContentLoaded', function () {
    const budgetElement = document.getElementById('pbp-budgetAmount');
    const currentInputs = document.querySelectorAll('.pbp-current-input');
    const additionalInputs = document.querySelectorAll('.pbp-additional-input');
    const remainingAmountElement = document.getElementById('pbp-remainingAmount');
    const spentTotalElement = document.getElementById('pbp-spentTotal');
    const additionalTotalElement = document.getElementById('pbp-additionalTotal');
    const violetCountElement = document.getElementById('pbp-violetCount');
    const blueCountElement = document.getElementById('pbp-blueCount');
    const yellowCountElement = document.getElementById('pbp-yellowCount');

    function updateTotals() {
      let totalSpent = 0;
      let additionalTotal = 0;

      currentInputs.forEach((input, index) => {
        const current = parseFloat(input.value) || 0;
        const additional = parseFloat(additionalInputs[index].value) || 0;
        totalSpent += current;
        additionalTotal += additional;
      });

      const remaining = parentInitialBudget - totalSpent + additionalTotal;
      budgetElement.textContent = parentInitialBudget.toFixed(2); 
      remainingAmountElement.textContent = remaining.toFixed(2);
      spentTotalElement.textContent = totalSpent.toFixed(2);
      additionalTotalElement.textContent = additionalTotal.toFixed(2);
    }

    function updateColorCounts() {
      const violetCount = selectedColors.filter(c => c === 'violet').length;
      const blueCount = selectedColors.filter(c => c === 'blue').length;
      const yellowCount = selectedColors.filter(c => c === 'yellow').length;

      violetCountElement.textContent = violetCount;
      blueCountElement.textContent = blueCount;
      yellowCountElement.textContent = yellowCount;
    }

    function checkAndShowColorModal(selectedColors, openModalFn) {
      if (selectedColors.every(c => c !== null)) {
        const colorCounts = {
          violet: selectedColors.filter(c => c === 'violet').length,
          blue: selectedColors.filter(c => c === 'blue').length,
          yellow: selectedColors.filter(c => c === 'yellow').length
        };

        const dominantColor = Object.entries(colorCounts).reduce((a, b) => a[1] >= b[1] ? a : b)[0];

        let title, text;
        if (dominantColor === 'violet') {
          title = "The visionary with a plan";
          text = "Purple thinks ahead and makes decisions consciously and thoughtfully. It's okay to spend a bit – as long as it's worth it. Those who choose purple think practically and creatively, invest inquality, security, or joy – for themselves or for others. Purple knows their own style and likes to stay one step ahead";
        } else if (dominantColor === 'blue') {
          title = "The visionary with a plan";
          text = "Blue takes a close look at the situation and looks for a solution that fits. Not too expensive, not too risky – just doable. Blue often finds clever ideas that work without having to be perfect. Those who choose blue decide practically, flexibly, and with a good sense of what's needed in the moment.";
        } else if (dominantColor === 'yellow') {
          title = "The relaxed decision-maker";
          text = "Yellow thinks ahead before something happens – and sometimes chooses to go without, save for later, or wait. Those who choose yellow don't need much to get by Yellow values calm, inner clarity, or their own path. The goal? Make do with what's available – and still be content.";
        }
        const colorHex = { violet: '#8a2be2', blue: '#3498db', yellow: '#ffd700' }[dominantColor];
        openModalFn(title, text, true, false, colorHex);
      }
    }

    currentInputs.forEach(input => input.addEventListener('input', updateTotals));
    additionalInputs.forEach(input => input.addEventListener('input', updateTotals));

    document.querySelectorAll('.pbp-color-circle').forEach(circle => {
      circle.addEventListener('click', function () {
        const row = this.closest('tr');
        const rowIndex = row.rowIndex - 1;
        const color = this.dataset.color;

        row.querySelectorAll('.pbp-color-circle').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');

        selectedColors[rowIndex] = color;
        updateColorCounts();
        checkAndShowColorModal(selectedColors, window.AppModules.modal.openModal);
      });
    });

    updateTotals();
    updateColorCounts();
  });

  // Adult budget selection event listeners
  document.getElementById('one-adult-btn').addEventListener('click', () => {
    parentInitialBudget = 400;
    resetParentBudget();
    openParentBudgetPage();
  });

  document.getElementById('two-adults-btn').addEventListener('click', () => {
    parentInitialBudget = 200;
    resetParentBudget();
    openParentBudgetPage();
  });

  document.getElementById('change-adult-option').addEventListener('click', () => {
    const parentBudgetPage = document.getElementById('parent-budget-page');
    parentBudgetPage.style.display = 'none';
    parentBudgetPage.setAttribute('aria-hidden', 'true');
    document.getElementById('adult-budget-selection').style.display = 'flex';
    window.AppModules.navigation.toggleGeneralBackButton(false);
  });

  // Restart functionality
  document.getElementById('restart-btn').addEventListener('click', () => {
    location.reload();
  });

  function resetParentBudget() {
    document.querySelectorAll('.pbp-current-input, .pbp-additional-input')
      .forEach(inp => inp.value = 0);
    document.querySelectorAll('.pbp-color-circle.selected')
      .forEach(c => c.classList.remove('selected'));

    selectedColors = Array.from({ length: 6 }).fill(null);
    document.dispatchEvent(new Event('input'));
  }

  function openParentBudgetPage() {
    const parentPage = document.getElementById('parent-budget-page');
    const adultSelection = document.getElementById('adult-budget-selection');
    const budgetSelection = document.getElementById('budget-selection');
    
    adultSelection.style.display = 'none';
    budgetSelection.style.display = 'none';

    if (parentPage.style.display === 'block') {
      console.log('Parent budget page already open – skipping duplicate show.');
      return;
    }

    parentPage.style.display = 'block';
    window.AppModules.navigation.toggleGeneralBackButton(false);

    parentPage.setAttribute('aria-hidden', 'false');

    document.getElementById('pbp-budgetAmount').textContent = parentInitialBudget.toFixed(2);
    document.getElementById('pbp-remainingAmount').textContent = parentInitialBudget.toFixed(2);

    document.querySelectorAll('.pbp-current-input')[0].dispatchEvent(new Event('input'));
  }

  // Export functions for use by other modules
  window.AppModules = window.AppModules || {};
  window.AppModules.parentBudget = {
    openParentBudgetPage,
    getInitialBudget: () => parentInitialBudget
  };
})();
