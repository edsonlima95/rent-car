import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUsersAvatarUseCase } from "./UpdateUsersAvatarUseCase";

class UpdateUsersAvatarController {

    async handle(req: Request, res: Response): Promise<Response> {

        const { user_id } = req.user

        const avatar_file = req.file.filename;

        const updateUsersUseCase = container.resolve(UpdateUsersAvatarUseCase)

        await updateUsersUseCase.execute({ user_id, avatar_file })

        return res.json()
    }
}


export { UpdateUsersAvatarController }