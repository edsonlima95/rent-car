import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./category.routes";
import { especificationRoutes } from "./especification.routes";
import { passwordRoutes } from "./password.routes";
import { rentalRoutes } from "./reantal.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use(authenticateRoutes)
router.use(categoriesRoutes)
router.use(especificationRoutes)
router.use(usersRoutes)
router.use(carsRoutes)
router.use(rentalRoutes)
router.use(passwordRoutes)


export {router}

