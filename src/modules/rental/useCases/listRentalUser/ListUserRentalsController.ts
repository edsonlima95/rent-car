import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUserRentalsUseCase } from "./ListUserRentalsUseCase";



class ListUserRentalsController {

    async handle(req: Request, res: Response): Promise<Response> {

        const { user_id } = req.user

        const listUserRentalsUseCase = container.resolve(ListUserRentalsUseCase)

        const rentals = await listUserRentalsUseCase.execute(user_id)

        return res.json(rentals)


    }

}

export { ListUserRentalsController }