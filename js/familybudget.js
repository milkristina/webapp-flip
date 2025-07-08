 (() => {

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
        text.setAttribute('dominant-baseline', 'middle');
        text.style.fontSize = '12px';
        text.style.fill = '#000';
        const words = section.label.split(' ');
        const maxCharsPerLine = 18; 
        let lines = [];
        let currentLine = '';

        words.forEach(word => {
        const testLine = currentLine ? currentLine + ' ' + word : word;
        if (testLine.length > maxCharsPerLine) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
        });
        if (currentLine) lines.push(currentLine);

        lines.forEach((line, index) => {
        const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        tspan.setAttribute('x', textPos.x);
        tspan.setAttribute('dy', index === 0 ? '0' : '1.2em'); // 1.2em tarp eilučių
        tspan.textContent = line;
        text.appendChild(tspan);
        });
    
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

})();