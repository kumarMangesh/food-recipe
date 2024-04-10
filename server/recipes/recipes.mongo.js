const mongoose = require("mongoose");

const recipesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
  },
  cuisine: {
    type: String,
  },
  difficulty: {
    type: String,
  },
  tags: {
    type: [String],
  },
  image: {
    type: String,
  },
  rating: {
    type: Number,
  },
  mealType: {
    type: [String],
  },
  ingredients: {
    type: [String],
  },
  instructions: {
    type: [String],
  },
});

//connects planets schema with "planets" collection
module.exports = mongoose.model("Recipes", recipesSchema);
