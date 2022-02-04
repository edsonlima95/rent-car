import { AppError } from '@errors/AppError';
import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';
import { inject, injectable } from "tsyringe";


@injectable()
class SetAdminUseCase {

    constructor(
        @inject("usersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute(user_id: number, admin: boolean):Promise<void>{

        const user  = await this.usersRepository.findById(user_id)

        if(!user){
            throw new AppError("O usuario não existe")
        }

        await this.usersRepository.setAdmin(user_id, admin)

    }

}

export {SetAdminUseCase}