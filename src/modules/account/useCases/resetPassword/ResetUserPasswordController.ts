import { container } from 'tsyringe';
import { Request, Response } from "express";
import { ResetUserPasswordUseCase } from './ResetUserPasswordUseCase';


class ResetUserPasswordController {


    async handle(req:Request, res:Response):Promise<Response>{

        const {token} = req.query
        const {password} = req.body

        const resetUserPasswordUseCase = container.resolve(ResetUserPasswordUseCase)

        await resetUserPasswordUseCase.execute(String(token), password)

        return res.json({"message":"Password alterado com sucesso!"})
    }

}

export {ResetUserPasswordController}