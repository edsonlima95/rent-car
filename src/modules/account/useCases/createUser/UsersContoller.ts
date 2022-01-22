import { Request, Response } from "express";
import { container } from "tsyringe";
import { UsersUseCase } from "./UsersUseCase";


class UsersContoller {


    async handle(req:Request, res: Response): Promise<Response>{

        const {name,email,password, drive_license,} = req.body;

        const createUsersUseCase = container.resolve(UsersUseCase)

        await createUsersUseCase.execute({
            name,
            email,
            password,
            drive_license,
        })

        return res.send()
    }

}


export {UsersContoller}