import { AppError } from "@errors/AppError";
import { UsersRepository } from "@modules/account/repositories/implementatios/UsersRepository";
import { NextFunction, Request, Response } from "express";



async function adminVerify(req: Request, res: Response, next: NextFunction) {

    const { user_id } = req.user

    const usersRepository = new UsersRepository();

    const user  = await usersRepository.findById(user_id)

    if(!user.admin){
        throw new AppError("Usuário não tem permissão de executar essa função!")
    }
    
    next()
}


export { adminVerify }