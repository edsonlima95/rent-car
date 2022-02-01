import { Request, Response } from "express";
import { container } from "tsyringe";
import { ForgotPasswordUseCase } from "../services/forgotPassword/ForgotPasswordUseCase";
import { ResetUserPasswordUseCase } from "../services/resetPassword/ResetUserPasswordUseCase";
import { ProfileUseCase } from "../services/user/ProfileUseCase";
import { UpdateUsersAvatarUseCase } from "../services/user/UpdateUsersAvatarUseCase";
import { UsersUseCase } from "../services/user/UsersUseCase";


class UsersContoller {


    async save(req: Request, res: Response): Promise<Response> {

        const { name, email, password, drive_license } = req.body;

        const { id } = req.params

        const user_id = id ? parseInt(id) : null
   
        const createUsersUseCase = container.resolve(UsersUseCase)

        await createUsersUseCase.execute({
            name,
            email,
            password,
            drive_license,
            id: user_id
        })

        return res.json()
    }


    async updateAvatar(req: Request, res: Response): Promise<Response> {

        //Obtem o id do usuario logado.
        const { user_id } = req.user

        const avatar_file = req.file.filename;

        const updateUsersUseCase = container.resolve(UpdateUsersAvatarUseCase)

        await updateUsersUseCase.execute({ user_id, avatar_file })

        return res.json("Avatar alterado!")
    }

    async userProfile(req: Request, res: Response):Promise<Response>{

        const {user_id} = req.user

        const profileUseCase = container.resolve(ProfileUseCase)

        const user = await profileUseCase.execute(user_id)

        return res.json(user)

    }


    async forgotPassword(req: Request, res:Response):Promise<Response>{

        const {email}  = req.body

        const usersPasswordForgotUseCase = container.resolve(ForgotPasswordUseCase)

        await usersPasswordForgotUseCase.execute(email)
       
        return res.send()

    }

    async resetPassword(req:Request, res:Response):Promise<Response>{

        const {token} = req.query
        const {password} = req.body

        const resetUserPasswordUseCase = container.resolve(ResetUserPasswordUseCase)

        await resetUserPasswordUseCase.execute(String(token), password)

        return res.json({"message":"Password alterado com sucesso!"})
    }

}


export { UsersContoller }