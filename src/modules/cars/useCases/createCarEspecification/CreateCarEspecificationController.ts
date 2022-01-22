import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarEspecificationUseCase } from "./CreateCarEspecificationUseCase";


class CreateCarEspecificationController {

    async handle(req: Request, res: Response): Promise<Response> {

        const { id } = req.params
        
        const {especifications_id} = req.body
        
        const carsEspecificationUseCase = container.resolve(CreateCarEspecificationUseCase)

        const result  = await carsEspecificationUseCase.execute({car_id: id as unknown as number, especifications_id})

        return res.json(result)

    }

}

export { CreateCarEspecificationController }