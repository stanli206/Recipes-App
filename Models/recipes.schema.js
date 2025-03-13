import mongoose from "mongoose";

const recipesSchema = mongoose.Schema({
    name: String,
    ingredients: [String],
    instructions: String,
    prepTime: String,
});

const Recipes = mongoose.model('Recipes',recipesSchema);
export default Recipes;