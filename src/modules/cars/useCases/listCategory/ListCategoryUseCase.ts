import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/entities/Category";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";


@injectable()
class ListCategoryUseCase {

    constructor(
        @inject("CategoriesRepository")
        private listCategoryRepository: ICategoriesRepository) { }

    async execute(): Promise<Category[]> {
        return await this.listCategoryRepository.getCategories();
    }

}

export { ListCategoryUseCase }