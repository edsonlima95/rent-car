import { Request, Response } from "express";
import { container } from "tsyringe";
import { UserRefreshTokenUseCase } from "./UserRefreshTokenUseCase";



class UserRefreshTokenController {

    async handle(req: Request, res: Response): Promise<Response> {

        const { token } = req.body || req.headers.authorization || req.query

        const userRefreshTokenUseCase = container.resolve(UserRefreshTokenUseCase)

        const refesh = await userRefreshTokenUseCase.execute(token)

        return res.json({"refresh_token": refesh })

    }

}

export { UserRefreshTokenController }