import { validationResult } from "express-validator";
import Recipes from "../Models/recipes.schema.js";

// Create new recipe
export const createRecipes = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newRecipe = new Recipes(req.body);
    await newRecipe.save();
    res
      .status(201)
      .json({ message: "Recipe added successfully", data: newRecipe });
  } catch (error) {
    console.error("Create Recipe Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all recipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find();
    res.status(200).json({ data: recipes });
  } catch (error) {
    console.error("Fetch Recipes Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get recipe by ID
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (error) {
    console.error("Get Recipe By ID Error:", error);
    res.status(500).json({ error: "Invalid ID format" });
  }
};

// Update recipe by ID
export const updateRecipe = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, ingredients, instructions, prepTime } = req.body;
    const recipe = await Recipes.findById(req.params.id);

    if (!recipe) return res.status(404).json({ error: "Recipe not found" });

    if (name) recipe.name = name;
    if (ingredients) recipe.ingredients = ingredients;
    if (instructions) recipe.instructions = instructions;
    if (prepTime) recipe.prepTime = prepTime;

    const updatedRecipe = await recipe.save();
    res
      .status(200)
      .json({ message: "Recipe updated successfully", data: updatedRecipe });
  } catch (error) {
    console.error("Update Recipe Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete recipe by ID
export const deleteRecipes = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });

    await recipe.deleteOne();
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Delete Recipe Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
