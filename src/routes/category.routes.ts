
import { Router } from "express";
import multer from "multer";

import { CategoryController } from "@modules/cars/controllers/CategoryController";
import { adminVerify } from "@middlewares/adminVerify";
import { authenticateMiddleware } from "@middlewares/authenticateMiddleware";
import {validate} from "@errors/Validation";

const upload = multer({
    dest: "./tmp"
})

const categoriesRoutes = Router();

const categoryController = new CategoryController();

categoriesRoutes.post("/category", authenticateMiddleware, adminVerify, validate('categories') , categoryController.save);

categoriesRoutes.put("/category/:id", authenticateMiddleware, adminVerify,validate('categories'), categoryController.save);

categoriesRoutes.get("/categories", authenticateMiddleware, adminVerify, categoryController.index);

categoriesRoutes.post("/category/import", authenticateMiddleware, adminVerify, upload.single("file"), categoryController.importFromCsv)

export { categoriesRoutes }