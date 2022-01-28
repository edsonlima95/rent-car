import { Router } from "express";
import { EspecificationController } from "@modules/cars/controllers/EspecificationController";
import { authenticateMiddleware } from "middlewares/authentication";

const especificationRoutes = Router();


const especificationController = new EspecificationController();


especificationRoutes.get("/especifications",authenticateMiddleware, especificationController.index)

especificationRoutes.post("/especification",authenticateMiddleware ,especificationController.save);

especificationRoutes.put("/especification/:id", authenticateMiddleware, especificationController.save);


export { especificationRoutes }