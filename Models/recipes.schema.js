import mongoose from "mongoose";

const recipesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  prepTime: { type: String, required: true },
});

const Recipes = mongoose.model("Recipes", recipesSchema);
export default Recipes;
