import { Router } from "express";
import { CreateEspecificationController } from "@modules/cars/useCases/createEspecification/CreateEspecificationController";
import { ListEspecificationController } from "@modules/cars/useCases/listEspecification/ListEspecificationController";

const especificationRoutes = Router();


const createEspecificationController = new CreateEspecificationController();
const listEspecificationController = new ListEspecificationController();


especificationRoutes.get("/especifications", listEspecificationController.handle)

// especificationRoutes.use(authenticateMiddleware)

especificationRoutes.post("/especification", createEspecificationController.handle);


export { especificationRoutes }