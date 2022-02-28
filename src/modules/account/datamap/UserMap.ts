import { User } from "@modules/account/models/User"

import { instanceToInstance } from 'class-transformer';

interface IUserDTO {
    id: number,
    name: string,
    email: string,
    avatar: string,
    avatar_url: string,
    drive_license: string
}


class UserMap {

    static getUser({
        id,
        name,
        email,
        avatar,
        avatar_url,
        drive_license
    }:User): IUserDTO{
        const user = instanceToInstance({
            id,
            email,
            name,
            avatar,
            avatar_url,
            drive_license,
          });

        return user
    }

}

export {UserMap, IUserDTO}