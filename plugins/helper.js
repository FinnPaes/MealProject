export default defineNuxtPlugin(nuxtApp => {
    // Get the ingredients, with specific arguments so it can be re-used on multiple components with the data as you want it
    nuxtApp.provide("getIngredients", (meal, withMeasure, asArray) => {
        let ingredients = [];
        // Loop over all the ingredients in the meal array untill it's empty
        for (let i = 1; i < 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];

            if (ingredient !== null && ingredient !== "") { // If the string is not empty or null (i noticed it could be both), then it's an actual ingriedent, so push that into the array!
                // If the function argument withMeasure is true, we also add the measure in front of the ingredient
                if (withMeasure) {
                    ingredients.push(`${measure} ${ingredient}`);
                } else {
                    ingredients.push(ingredient);
                }
            }
        }
        
        if (asArray) {
            return ingredients; // Return the array, so te front-end can loop over it
        } else {
            return ingredients.join(", "); // Make it into a string with a comma after each ingredient
        }
    });

    // If an image fails to load, it will replace it with the image placeholder
    nuxtApp.provide("setImagePlaceholder", (e) => {
        e.target.src = "/img/placeholder.png";
    });
})