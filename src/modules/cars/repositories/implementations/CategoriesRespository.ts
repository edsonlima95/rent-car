
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

import { getRepository, Repository } from 'typeorm'
import { Category } from "@modules/cars/models/Category";

class CategoriesRespository implements ICategoriesRepository {

    private repository: Repository<Category>;

    public constructor(){
        this.repository = getRepository(Category);
    }
   
    async getCategories(): Promise<Category[]> {
        const categories =  await this.repository.find();
        return categories;
    }

    async save({ name, description, id }: ICreateCategoryDTO): Promise<Category> {

        const category = this.repository.create({
            id,
            name,
            description
        })

       return await this.repository.save(category);
        
    }

    async categoryByName(name: string) {
        const category = await this.repository.findOne({name})
        return category;
    }

    async findById(id: number): Promise<Category> {
        const category = await this.repository.findOne(id)
        return category;
    }
   
}

export { CategoriesRespository }