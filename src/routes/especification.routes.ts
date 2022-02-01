import { Router } from "express";
import { EspecificationController } from "@modules/cars/controllers/EspecificationController";
import { authenticateMiddleware } from "middlewares/authentication";
import { adminVerify } from "middlewares/adminVerify";

const especificationRoutes = Router();


const especificationController = new EspecificationController();


especificationRoutes.get("/especifications",authenticateMiddleware,adminVerify, especificationController.index)

especificationRoutes.post("/especification",authenticateMiddleware,adminVerify, especificationController.save);

especificationRoutes.put("/especification/:id", authenticateMiddleware,adminVerify, especificationController.save);


export { especificationRoutes }