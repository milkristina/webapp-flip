(() => {
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
  const childBudgetBtn   = document.getElementById('child-budget-btn');
  const childBudgetPage  = document.getElementById('child-budget-page');
  const parentBudgetBtn   = document.getElementById('parent-budget-btn');
  const parentBudgetPage  = document.getElementById('parent-budget-page');
  const btnBackFromFamilyBudget = document.getElementById('btn-back-from-family-budget');
  const btnBackFromChildBudget = document.getElementById('btn-back-from-child-budget');
  const btnBackFromParentBudget = document.getElementById('btn-back-from-parent-budget');
  const budgetHeading = document.getElementById('budget-heading');
  const introScreen = document.getElementById('intro-screen');
  const btnStartGame = document.getElementById('btn-start-game');
  let parentInitialBudget = null;   // keičiasi tarp 400 ir 200
// --- /NEW ---
  
  const tipsData = [
    { title: "Budget", text: "A budget is like your family's plan for the month! It helps you decide how much money to spend and how much to save. Just like in the game, you can split your money between needs, wants, and savings to stay on track." },
    { title: "Money", text: "Money is what we use to buy things we need or want. In Klagenfurt, you can earn money through choices or tasks – just like in real life where you can earn by helping out!" },
    { title: "Saving", text: "Saving means setting money aside and not using it right away. It's smart to save for something special or for when surprises happen – you'll thank yourself later!" },
    { title: "Piggy Bank", text: " A piggy bank is a small, safe place to store your savings at home. Just like your pocket money in the game, it's the perfect start to managing your money." },
    { title: "Allowance", text: "An allowance is money you receive regularly, often for helping around the house. You get to decide: spend a little now or save it for something exciting later." },
    { title: "Smart Choices", text: "Being a financial detective means making smart choices! Think before spending: is this helpful now, or would it be smarter to wait?" },
    { title: "Wants Later", text: "Some things are worth the wait. Wants later are items like a skateboard or game – not something you need right away, but something you can save toward." },
    { title: "Money Goal", text: "Set a goal! Whether it's a new toy or a family outing, saving becomes easier when you have something special in mind." },
    { title: "Save, Spend, Share", text: "Money has three superpowers: saving for the future, spending on things you enjoy, and sharing with those in need. All three are part of being a great money detective!" },
    { title: "Price", text: "Before buying anything, always check the price. Compare and decide – is it a good deal or should you wait?" },
    { title: "Needs vs. Wants", text: "Understanding the difference between needs and wants is key! Needs are things you must have, like food or clothes. Wants are fun extras like candy or toys." },
    { title: "Spending Plan", text: "Just like your route through Klagenfurt, a spending plan helps guide your money choices. It helps you balance what you use now and what you save." },
    { title: "Smart Shopper", text: "Being a smart shopper means looking for deals, comparing prices, and not rushing into spending. It's a great detective skill!" },
    { title: "Money Habit", text: "Money habits are routines you follow – like saving a little bit every time you get money. The more you practice, the better you get!" },
    { title: "Tracking Expenses", text: "Keep a little notebook or chart to write down what you spend. Knowing where your money goes helps you make better choices. Just like in our game, it helps you understand spendings and earnings better. Noone has a calculator in their head." },
    { title: "Sales and Discounts", text: "Watch for special offers or sales. Waiting a bit could mean getting what you want for less!" },
    { title: "Money and Time", text: "Time is like money – how you spend it matters! Managing your time well helps you manage your money, too." },
    { title: "Investing Basics", text: "TInvesting means putting your money to work so it grows over time. It's like planting a money tree for the future!" },
  ];

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

  function openModal(title, text) {
    modalTitle.textContent = title;
    modalDesc.textContent = text;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    modalCloseBtn.focus();
    document.body.style.overflow = 'hidden';
    const footer = document.getElementById('modal-footer');
    footer.style.display = showRestart ? 'block' : 'none';
  }

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

  // Randomly position background images 
  (() => {
    const imgs = document.querySelectorAll('.bg-img');
    const gridSize = Math.ceil(Math.sqrt(imgs.length)); 
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
            title = "Purple";
            text = "I love purple!";
        } else if (dominantColor === 'blue') {
            title = "Blue";
            text = "I love blue!";
        } else if (dominantColor === 'yellow') {
            title = "Yellow";
            text = "I love yellow!";
        }

        openModalFn(title, text, true);
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
                checkAndShowColorModal(selectedColors, openModal);
            });
        });

        updateTotals();
        updateColorCounts();
    });

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

            const remaining = parentInitialBudget - totalSpent + additionalTotal;
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
            title = "Purple";
            text = "I love purple!";
        } else if (dominantColor === 'blue') {
            title = "Blue";
            text = "I love blue!";
        } else if (dominantColor === 'yellow') {
            title = "Yellow";
            text = "I love yellow!";
        }

        openModalFn(title, text, true);
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
                checkAndShowColorModal(selectedColors, openModal);
            });
        });

        updateTotals();
        updateColorCounts();
    });

