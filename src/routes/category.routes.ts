import { adminVerify } from 'middlewares/adminVerify';
import { Router } from "express";
import multer from "multer";

import { authenticateMiddleware } from "../middlewares/authentication";
import { CategoryController } from "@modules/cars/controllers/CategoryController";

const upload = multer({
    dest: "./tmp"
})

const categoriesRoutes = Router();

const categoryController = new CategoryController();

categoriesRoutes.post("/category", authenticateMiddleware ,categoryController.save);

categoriesRoutes.put("/category/:id", authenticateMiddleware ,categoryController.save);

categoriesRoutes.get("/categories", authenticateMiddleware ,categoryController.index);

categoriesRoutes.post("/category/import", authenticateMiddleware ,upload.single("file"), categoryController.importFromCsv)

export { categoriesRoutes }