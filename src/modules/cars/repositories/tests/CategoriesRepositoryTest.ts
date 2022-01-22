
import { Category } from "@modules/cars/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepositoryTest implements ICategoriesRepository {

    private categories: Category[] = [];

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {

        const category = new Category();

        Object.assign(category, {
            name,
            description
        })

        this.categories.push(category)

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