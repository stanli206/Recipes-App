import express from "express";
import {
  createRecipes,
  deleteRecipes,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
} from "../Controller/recipes.controller.js";

const router = express.Router();

router.post("/create-recipes", createRecipes);
router.get("/get-recipes", getAllRecipes);
router.get("/get-recipe/:id", getRecipeById);
router.put("/update-recipe/:id", updateRecipe);
router.delete("/delete-recipe/:id", deleteRecipes);

export default router;
