(() => {
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
  })();