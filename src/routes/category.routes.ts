
import { Router } from "express";
import multer from "multer";


import { CategoryController } from "@modules/cars/controllers/CategoryController";
import { adminVerify } from "@middlewares/adminVerify";
import { authenticateMiddleware } from "@middlewares/authenticateMiddleware";

const upload = multer({
    dest: "./tmp"
})

const categoriesRoutes = Router();

const categoryController = new CategoryController();

categoriesRoutes.post("/category", authenticateMiddleware, adminVerify, categoryController.save);

categoriesRoutes.put("/category/:id", authenticateMiddleware, adminVerify, categoryController.save);

categoriesRoutes.get("/categories", authenticateMiddleware, adminVerify, categoryController.index);

categoriesRoutes.post("/category/import", authenticateMiddleware, adminVerify, upload.single("file"), categoryController.importFromCsv)

export { categoriesRoutes }