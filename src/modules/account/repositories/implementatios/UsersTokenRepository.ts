import { UserToken } from "@modules/account/entities/UserToken"
import { getRepository, Repository } from "typeorm"
import { IUserTokenDTO, IUserTokensRepository } from "../IUserTokensRepository"

class UsersTokenRepository implements IUserTokensRepository {


    private repository: Repository<UserToken>

    constructor() {
        this.repository = getRepository(UserToken)
    }

    async create({ user_id, refresh_token, expires_date }: IUserTokenDTO): Promise<UserToken> {
        const userToken = this.repository.create({ user_id, refresh_token, expires_date })

        return await this.repository.save(userToken)
    }

    async findTokenByUserIdAndToken(user_id: number, refresh_token: string): Promise<UserToken> {
        return await this.repository.findOne({ user_id, refresh_token })
    }

    async deleteById(id: number): Promise<void> {
        await this.repository.delete(id)
    }

    async findByToken(token: string):Promise<UserToken>{
        return await this.repository.findOne({refresh_token:token })
    }
}

export { UsersTokenRepository }