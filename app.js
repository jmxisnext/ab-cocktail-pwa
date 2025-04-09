async function loadRecipes() {
    try {
      const res = await fetch('/data/recipes_full.json');
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const recipes = await res.json();
      renderRecipes(recipes);
    } catch (error) {
      console.error('Failed to load recipes:', error);
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
        <p><strong>Glass:</strong> ${recipe.glass}</p>
        <ul>
          ${recipe.ingredients.map(i => `<li>${i.amount} ${i.item}</li>`).join('')}
        </ul>
        <p><strong>Method:</strong> ${recipe.method}</p>
        <p><strong>Garnish:</strong> ${recipe.garnish}</p>
        <p><strong>Tags:</strong> ${recipe.tags.join(', ')}</p>
      `;
  
      container.appendChild(card);
    });
  }
  
  loadRecipes();
  