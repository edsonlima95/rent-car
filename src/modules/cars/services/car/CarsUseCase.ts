import { AppError } from '@errors/AppError';
import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "@modules/cars/models/Car";

interface IRequest {
    name: string,
    description?: string,
    daily_rate: number,
    license_plate: string,
    brand?: string,
    fine_amount: number,
    category_id?: number,
    especifications?: [],
    id?: number
}

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
        fine_amount,
        category_id, especifications, id }: IRequest): Promise<Car> {

        const car = await this.carsRepository.findById(id)

        if(!car){
            throw new AppError("Carro não existe")
        }

        return await this.carsRepository.save(
            { name, description, daily_rate, fine_amount, license_plate, brand, category_id, especifications, id })

    }

    

}

export { CarsUseCase }