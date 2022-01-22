import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/account/repositories/implementatios/UsersRepository";

interface ITokenSubject {
    sub: string
}

async function authenticateMiddleware(req: Request, res: Response, next: NextFunction) {

    const headers = req.headers.authorization;

    if (!headers) {
        throw new AppError("Token não existe",401)
    }

    const [, token] = headers.split(" ")

    try {
        // Verifica o token se é valido
        const {sub: user_id} = verify(token, "d320dac15357b81d723f389ef1ea8419") as ITokenSubject

        const repository = new UsersRepository();

        const user = await repository.findById(parseInt(user_id))
        
        if(!user){
            throw new AppError("Usuario não existe")
        }

        // Retorna o id do usuario
       req.user = {
            user_id: user.id
        }

        next()
    } catch {
        throw new AppError("Token invalido",401)
    }


}

export { authenticateMiddleware }

