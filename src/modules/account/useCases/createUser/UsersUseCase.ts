import { inject, injectable } from "tsyringe"
import { hash } from "bcrypt"
import { IUsersRepository, IUsersRepositoryDTO } from "@modules/account/repositories/IUsersRepository"
import { AppError } from "@errors/AppError"


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
    }: IUsersRepositoryDTO):Promise<void> {

        const emailExists = await this.usersRepository.findByEmail(email)

        if(emailExists){
            throw new AppError("Email already exists")
        }

        const passwordHash = await hash(password,8);

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            drive_license,
        })
    }

}

export { UsersUseCase }