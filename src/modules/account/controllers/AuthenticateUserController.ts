import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "../services/authentication/AuthenticateUserUseCase";

class AuthenticateUserController {

    
   async userAuthentication(req:Request, res:Response):Promise<Response>{
        
        const {email, password} = req.body;

        const userAuthenticateUseCase = container.resolve(AuthenticateUserUseCase)

        const token = await userAuthenticateUseCase.execute({email, password})

        return res.json(token);
        
    }

}


export {AuthenticateUserController}