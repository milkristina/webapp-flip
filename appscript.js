(() => {
  // Element references
  const home = document.getElementById('home');
  const tipsPage = document.getElementById('tips-page');
  const budgetPage = document.getElementById('budget-page');
  const modal = document.getElementById('modal');
  const modalDesc = document.getElementById('modal-desc');
  const modalTitle = document.getElementById('modal-title');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const btnTips = document.getElementById('btn-tips');
  const btnBudget = document.getElementById('btn-budget');
  const btnBackFromTips = document.getElementById('btn-back-from-tips');
  const btnBackFromBudget = document.getElementById('btn-back-from-budget');
  const tipsList = document.getElementById('tips-list');
  const budgetSelection = document.getElementById('budget-selection');
  const familyBudgetPage = document.getElementById('family-budget-page');
  const familyBudgetBtn = document.getElementById('family-budget-btn');
  const btnRules = document.getElementById('btn-rules');
  const rulesPage = document.getElementById('rules-page');
  const btnBackFromRules = document.getElementById('btn-back-from-rules');
  // Element references (pridėkite žemiau jau esančių)
  const childBudgetBtn   = document.getElementById('child-budget-btn');
  const childBudgetPage  = document.getElementById('child-budget-page');
const parentBudgetBtn   = document.getElementById('parent-budget-btn');
const parentBudgetPage  = document.getElementById('parent-budget-page');
// mygtukai
const btnBackFromFamilyBudget = document.getElementById('btn-back-from-family-budget');
const btnBackFromChildBudget = document.getElementById('btn-back-from-child-budget');
const btnBackFromParentBudget = document.getElementById('btn-back-from-parent-budget');
const budgetHeading = document.getElementById('budget-heading');
//start game
const introScreen = document.getElementById('intro-screen');
const btnStartGame = document.getElementById('btn-start-game');




  // Data for tips
  const tipsData = [
    { title: "Budget", text: "A budget is a plan for managing income and expenses over a specific period. It helps individuals track spending and save money by setting limits on various expense categories" },
    { title: "Money", text: "Money is what we use to buy things we need or want. You can earn money by doing jobs or chores" },
    { title: "Saving", text: "Saving means putting some money aside and not spending it right away. It helps you buy something bigger later or be ready for surprises." },
    { title: "Piggy Bank", text: "A piggy bank is a small container to keep your saved money safe at home. It's a fun way to start learning how to save" },
    { title: "Allowance", text: "An allowance is money your parents give you regularly, often for helping with chores. You can choose to spend or save it" },
    { title: "Smart Choices", text: "Smart choices mean thinking carefully before using your money. It helps you use money in a way that's good for you now and later " },
    { title: "Wants Later", text: "Wants later are things you don't need right now, but want to save for. Like a skateboard or a big Lego set" },
    { title: "Money Goal", text: "A money goal is something you want to save for, like a new toy. You can keep track of how close you are" },
    { title: "Save, Spend, Share", text: "These are the three main things you can do with money: save for later, spend on something now, or share with someone who needs help" },
    { title: "Price", text: "Price is how much something costs. You need to check the price before deciding to buy something" },
    { title: "Needs vs. Wants", text: "Needs are things you must have, like food and clothes. Wants are things you'd like to have, like toys or candy" },
    { title: "Spending Plan", text: "A spending plan helps you decide how much money to use now and how much to save. It's like a map for your money" },
    { title: "Smart Shopper", text: "A smart shopper compares prices, looks for sales, and doesn't buy things too quickly. It helps you spend your money wisely" },
    { title: "Money Habit", text: "A money habit is something you do with money regularly, like always saving a part of what you get. Good money habits help you grow up to be smart with money" },
  ];

  // Show a specific section and hide others
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
    closeModal();
  }

  // Populate tips buttons dynamically
  function populateTips() {
    tipsList.innerHTML = '';
    tipsData.forEach(tip => {
      const btn = document.createElement('button');
      btn.className = 'tip-btn';
      btn.type = 'button';
      btn.textContent = tip.title;
      btn.setAttribute('aria-haspopup', 'dialog');
      btn.setAttribute('aria-controls', 'modal');
      btn.addEventListener('click', () => {
        openModal(tip.title, tip.text);
      });
      tipsList.appendChild(btn);
    });
  }

  // Open modal with title and text
  function openModal(title, text) {
    modalTitle.textContent = title;
    modalDesc.textContent = text;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    modalCloseBtn.focus();
    document.body.style.overflow = 'hidden';
  }

  // Close modal and restore focus appropriately
  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (tipsPage.style.display === 'flex') {
      const firstTipBtn = tipsList.querySelector('button.tip-btn');
      firstTipBtn?.focus();
    } else {
      btnTips.focus();
    }
  }

  // Event listeners

  btnTips.addEventListener('click', () => {
    populateTips();
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

  btnBackFromTips.addEventListener('click', () => {
    showSection(home);
  });

  btnBackFromBudget.addEventListener('click', () => {
    showSection(home);
    budgetSelection.style.display = 'flex';
    familyBudgetPage.style.display = 'none';
    childBudgetPage.style.display  = 'none';
    parentBudgetPage.style.display  = 'none';
    familyBudgetPage.setAttribute('aria-hidden', 'true');
    childBudgetPage.setAttribute('aria-hidden', 'true');
    parentBudgetPage.setAttribute('aria-hidden', 'true');
  });

  familyBudgetBtn.addEventListener('click', () => {
    budgetSelection.style.display = 'none';
    familyBudgetPage.style.display = 'block';
    familyBudgetPage.setAttribute('aria-hidden', 'false');
    toggleGeneralBackButton(false);
    budgetHeading.style.display = 'none';
  });
  

  btnRules.addEventListener('click', () => {
    showSection(rulesPage);
  });

  btnBackFromRules.addEventListener('click', () => {
    showSection(home);
    document.querySelector('.background-figure')?.classList.remove('rules-background-under');
  });

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

  // Randomly position background images in a grid with slight random offset
  (() => {
    const imgs = document.querySelectorAll('.bg-img');
    const gridSize = Math.ceil(Math.sqrt(imgs.length)); // cells per row/column
    const usedPositions = new Set();

    imgs.forEach(() => {
      let xCell, yCell;
      let positionKey;

      do {
        xCell = Math.floor(Math.random() * gridSize);
        yCell = Math.floor(Math.random() * gridSize);
        positionKey = `${xCell},${yCell}`;
      } while (usedPositions.has(positionKey));
      usedPositions.add(positionKey);

      const spacing = 100 / gridSize;
      const randomOffsetX = Math.random() * (spacing - 10);
      const randomOffsetY = Math.random() * (spacing - 10);

      const left = xCell * spacing + randomOffsetX;
      const top = yCell * spacing + randomOffsetY;

      const img = imgs[usedPositions.size - 1];
      img.style.position = 'absolute';
      img.style.left = `${left}vw`;
      img.style.top = `${top}vh`;
    });
  })();

  // Initial setup
  //showSection(home);

  //child
  document.addEventListener('DOMContentLoaded', function () {
        const budgetElement = document.getElementById('cbp-budgetAmount');
        const currentInputs = document.querySelectorAll('.cbp-current-input');
        const additionalInputs = document.querySelectorAll('.cbp-additional-input');
        const remainingAmountElement = document.getElementById('cbp-remainingAmount');
        const spentTotalElement = document.getElementById('cbp-spentTotal');
        const additionalTotalElement = document.getElementById('cbp-additionalTotal');
        let selectedColors = Array.from({ length: 6 }).fill(null);

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
            budgetElement.textContent = remaining.toFixed(2);
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
            });
        });

        updateTotals();
        updateColorCounts();
    });

    // Rodyti CHILD biudžeto puslapį
