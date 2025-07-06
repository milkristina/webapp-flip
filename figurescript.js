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