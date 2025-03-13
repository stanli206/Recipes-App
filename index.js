import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./Database/config.js";
import recipesRouter from "./Router/recipes.router.js";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT;
connectDB();

app.use("/api", recipesRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
