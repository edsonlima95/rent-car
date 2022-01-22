import "reflect-metadata"
import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IRequest {
    email: string,
    password: string
}

interface IResponse {
    user: {
        name: string,
        email: string
    },
    token: string
}

@injectable()
class AuthenticateUserUseCase {


    constructor(
        @inject("usersRepository")
        private userRepository: IUsersRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {

        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new AppError("E-mail ou password incorreto!", 401)
        }

        // Compara se o password é igual do banco
        const passwordCheck = await compare(password, user.password)

        if (!passwordCheck) {
            throw new AppError("E-mail ou password incorreto!", 401)
        }

        //Cria um token
        const token = sign({}, "d320dac15357b81d723f389ef1ea8419", {
            subject: String(user.id),
            expiresIn: "1d",
        });

        const response: IResponse = {
            user: {
                name: user.name,
                email: user.email
            },
            token
        }

        return response;

    }

}


export { AuthenticateUserUseCase }