parentBudgetBtn.addEventListener('click', () => {
  budgetSelection.style.display = 'none';
  budgetHeading.style.display   = 'none';
  if (parentInitialBudget !== null) {
    openParentBudgetPage();
  } else {
    document.getElementById('adult-budget-selection').style.display = 'flex';
  }
});

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
  parentBudgetPage.style.display = 'none';
  parentBudgetPage.setAttribute('aria-hidden', 'true');
  document.getElementById('adult-budget-selection').style.display = 'flex';
  toggleGeneralBackButton(false);
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

btnStartGame.addEventListener('click', () => {
  requestFullscreen();
  introScreen.style.display = 'none';    
  showSection(home);                     
});


// --- NEW ---
// pagalbinė: nuvalo lentelę ir spalvas
function resetParentBudget() {
  document.querySelectorAll('.pbp-current-input, .pbp-additional-input')
    .forEach(inp => inp.value = 0);

  // nuimame pažymėtas spalvas
  document.querySelectorAll('.pbp-color-circle.selected')
    .forEach(c => c.classList.remove('selected'));

  selectedColors = Array.from({ length: 6 }).fill(null); // iš naujo!

  // atnaujiname biudžeto skaičiavimus
  document.dispatchEvent(new Event('input')); // suveiks updateTotals
}

// vienas suaugęs – 400 €
document.getElementById('one-adult-btn').addEventListener('click', () => {
  parentInitialBudget = 400;
  resetParentBudget();
  openParentBudgetPage();
});

// du suaugę – 200 €
document.getElementById('two-adults-btn').addEventListener('click', () => {
  parentInitialBudget = 200;
  resetParentBudget();
  openParentBudgetPage();
});


// atidaro tą patį puslapį, bet jau su nustatytu parentInitialBudget
function openParentBudgetPage() {
  const parentPage = document.getElementById('parent-budget-page');
  const adultSelection = document.getElementById('adult-budget-selection');

  // Saugiai paslepiam kitus pasirinkimus
  adultSelection.style.display = 'none';
  budgetSelection.style.display = 'none';

  // Jei puslapis jau rodomas – nieko nedarom (kad nekartotų)
  if (parentPage.style.display === 'block') {
    console.log('Parent budget page already open – skipping duplicate show.');
    return;
  }

  parentPage.style.display = 'block';
  toggleGeneralBackButton(false);  

  parentPage.setAttribute('aria-hidden', 'false');

  document.getElementById('pbp-budgetAmount').textContent = parentInitialBudget.toFixed(2);
  document.getElementById('pbp-remainingAmount').textContent = parentInitialBudget.toFixed(2);

  document.querySelectorAll('.pbp-current-input')[0].dispatchEvent(new Event('input'));
}


// --- /NEW ---


/* ==== NEIGIAMŲ SKAIČIŲ DRAUDIMAS ==== */
function enforceNonNegativeInputs() {
  document
    .querySelectorAll(
      '.pbp-current-input, .pbp-additional-input, ' +  
      '.cbp-current-input, .cbp-additional-input'      
    )
    .forEach(inp => {
      inp.setAttribute('min', '0');
      inp.addEventListener('keydown', e => {
        if (e.key === '-' || e.key === '+' || e.key.toLowerCase() === 'e') {
          e.preventDefault();
        }
      });
      inp.addEventListener('input', () => {
        const val = parseFloat(inp.value);
        if (!isNaN(val) && val < 0) inp.value = 0;
      });
    });
}
document.addEventListener('DOMContentLoaded', enforceNonNegativeInputs);

//family

