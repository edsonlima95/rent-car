
import { Category } from "@modules/cars/models/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepositoryTest implements ICategoriesRepository {

    private categories: Category[] = [];

    async create({ name, description, id }: ICreateCategoryDTO): Promise<Category> {

        const category = new Category();

        Object.assign(category, {
            name,
            description
        })

        this.categories.push(category)

        return category

    }
    async categoryByName(name: string): Promise<Category> {
        const category = await this.categories.find((category) => category.name === name);
        return category;
    }
    async getCategories(): Promise<Category[]> {
        return this.categories
    }

}

export {CategoriesRepositoryTest}