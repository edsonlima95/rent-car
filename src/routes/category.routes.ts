import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ListCategoryController } from '@modules/cars/useCases/listCategory/ListCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { authenticateMiddleware } from "../middlewares/authentication";

const upload = multer({
    dest: "./tmp"
})

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post("/category", createCategoryController.handle);

categoriesRoutes.get("/categories", authenticateMiddleware ,listCategoryController.handle);

categoriesRoutes.post("/category/import", upload.single("file"), importCategoryController.handle)



export { categoriesRoutes }