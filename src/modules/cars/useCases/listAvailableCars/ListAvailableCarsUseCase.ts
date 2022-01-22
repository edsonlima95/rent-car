
import { inject, injectable } from "tsyringe";
import { Car } from "@modules/cars/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

@injectable()
class ListAvailableCarsUseCase {

    constructor(
        @inject("carsRepository")
        private carsRepository: ICarsRepository
    ) { }


    async execute(name?: string, category_id?: number, brand?: string):Promise<Car[]>{

        const cars = await this.carsRepository.findAvailables(name,category_id,brand);

        return cars;

    }

}

export { ListAvailableCarsUseCase }