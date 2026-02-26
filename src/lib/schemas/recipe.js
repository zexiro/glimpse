export const recipeSchema = {
  id: 'recipe',
  name: 'Recipe',
  icon: '🍳',
  fields: [
    { key: 'name', label: 'Recipe Name', type: 'text', required: true, placeholder: 'Classic Banana Bread' },
    { key: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'A moist and delicious banana bread recipe' },
    { key: 'image', label: 'Image URL', type: 'url', required: true, placeholder: 'https://example.com/bread.jpg' },
    { key: 'authorName', label: 'Author', type: 'text', required: true, placeholder: 'Jane Doe' },
    { key: 'prepTime', label: 'Prep Time (ISO 8601)', type: 'text', required: false, placeholder: 'PT15M' },
    { key: 'cookTime', label: 'Cook Time (ISO 8601)', type: 'text', required: false, placeholder: 'PT60M' },
    { key: 'totalTime', label: 'Total Time (ISO 8601)', type: 'text', required: false, placeholder: 'PT75M' },
    { key: 'recipeYield', label: 'Yield', type: 'text', required: false, placeholder: '1 loaf' },
    { key: 'recipeCategory', label: 'Category', type: 'text', required: false, placeholder: 'Dessert' },
    { key: 'recipeCuisine', label: 'Cuisine', type: 'text', required: false, placeholder: 'American' },
    { key: 'calories', label: 'Calories', type: 'text', required: false, placeholder: '250' },
    { key: 'recipeIngredient', label: 'Ingredients (one per line)', type: 'textarea', required: true, placeholder: '3 ripe bananas\n1/3 cup melted butter\n1 cup sugar' },
    { key: 'recipeInstructions', label: 'Instructions (one step per line)', type: 'textarea', required: true, placeholder: 'Preheat oven to 350°F\nMash bananas in a bowl\nMix in melted butter' },
  ],
  template(v) {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Recipe',
      name: v.name,
      description: v.description,
      image: v.image,
      author: { '@type': 'Person', name: v.authorName },
      recipeIngredient: v.recipeIngredient ? v.recipeIngredient.split('\n').map(s => s.trim()).filter(Boolean) : [],
      recipeInstructions: v.recipeInstructions
        ? v.recipeInstructions.split('\n').map(s => s.trim()).filter(Boolean).map((text, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            text,
          }))
        : [],
    };
    if (v.prepTime) data.prepTime = v.prepTime;
    if (v.cookTime) data.cookTime = v.cookTime;
    if (v.totalTime) data.totalTime = v.totalTime;
    if (v.recipeYield) data.recipeYield = v.recipeYield;
    if (v.recipeCategory) data.recipeCategory = v.recipeCategory;
    if (v.recipeCuisine) data.recipeCuisine = v.recipeCuisine;
    if (v.calories) {
      data.nutrition = { '@type': 'NutritionInformation', calories: `${v.calories} calories` };
    }
    return data;
  },
};
