import auth from "@config/auth";
import { UsersTokenRepository } from "@modules/account/repositories/implementatios/UsersTokenRepository";
import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";

interface ITokenSubject {
    sub: string
}

async function authenticateMiddleware(req: Request, res: Response, next: NextFunction) {

    const headers = req.headers.authorization;

    if (!headers) {
        throw new AppError("Token não existe", 401)
    }

    const [, token] = headers.split(" ")

    try {
        // Verifica o token se é valido
        const { sub } = verify(token, auth.secret_refresh_token) as ITokenSubject

        const usersTokenRepository = new UsersTokenRepository();

        const user_id = parseInt(sub)

        const user = await usersTokenRepository.findTokenByUserIdAndToken(user_id, token)
        
        if (!user) {
            throw new AppError("Usuario não existe")
        }

        // Retorna o id do usuario
        req.user = {
            user_id: user.id
        }

        next()
    } catch {
        throw new AppError("Token invalido", 401)
    }


}

export { authenticateMiddleware }

