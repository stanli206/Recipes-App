import express from "express";
import { body } from "express-validator";
import {
  createRecipes,
  deleteRecipes,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
} from "../Controller/recipes.controller.js";

const router = express.Router();

// Validation
const validateRecipe = [
  body("name").notEmpty().withMessage("Recipe name is required"),
  body("ingredients")
    .isArray({ min: 1 })
    .withMessage("Ingredients should be an array with at least one item"),
  body("instructions").notEmpty().withMessage("Instructions are required"),
  body("prepTime")
    .notEmpty()
    .withMessage("Preparation time is required")
    .isString()
    .withMessage("Preparation time must be a string"),
];

router.post("/create-recipes", validateRecipe, createRecipes);
router.get("/get-recipes", getAllRecipes);
router.get("/get-recipe/:id", getRecipeById);
router.put("/update-recipe/:id", validateRecipe, updateRecipe);
router.delete("/delete-recipe/:id", deleteRecipes);

export default router;
