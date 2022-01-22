import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { deleteFile } from "util/deleFile";


interface IRequest {
    user_id: number,
    avatar_file: string
}

@injectable()
class UpdateUsersAvatarUseCase {

    constructor(
        @inject("usersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ user_id, avatar_file }: IRequest): Promise<void> {

        const user = await this.usersRepository.findById(user_id);
        
        // Deleta o avatar antigo da pasta.
        if(user.avatar){
            await deleteFile(`./tmp/avatar/${user.avatar}`);
        }

        user.avatar = avatar_file;

        await this.usersRepository.create(user);

    }
}

export { UpdateUsersAvatarUseCase }