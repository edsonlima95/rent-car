import { AppError } from '@errors/AppError';
import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';
import { IUserTokensRepository } from '@modules/account/repositories/IUserTokensRepository';
import { IDateProvider } from '@shared/container/provider/dateProvider/IDateProvider';
import { hash } from 'bcrypt';
import { inject, injectable } from "tsyringe";


@injectable()
class ResetUserPasswordUseCase {

    constructor(
        @inject("usersTokenRepository")
        private usersTokenRepository: IUserTokensRepository,
        @inject("usersRepository")  
        private usersRepository: IUsersRepository,
        @inject("dateProvider")
        private dateProvider: IDateProvider
    ){}

    async execute(token: string, password: string):Promise<void>{

        const userToken = await this.usersTokenRepository.findByToken(token)

        if(!userToken){
            throw new AppError("Token invalido")
        }

        const user = await this.usersRepository.findById(userToken.user_id)

        if(!user){
            throw new AppError("Usuário não existe ou não pertence a esse token")
        }

        const dateNow = this.dateProvider.dateNow()

        const checkToken  =  this.dateProvider.compareBefore(dateNow,userToken.expires_date)

        if(!checkToken){
            await this.usersTokenRepository.deleteById(userToken.id)    
            throw new AppError("O token expirou!")
        }

        user.password = await hash(password,8)

        await this.usersRepository.create(user)    

    }

}


export {ResetUserPasswordUseCase}