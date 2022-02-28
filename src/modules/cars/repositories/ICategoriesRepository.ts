import { Category } from "../models/Category";


interface ICreateCategoryDTO {
    id?: number,
    name: string,
    description: string
}

interface ICategoriesRepository {
    save(data: ICreateCategoryDTO): Promise<Category>;
    categoryByName(name: string): Promise<Category>;
    findById(id: number): Promise<Category>;
    getCategories(): Promise<Category[]>;
}


export {ICategoriesRepository, ICreateCategoryDTO}