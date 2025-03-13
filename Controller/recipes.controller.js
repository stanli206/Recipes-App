import Recipes from "../Models/recipes.schema.js";

//create new recipe
export const createRecipes = async (req, res) => {
  try {
    const newRecipes = new Recipes(req.body);
    await newRecipes.save();
    res
      .status(200)
      .json({ message: `Recipes Added successfully`, data: newRecipes });
  } catch (error) {
    res.status(500).json({ error: err.message });
    console.log(error);
  }
};

//get All data from db
export const getAllRecipes = async (req, res) => {
  try {
    const getRecipes = await Recipes.find();
    res.status(200).json({ data: getRecipes });
  } catch (error) {
    res.status(500).json({ error: err.message });
    console.log(error);
  }
};

//get data(recipes) by id
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(error);
  }
};

//update by id
//update by id
export const updateRecipe = async (req, res) => {
    try {
      const { name, ingredients, instructions, prepTime } = req.body;
  
      const recipe = await Recipes.findById(req.params.id);
      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }
  
      if (name) recipe.name = name;
      if (ingredients) recipe.ingredients = ingredients;
      if (instructions) recipe.instructions = instructions;
      if (prepTime) recipe.prepTime = prepTime;
  
      const updatedRecipe = await recipe.save();
      res.json(updatedRecipe); // Send the updated recipe as the response
    } catch (err) {
      console.error("Update Recipe Error:", err); // Log the error
      res.status(500).json({ error: err.message }); // Send error response
    }
  };

//delete by id
export const deleteRecipes = async (req, res) => {
  try {
    // Find the recipe first
    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // Remove the recipe
    await recipe.deleteOne(); // Alternative to `findByIdAndDelete`

    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.error("Delete Recipe Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }


};
