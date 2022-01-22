import { Category } from "../entities/Category";

interface ICreateCategoryDTO {
    name: string,
    description: string
}

interface ICategoriesRepository {
    create({ name, description}: ICreateCategoryDTO): Promise<void>;
    categoryByName(name: string): Promise<Category>;
    getCategories(): Promise<Category[]>;
}


export {ICategoriesRepository, ICreateCategoryDTO}