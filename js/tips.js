// Tips functionality
(() => {
  const tipsList = document.getElementById('tips-list');

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
        window.AppModules.modal.openModal(tip.title, tip.text);
      });
      tipsList.appendChild(btn);
    });
  }
  window.AppModules = window.AppModules || {};
  window.AppModules.tips = {
    populateTips
  };
})();
