import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IStorageProvider } from "@shared/container/provider/storageProvider/IStorageProvider";

interface IRequest {
    user_id: number,
    avatar_file: string
}

@injectable()
class UpdateUsersAvatarUseCase {

    constructor(
        @inject("usersRepository")
        private usersRepository: IUsersRepository,
        @inject("storageProvider")
        private storageProvider: IStorageProvider
    ) { }

    async execute({ user_id, avatar_file }: IRequest): Promise<void> {

        const user = await this.usersRepository.findById(user_id);

        // Deleta o avatar antigo da pasta.
        if(user.avatar){
            await this.storageProvider.delete(user.avatar,"avatar")
        }

        await this.storageProvider.save(avatar_file,"avatar")

        user.avatar = avatar_file;

        await this.usersRepository.save(user);

    }
}

export { UpdateUsersAvatarUseCase }