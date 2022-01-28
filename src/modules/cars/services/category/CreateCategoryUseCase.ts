import { inject, injectable } from "tsyringe"
import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository"
import { AppError } from "@errors/AppError"
import { Category } from "@modules/cars/models/Category"

interface IRequest {
    id?:number,
    name: string,
    description: string
}

@injectable()
class CreateCategoryUseCase {

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepositories: ICategoriesRepository
    ){}

    async execute({name, description, id}: IRequest): Promise<Category>{
        
        const categoryAlreadyExists = await this.categoriesRepositories.categoryByName(name)
    
        if(categoryAlreadyExists && id == null){
            throw new AppError("Categoria já existe!")
        }

        const category = await this.categoriesRepositories.findById(id)

        if(!category){
            throw new AppError("Categoria não existe!")
        }
    
       return await this.categoriesRepositories.save({name, description, id})
    
    }

}

export {CreateCategoryUseCase}