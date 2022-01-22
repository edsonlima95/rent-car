import { Category } from "../../entities/Category"
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

import { getRepository, Repository } from 'typeorm'

class CategoriesRespository implements ICategoriesRepository {

    private repository: Repository<Category>;

    public constructor(){
        this.repository = getRepository(Category);
    }

    async getCategories(): Promise<Category[]> {
        const categories =  await this.repository.find();
        return categories;
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {

        const category = this.repository.create({
            name,
            description
        })

        await this.repository.save(category);
        
    }

    async categoryByName(name: string) {
        const category = await this.repository.findOne({name})
        
        return category;
    }
}

export { CategoriesRespository }