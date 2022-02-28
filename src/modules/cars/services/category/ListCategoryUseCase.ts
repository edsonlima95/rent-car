import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/models/Category";
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