import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateEspecificationUseCase } from "../services/especification/CreateEspecificationUseCase";
import { ListEspecificationUseCase } from "../services/especification/ListEspecificationUseCase";


interface IPayload {
    name: string,
    description: string
}

class EspecificationController {

    async index(req:Request, res: Response):Promise<Response>{
        
        const listEspecificationUseCase = container.resolve(ListEspecificationUseCase);
        
        const especifications = await listEspecificationUseCase.execute();
        
        return res.json(especifications)
    }

   async save(req: Request, res: Response): Promise<Response>{
        const {name, description} = req.body as IPayload
        const {id} = req.params

        const especification_id = id ? parseInt(id) : null
        
        const createEspecificationUseCase =  container.resolve(CreateEspecificationUseCase);
        
       const especification =  await createEspecificationUseCase.execute({name, description, id: especification_id});
    
        return res.send(especification);
    }

}

export {EspecificationController}