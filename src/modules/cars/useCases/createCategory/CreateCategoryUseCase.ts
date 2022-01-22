import { inject, injectable } from "tsyringe"
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository"
import { AppError } from "@errors/AppError"

interface IRequest { 
    name: string,
    description: string
}

@injectable()
class CreateCategoryUseCase {

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepositories: ICategoriesRepository
    ){}

    async execute({name, description}: IRequest): Promise<void>{
        
        const categoryAlreadyExists = await this.categoriesRepositories.categoryByName(name)
    
        if(categoryAlreadyExists){
            throw new AppError("Categoria já existe!")
        }
    
       await this.categoriesRepositories.create({name, description})
    
    }

}

export {CreateCategoryUseCase}