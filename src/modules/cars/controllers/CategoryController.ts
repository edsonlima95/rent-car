import { validationResult } from 'express-validator';
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryUseCase } from '../services/category/CreateCategoryUseCase'
import { ImportCategoryUseCase } from "../services/category/ImportCategoryUseCase";
import { ListCategoryUseCase } from "../services/category/ListCategoryUseCase";

class CategoryController {


    async index(req: Request, res: Response): Promise<Response> {

        const listCategoriesUseCase = container.resolve(ListCategoryUseCase)

        const categories = await listCategoriesUseCase.execute();

        return res.json(categories)

    }

    async save(req: Request, res: Response): Promise<Response> {

        const { name, description } = req.body
        const { id } = req.params
        const category_id = id ? parseInt(id) : null;

        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const createCategoriesUseCase = container.resolve(CreateCategoryUseCase)

        const category = await createCategoriesUseCase.execute({ name, description, id: category_id });

    
        return res.send(category)

    }

    async importFromCsv(req: Request, res: Response): Promise<Response> {
        const { file } = req;

        const importCategoryUseCase = container.resolve(ImportCategoryUseCase)

        await importCategoryUseCase.execute(file)

        return res.send()
    }

}

export { CategoryController }