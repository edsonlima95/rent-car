import { User } from "../models/User";

interface IUsersRepositoryDTO {
    id?: number,
    name: string,
    email: string,
    password: string,
    drive_license: string,
    avatar?: string,
}

interface IUsersRepository {

    save(data: IUsersRepositoryDTO): Promise<void>
    findByEmail(email: string):Promise<User>
    findById(id: number):Promise<User>
    setAdmin(user_id: number, admin: boolean):Promise<void>
}

export { IUsersRepository, IUsersRepositoryDTO }