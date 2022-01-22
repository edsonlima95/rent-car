
import { IUsersRepository, IUsersRepositoryDTO } from "../IUsersRepository";
import { User } from "@modules/account/entities/User";


class UsersRespositoryTest implements IUsersRepository {

    private users: User[] = []; 

    async create({ name, email, password, drive_license }: IUsersRepositoryDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            name,
            email,
            password,
            drive_license,
        })

        this.users.push(user)
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find((user) => user.email === email)
    }

    async findById(id: number): Promise<User> {
        return this.users.find((user) => user.id === id)
    }
}

export { UsersRespositoryTest }