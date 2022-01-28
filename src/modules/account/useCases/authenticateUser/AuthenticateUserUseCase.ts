import "reflect-metadata"
import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { UsersTokenRepository } from "@modules/account/repositories/implementatios/UsersTokenRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/provider/dateProvider/IDateProvider";

interface IRequest {
    email: string,
    password: string
}

interface IResponse {
    user: {
        name: string,
        email: string
    },
    token: string,
    refresh_token: string
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("usersRepository")
        private userRepository: IUsersRepository,
        @inject("usersTokenRepository")
        private usersTokenRepository: UsersTokenRepository,
        @inject("dateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {

        const user = await this.userRepository.findByEmail(email)

        const { secret_token,
            expires_token,
            secret_refresh_token,
            expires_refresh_token,
            expires_refresh__date_token,
        } = auth

        if (!user) {
            throw new AppError("E-mail ou password incorreto!", 401)
        }

        // Compara se o password é igual do banco
        const passwordCheck = await compare(password, user.password)

        if (!passwordCheck) {
            throw new AppError("E-mail ou password incorreto!", 401)
        }

        //Cria um token
        const token = sign({}, secret_token, {
            subject: String(user.id),
            expiresIn: expires_token,
        });

        // Cria o refresh token que é salvo no banco
        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: String(user.id),
            expiresIn: expires_refresh_token,
        });

        const expires_date = this.dateProvider.addDays(expires_refresh__date_token)

        await this.usersTokenRepository.create({
            user_id: user.id,
            refresh_token,
            expires_date
        })

        const response: IResponse = {
            user: {
                name: user.name,
                email: user.email
            },
            token,
            refresh_token
        }

        return response;

    }

}


export { AuthenticateUserUseCase }