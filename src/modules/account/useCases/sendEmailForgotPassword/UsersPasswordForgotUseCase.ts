import { resolve } from 'path';
import { AppError } from '@errors/AppError';
import { inject, injectable } from "tsyringe"
import { IDateProvider } from '@shared/container/provider/dateProvider/IDateProvider';
import { IUserTokensRepository } from '@modules/account/repositories/IUserTokensRepository';
import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';
import { v4 as uuidV4 } from 'uuid';
import { IEmailProvider } from '@shared/container/provider/emailProvider/IEmailProvider';

@injectable()
class UsersPasswordForgotUseCase {

    constructor(
        @inject("usersRepository")
        private usersRepository: IUsersRepository,
        @inject("usersTokenRepository")
        private usersTokenRepository: IUserTokensRepository,
        @inject("dateProvider")
        private dateProvoder: IDateProvider,
        @inject("emailProvider")
        private emailProvider: IEmailProvider
        ){}

    async execute(email: string):Promise<void>{

        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            throw new AppError("Usuário não existe!")
        }

        //Obtem o caminho do template
        const templatePath = resolve(__dirname,"..","..","views","email","email.hbs")

        const refresh_token = uuidV4()

        const expires_date = this.dateProvoder.addHours(3)

        await this.usersTokenRepository.create({ user_id: user.id, refresh_token, expires_date })

        const variables = {
            name: user.email,
            link: `${process.env.EMAIL_URL_PATH}${refresh_token}`
        }

        await this.emailProvider.sendEmail(email,"Recuperação de senha",variables,templatePath)
    }


}

export {UsersPasswordForgotUseCase}