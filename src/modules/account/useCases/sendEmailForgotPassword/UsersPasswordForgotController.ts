import { container } from 'tsyringe';
import { Request, Response } from "express";
import { UsersPasswordForgotUseCase } from './UsersPasswordForgotUseCase';


class UsersPasswordForgotController {


    async handle(req: Request, res:Response):Promise<Response>{

        const {email}  = req.body

        const usersPasswordForgotUseCase = container.resolve(UsersPasswordForgotUseCase)

        await usersPasswordForgotUseCase.execute(email)
       
        return res.send()

    }

}

export {UsersPasswordForgotController}