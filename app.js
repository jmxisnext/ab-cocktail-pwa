// GLOBAL: Make section switching work
window.showSection = function(id) {
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => section.style.display = 'none');
  
    const target = document.getElementById(`${id}-section`);
    if (target) target.style.display = 'block';
  }
  
  // Load cocktail recipes into #recipe-container
  async function loadRecipes() {
    const container = document.getElementById('recipe-container');
    container.innerHTML = '<p>Loading cocktails...</p>';
  
    try {
      const res = await fetch('/data/recipes_full.json');
      const recipes = await res.json();
      renderRecipes(recipes);
    } catch (err) {
      container.innerHTML = '<p>Error loading cocktail recipes.</p>';
      console.error("Error loading recipes:", err);
    }
  }
  
  function renderRecipes(recipes) {
    const container = document.getElementById('recipe-container');
    container.innerHTML = '';
  
    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
    
        card.innerHTML = `
          <h2>${recipe.name}</h2>
          <p><strong>Glass:</strong> ${recipe.glass || 'N/A'}</p>
          <ul>
            ${recipe.ingredients.map(i => `<li>${i.amount || ''} ${i.item || ''}</li>`).join('')}
          </ul>
          <p><strong>Method:</strong> ${recipe.method || 'No method provided'}</p>
          <p><strong>Garnish:</strong> ${recipe.garnish || 'None'}</p>
          <p><strong>Tags:</strong> ${recipe.tags?.join(', ') || 'No tags'}</p>
        `;
    
        container.appendChild(card);
      });
    }
    
    // Load prep item instructions into #prep-container
    async function loadPrepItems() {
      const container = document.getElementById('prep-container');
      container.innerHTML = '<p>Loading prep items...</p>';
    
      try {
        const res = await fetch('/data/prep_items.json');
        const prepItems = await res.json();
        renderPrepItems(prepItems);
      } catch (err) {
        container.innerHTML = '<p>Error loading prep instructions.</p>';
        console.error("Error loading prep items:", err);
      }
    }
    
    function renderPrepItems(prepItems) {
      const container = document.getElementById('prep-container');
      container.innerHTML = '';
    
      prepItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
    
        card.innerHTML = `
          <h2>${item.name}</h2>
          <p><strong>Ingredients:</strong></p>
          <ul>
            ${item.ingredients.map(ing => `<li>${ing}</li>`).join('')}
          </ul>
          <p><strong>Method:</strong> ${item.method || 'No instructions provided'}</p>
        `;
    
        container.appendChild(card);
      });
    }
    
    // Load everything and show Cocktails by default
    loadRecipes();
    loadPrepItems();
    showSection('cocktails');