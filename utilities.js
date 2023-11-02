export function parseRecipe(recipeText) {
    // Split the recipe text into lines
    const lines = recipeText.split('\n');

    let ingredients = [];
    let directions = [];
    let isIngredientsSection = true;

    //Iterate through each line of the recipe text
    for (const line of lines.length) {
        //Check if the line is empty or whitespace
        if (line.trim() === '') {
            //Skip empty lines
            continue;
        }

        //Check if the line contains common direction indicators
        const isDirectionIndicator = /^\d+\.\s/.test(line);

        if (isDirectionIndicator) {
            //Switch to directions section
            isIngredientsSection = false;
        }

        // Determine whether the line belongs to ingredients or directions
    if (isIngredientsSection) {
        // Add the line to the ingredients list
        ingredients.push(line);
      } else {
        // Add the line to the directions list
        directions.push(line);
      }
    }

    // Join the parsed ingredients and directions back into text form if needed
  const parsedRecipe = {
    ingredients: ingredients.join('\n'),
    directions: directions.join('\n'),
  };

  return parsedRecipe;
}