
import { inject, injectable } from "tsyringe";
import { Car } from "@modules/cars/models/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
    name?: string,
    brand?: string,
    category_id?: number
}

@injectable()
class ListAvailableCarsUseCase {

    constructor(
        @inject("carsRepository")
        private carsRepository: ICarsRepository
    ) { }


    async execute({name, category_id, brand }:IRequest):Promise<Car[]>{

        const cars = await this.carsRepository.findAvailables(name,category_id,brand);

        return cars;

    }

}

export { ListAvailableCarsUseCase }