childBudgetBtn.addEventListener('click', () => {
  budgetSelection.style.display = 'none';      
  childBudgetPage.style.display  = 'block';    
  childBudgetPage.setAttribute('aria-hidden', 'false');
  toggleGeneralBackButton(false);
  budgetHeading.style.display = 'none';
});

//parent

  document.addEventListener('DOMContentLoaded', function () {
        const budgetElement = document.getElementById('pbp-budgetAmount');
        const currentInputs = document.querySelectorAll('.pbp-current-input');
        const additionalInputs = document.querySelectorAll('.pbp-additional-input');
        const remainingAmountElement = document.getElementById('pbp-remainingAmount');
        const spentTotalElement = document.getElementById('pbp-spentTotal');
        const additionalTotalElement = document.getElementById('pbp-additionalTotal');
        let selectedColors = Array.from({ length: 6 }).fill(null);

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

            const remaining = 400 - totalSpent + additionalTotal;
            budgetElement.textContent = remaining.toFixed(2);
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
            });
        });

        updateTotals();
        updateColorCounts();
    });

    // Rodyti CHILD biudžeto puslapį
parentBudgetBtn.addEventListener('click', () => {
  budgetSelection.style.display = 'none';      
  parentBudgetPage.style.display  = 'block';    
  parentBudgetPage.setAttribute('aria-hidden', 'false');
  toggleGeneralBackButton(false);
  budgetHeading.style.display = 'none';
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

function toggleGeneralBackButton(show) {
  const btn = document.getElementById('btn-back-from-budget');
  btn.style.visibility = show ? 'visible' : 'hidden';
}

//per visa ekrana
function requestFullscreen() {
  const element = document.documentElement; // visa svetainė
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) { // Safari
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { // IE11
    element.msRequestFullscreen();
  }
}

btnStartGame.addEventListener('click', () => {
  requestFullscreen();
  introScreen.style.display = 'none';    // paslėpti intro
  showSection(home);                     // rodyti tikrą pradžią
});

})();
