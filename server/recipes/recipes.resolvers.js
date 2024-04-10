const {
  getAllRecipes,
  getRecipeByID,
  addNewRecipe,
} = require("./recipes.model");

module.exports = {
  Query: {
    recipes: (_, args, context) => {
      return getAllRecipes(args);
    },

    recipeByID: (_, args) => {
      return getRecipeByID(args.id);
    },
  },
  Mutation: {
    addRecipe: (_, args) => {
      return addNewRecipe(args);
    },
  },
};
