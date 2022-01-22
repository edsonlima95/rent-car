import { getRepository, Repository } from "typeorm";
import { User } from "@modules/account/entities/User";
import { IUsersRepository, IUsersRepositoryDTO } from "../IUsersRepository";


class UsersRepository implements IUsersRepository {

    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User)
    }

    async create({
        name,
        email,
        password,
        drive_license,
        id,
        avatar
    }: IUsersRepositoryDTO): Promise < void> {

    const user = this.repository.create({name, email, password, drive_license,id,avatar})

        await this.repository.save(user)

}

    async findByEmail(email: string): Promise < User > {

    const user = await this.repository.findOne({ email })
        return user;

}
    
    async findById(id: number): Promise < User > {

    const user = await this.repository.findOne(id)
        return user;

}

}

export { UsersRepository }