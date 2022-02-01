import { inject, injectable } from "tsyringe"
import { hash } from "bcrypt"
import { IUsersRepository, IUsersRepositoryDTO } from "@modules/account/repositories/IUsersRepository"
import { AppError } from "@errors/AppError"

interface IRequest {
    name: string,
    email: string,
    password: string,
    drive_license: string,
    id?:number
}

@injectable()
class UsersUseCase {

    constructor(
        @inject("usersRepository")
        private usersRepository: IUsersRepository
    ){}

   async execute({
        name,
        email,
        password,
        drive_license,
        id
    }: IRequest):Promise<void> {

        const emailExists = await this.usersRepository.findByEmail(email)

        if(emailExists && id == null){
            throw new AppError("Email already exists")
        }

        if(id){   
            const userUpdate = await this.usersRepository.findById(id)
    
            if(!userUpdate){
                throw new AppError("Usuário não existe")
            }
        }

        const passwordHash = await hash(password,8);

        await this.usersRepository.save({
            name,
            email,
            password: passwordHash,
            drive_license,
            id
        })
    }

}

export { UsersUseCase }