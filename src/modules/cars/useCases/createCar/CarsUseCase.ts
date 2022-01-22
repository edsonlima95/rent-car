import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "@modules/cars/entities/Car";

@injectable()
class CarsUseCase {

    constructor(
        @inject("carsRepository")
        private carsRepository: ICarsRepository
    ) { }

    async execute({ name,
        description,
        daily_rate,
        license_plate,
        brand,
        category_id,especifications,id }): Promise<Car> {

       const car =  await this.carsRepository.create({ name, description, daily_rate, license_plate, brand, category_id,especifications,id })
    
       return car
    }

}

export {CarsUseCase}