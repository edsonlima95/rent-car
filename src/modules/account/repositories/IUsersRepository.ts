import { User } from "../entities/User";

interface IUsersRepositoryDTO {
    id?: number,
    name: string,
    email: string,
    password: string,
    drive_license: string,
    avatar?: string,
}

interface IUsersRepository {

    create(data: IUsersRepositoryDTO): Promise<void>
    findByEmail(email: string):Promise<User>
    findById(id: number):Promise<User>
}

export { IUsersRepository, IUsersRepositoryDTO }