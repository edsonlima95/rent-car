import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "../services/refreshToken/RefreshTokenUseCase";



class RefreshTokenController {

    async generateNewToken(req: Request, res: Response): Promise<Response> {

        const { token } = req.body || req.headers.authorization || req.query

        const userRefreshTokenUseCase = container.resolve(RefreshTokenUseCase)

        const refesh = await userRefreshTokenUseCase.execute(token)

        return res.json({"refresh_token": refesh })

    }

}

export { RefreshTokenController }