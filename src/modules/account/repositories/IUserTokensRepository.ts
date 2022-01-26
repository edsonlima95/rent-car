import { UserToken } from "../entities/UserToken";

interface IUserTokenDTO {

    user_id: number,
    refresh_token: string,
    expires_date: Date

}


interface IUserTokensRepository {

    create(data: IUserTokenDTO): Promise<UserToken>
    findTokenByUserIdAndToken(user_id: number, refresh_token: string): Promise<UserToken>
    deleteById(id: number):Promise<void>
}

export { IUserTokensRepository, IUserTokenDTO }