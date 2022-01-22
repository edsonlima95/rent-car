import { Response } from "express";
import { container } from "tsyringe";
import { ListEspecificationUseCase } from "./ListEspecificationUseCase";



class ListEspecificationController {
    
    async handle(req, res):Promise<Response>{
        
        const listEspecificationUseCase = container.resolve(ListEspecificationUseCase);
        
        const especifications = await listEspecificationUseCase.execute();
        
        return res.json(especifications)
    }

}


export {ListEspecificationController}