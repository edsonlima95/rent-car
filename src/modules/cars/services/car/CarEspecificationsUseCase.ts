import { AppError } from "@errors/AppError";
import { Car } from "@modules/cars/models/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IEspecificationsRepository } from "@modules/cars/repositories/IEspecificationsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: number,
    especifications_id: number[]
}

@injectable()
class CarEspecificationsUseCase {

    constructor(
        @inject("carsRepository")
        private carsRepository: ICarsRepository,
        @inject("EspecificationsRepository")
        private createEspecification: IEspecificationsRepository
    ) { }

    async execute({ car_id, especifications_id }: IRequest): Promise<Car> {

        const car = await this.carsRepository.findById(car_id)

        if (!car) {
            throw new AppError("O carro não existe!")
        }

        const especifications = await this.createEspecification.findByIds(especifications_id)

        car.especifications = especifications

        await this.carsRepository.save(car)

        return car
    }

}

export { CarEspecificationsUseCase }