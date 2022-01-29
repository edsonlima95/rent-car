import { UserToken } from "../models/UserToken";

interface IUserTokenDTO {

    user_id: number,
    refresh_token: string,
    expires_date: Date

}


interface IUserTokensRepository {

    save(data: IUserTokenDTO): Promise<UserToken>
    deleteById(id: number):Promise<void>
    findTokenByUserIdAndToken(user_id: number, refresh_token: string): Promise<UserToken>
    findByToken(token: string):Promise<UserToken>
}

export { IUserTokensRepository, IUserTokenDTO }