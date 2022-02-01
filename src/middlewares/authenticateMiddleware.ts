import auth from "@config/auth";
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
        const { sub } = verify(token, auth.secret_token) as ITokenSubject

        const user_id = parseInt(sub)

        // Retorna o id do usuario
        req.user = {
            user_id: user_id
        }

        next()
    } catch {
        throw new AppError("Token invalido", 401)
    }


}

export { authenticateMiddleware }

