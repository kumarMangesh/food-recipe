import { gql } from "@apollo/client";

const GET_RECIPES = gql`
  query Recipes($limit: Int, $page: Int) {
    recipes(limit: $limit, page: $page) {
      recipes {
        id
        name
        cuisine
        difficulty
        image
        rating
        mealType
        ingredients
      }
      totalCount
      totalPages
    }
  }
`;

const GET_RECIPE = gql`
  query recipeByID($id: ID!)  {
    recipeByID(id: $id) {
      name
      cuisine
      difficulty
      image
      rating
      mealType
      ingredients
      prepTimeMinutes
      cookTimeMinutes
      servings
      caloriesPerServing
      tags
      mealType
      instructions
    }
  }
`;

export { GET_RECIPES, GET_RECIPE };
