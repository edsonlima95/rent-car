import { inject, injectable } from 'tsyringe';
import { UserMap, IUserDTO } from '@modules/account/datamap/UserMap';
import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';

@injectable()
class ProfileUseCase {

    constructor(
        @inject("usersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute(id: number): Promise<IUserDTO>{

        const user = await this.usersRepository.findById(id)

        return UserMap.getUser(user)
    }

}

export {ProfileUseCase}