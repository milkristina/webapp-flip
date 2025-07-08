// Child budget functionality
(() => {
  let selectedColors = Array.from({ length: 6 }).fill(null);

  document.addEventListener('DOMContentLoaded', function () {
    const budgetElement = document.getElementById('cbp-budgetAmount');
    const currentInputs = document.querySelectorAll('.cbp-current-input');
    const additionalInputs = document.querySelectorAll('.cbp-additional-input');
    const remainingAmountElement = document.getElementById('cbp-remainingAmount');
    const spentTotalElement = document.getElementById('cbp-spentTotal');
    const additionalTotalElement = document.getElementById('cbp-additionalTotal');

    const violetCountElement = document.getElementById('cbp-violetCount');
    const blueCountElement = document.getElementById('cbp-blueCount');
    const yellowCountElement = document.getElementById('cbp-yellowCount');

    function updateTotals() {
      let totalSpent = 0;
      let additionalTotal = 0;

      currentInputs.forEach((input, index) => {
        const current = parseFloat(input.value) || 0;
        const additional = parseFloat(additionalInputs[index].value) || 0;
        totalSpent += current;
        additionalTotal += additional;
      });

      const remaining = 20 - totalSpent + additionalTotal;
      budgetElement.textContent = '20.00'; 
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

    document.querySelectorAll('.cbp-color-circle').forEach(circle => {
      circle.addEventListener('click', function () {
        const row = this.closest('tr');
        const rowIndex = row.rowIndex - 1;
        const color = this.dataset.color;

        row.querySelectorAll('.cbp-color-circle').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');

        selectedColors[rowIndex] = color;
        updateColorCounts();
        checkAndShowColorModal(selectedColors, window.AppModules.modal.openModal);
      });
    });

    updateTotals();
    updateColorCounts();
  });
  window.AppModules = window.AppModules || {};
  window.AppModules.childBudget = {
  };
})();