const budgetData = [
    {
        id: 'daily',
        label: 'Money for everyday life',
        panelTitle: 'Fixed Expenses',
        color: '#F59E0B',
        items: [
            'Housing (rent incl. operating costs)',
            'Food, hygiene & medicine',
            'Transport (car, bus, pass, train journeys)',
            'Communication (mobile phone, internet)',
            'Streaming services (Spotify, Netflix)',
        ],
        startAngle: 180,
        endAngle: 360
    },
    {
        id: 'joy',
        label: 'Money for things that bring joy',
        panelTitle: 'Variable Expenses',
        color: '#EC4899',
        items: [
            'Holiday',
            'Shopping',
            'Eating out/Going out',
            'Entertainment',
            'Day trips',
            'Pocket money'
        ],
        startAngle: 75,
        endAngle: 180
    },
    {
        id: 'savings',
        label: 'Money for the future',
        panelTitle: 'Savings',
        color: '#22C55E',
        items: [
            'Money set aside',
            'Emergency fund'
        ],
        startAngle: 0,
        endAngle: 75
    }
];


function createSVGPath(startAngle, endAngle, radius) {
    const start = (startAngle - 90) * (Math.PI / 180);
    const end = (endAngle - 90) * (Math.PI / 180);
    
    const x1 = 200 + radius * Math.cos(start);
    const y1 = 200 + radius * Math.sin(start);
    const x2 = 200 + radius * Math.cos(end);
    const y2 = 200 + radius * Math.sin(end);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
        "M", 200, 200,
        "L", x1, y1,
        "A", radius, radius, 0, largeArcFlag, 1, x2, y2,
        "Z"
    ].join(" ");
}


function getTextPosition(startAngle, endAngle, radius = 120) {
    const midAngle = ((startAngle + endAngle) / 2 - 90) * (Math.PI / 180);
    const x = 200 + radius * Math.cos(midAngle);
    const y = 200 + radius * Math.sin(midAngle);
    return { x, y };
}


function handleSectionHover(sectionId, isHovering) {
    const panels = document.querySelectorAll('.info-panel');
    
    panels.forEach(panel => {
        if (isHovering) {
            if (panel.dataset.id === sectionId) {
                panel.classList.add('highlighted');
                panel.classList.remove('dimmed');
            } else {
                panel.classList.add('dimmed');
                panel.classList.remove('highlighted');
            }
        } else {
            panel.classList.remove('highlighted', 'dimmed');
        }
    });
}

// circle
function createBudgetCircle() {
    const svg = document.querySelector('.budget-circle');
    
    budgetData.forEach((section, index) => {
  
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', createSVGPath(section.startAngle, section.endAngle, 180));
        path.setAttribute('fill', section.color);
        path.style.transformOrigin = '200px 200px';
        path.style.animation = `sectionRotateIn 0.8s ease-out ${index * 0.2}s both`;
        
      
        path.addEventListener('mouseenter', () => handleSectionHover(section.id, true));
        path.addEventListener('mouseleave', () => handleSectionHover(section.id, false));
  
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        const textPos = getTextPosition(section.startAngle, section.endAngle);
        text.setAttribute('x', textPos.x);
        text.setAttribute('y', textPos.y);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'central');
        text.setAttribute('textLength', '110');
        text.textContent = section.label;
      
        group.appendChild(path);
        group.appendChild(text);
        svg.appendChild(group);
    });
}

function createInfoPanels() {
    const container = document.querySelector('.info-panels');
    
    budgetData.forEach((section, index) => {
        const panel = document.createElement('div');
        panel.className = 'info-panel';
        panel.dataset.id = section.id;
        panel.style.borderColor = section.color;
        panel.style.animationDelay = `${index * 0.1}s`;
        
        const title = document.createElement('h3');
        title.textContent = `${section.panelTitle}`;
        title.style.color = section.color;
        
        const list = document.createElement('ul');
        section.items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span>•</span><span>${item}</span>`;
            list.appendChild(listItem);
        });
        
        panel.appendChild(title);
        panel.appendChild(list);
        container.appendChild(panel);
        
        setTimeout(() => {
            panel.classList.add('show');
        }, 1000 + index * 100);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createBudgetCircle();
    createInfoPanels();
});


document.getElementById('parent-budget-btn').addEventListener('click', () => {
  budgetSelection.style.display = 'none';
  budgetHeading.style.display   = 'none';

  if (parentInitialBudget !== null) {
    openParentBudgetPage();
  } else {
    document.getElementById('adult-budget-selection').style.display = 'flex';
    toggleGeneralBackButton(false); 
  }
});

document.getElementById('restart-btn').addEventListener('click', () => {
  closeModal();
  // Grąžina į pradžios ekraną
  introScreen.style.display = 'flex';
  showSection(introScreen);
});

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


})();


// spalvos
