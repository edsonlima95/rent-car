import { User } from '@modules/account/models/User';
import { getRepository, Repository } from "typeorm";
import { IUsersRepository, IUsersRepositoryDTO } from "../IUsersRepository";


class UsersRepository implements IUsersRepository {

    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User)
    }
    
    async save({
        name,
        email,
        password,
        drive_license,
        avatar,
        id
    }: IUsersRepositoryDTO): Promise<void> {

        const user = this.repository.create({ name, email, password, drive_license, id, avatar })

        await this.repository.save(user)

    }

    async findByEmail(email: string): Promise<User> {

        const user = await this.repository.findOne({ email })
        return user;

    }

    async findById(id: number): Promise<User> {

        const user = await this.repository.findOne(id)
        return user;

    }

    async setAdmin(user_id: number, admin: boolean): Promise<void> {
            await  this.repository
                        .createQueryBuilder()
                        .update()
                        .set({admin})
                        .where("id = :id",{id: user_id})
                        .execute()
    }

}

export { UsersRepository }