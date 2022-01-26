import auth from "@config/auth";
import { AppError } from "@errors/AppError";
import { IUserTokensRepository } from "@modules/account/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/provider/IDateProvider";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IPayload {
    sub: string
    email: string
}

@injectable()
class UserRefreshTokenUseCase {

    constructor(
        @inject("usersTokenRepository")
        private usersTokenRepository: IUserTokensRepository,
        @inject("dateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute(token: string): Promise<string> {

        // Decodifica as informações do token.
        const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload

        const user_id = parseInt(sub);

        const userToken = await this.usersTokenRepository.findTokenByUserIdAndToken(user_id, token)

        if (!userToken) {
            throw new AppError("Refresh token não existe")
        }

        //Deleta o token antigo.
        await this.usersTokenRepository.deleteById(userToken.id);

        // Cria o novo token
        // Cria o refresh token que é salvo no banco
        const refresh_token = sign({ email }, auth.secret_refresh_token, {
            subject: String(user_id),
            expiresIn: auth.expires_refresh_token,
        });

        const expires_date = this.dateProvider.addDays(auth.expires_refresh__date_token)

        await this.usersTokenRepository.create({
            user_id: user_id,
            refresh_token,
            expires_date
        })

        return refresh_token

    }

}


export { UserRefreshTokenUseCase }