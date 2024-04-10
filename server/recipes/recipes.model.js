const axios = require("axios");
const recipesDatabase = require("./recipes.mongo");

const DISHES_URL = "https://dummyjson.com/recipes?limit=50";

async function fetchRecipes() {
  const recipe = await recipesDatabase.find(
    {},
    {
      __v: 0,
      __id: 0,
    }
  );
  if (recipe.length) {
    console.log("Recipes already exist");
    return;
  }
  console.log("Fetching Dishes", recipe);
  const response = await axios.get(DISHES_URL);

  if (response.status !== 200) {
    return;
  }
  response.data.recipes.forEach((recipe) => {
    const payload = {
      mealType: recipe.mealType,
      name: recipe.name,
      id: recipe.id,
      cuisine: recipe.cuisine,
      difficulty: recipe.difficulty,
      tags: recipe.tags,
      image: recipe.image,
      rating: recipe.rating,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
    };
    saveRecipe(payload);
  });
}

async function saveRecipe(recipe) {
  try {
    await recipesDatabase.findOneAndUpdate(
      {
        name: recipe.name,
      },
      recipe,
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
}

async function getAllRecipes(filter) {
  const page = parseInt(filter?.page) || 1;
  const limit = parseInt(filter?.limit) || 10;
  try {
    const totalCount = await recipesDatabase.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
    const recipes = await recipesDatabase
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    return { recipes, totalCount, totalPages };
  } catch (err) {
    console.error("Error in recipes query:", err);
    throw new Error(err.message || "Error getting recipes");
  }
}

async function getAllCuisine() {
  const cuisine = await recipesDatabase.find({});
}

async function getRecipeByID(recipeId) {
  try {
    const recipe = await recipesDatabase.findOne({ id: Number(recipeId) });
    return recipe;
  } catch (err) {
    console.error("Error in recipe query:", err);
    throw new Error(err.message || "Error getting recipe");
  }
}

async function addNewRecipe(data) {
  try {
    const newRecipe = new recipesDatabase({
      ...data,
    });
    await newRecipe.save();
    return newRecipe;
  } catch (err) {
    console.error("Error creating recipe:", err);
    throw new Error("Error creating recipe");
  }
}

module.exports = {
  getAllRecipes,
  getRecipeByID,
  addNewRecipe,
  fetchRecipes,
};
