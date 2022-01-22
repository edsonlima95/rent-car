
import { Car } from "@modules/cars/entities/Car";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";


class ListAvailableCarsController {


    async handle(req: Request, res: Response): Promise<Response> {

        const { name, category_id, brand } = req.query

        const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase)

        const cat_id = category_id as unknown as number

        const cars =  await listAvailableCarsUseCase.execute(name as string, cat_id, brand as string)

        return res.json(cars)

    }

}

export { ListAvailableCarsController }