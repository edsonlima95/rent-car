import { Request, Response } from "express";
import { container } from "tsyringe";
import { Category } from "../../entities/Category";
import { ListCategoryUseCase } from "./ListCategoryUseCase";


class ListCategoryController {


    async handle(req: Request, res: Response): Promise<Response> {


        const listCategoriesUseCase = container.resolve(ListCategoryUseCase)

        const categories = await listCategoriesUseCase.execute();
        
        return res.status(200).json(categories)

    }

}


export { ListCategoryController }