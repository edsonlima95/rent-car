import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateEspecificationUseCase } from "./CreateEspecificationUseCase";


class CreateEspecificationController {

   async handle(req: Request, res: Response): Promise<Response>{
        const {name, description} = req.body
        
        const createEspecificationUseCase =  container.resolve(CreateEspecificationUseCase);
        
       const especification =  await createEspecificationUseCase.execute({name, description});
    
        return res.send(especification);
    }

}

export {CreateEspecificationController}