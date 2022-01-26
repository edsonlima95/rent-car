import { UserToken } from "../entities/UserToken";

interface IUserTokenDTO {

    user_id: number,
    refresh_token: string,
    expires_date: Date

}


interface IUserTokensRepository {

    create(data: IUserTokenDTO): Promise<UserToken>

}

export { IUserTokensRepository, IUserTokenDTO }