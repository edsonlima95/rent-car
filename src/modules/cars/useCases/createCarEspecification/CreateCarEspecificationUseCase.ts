import { AppError } from "@errors/AppError";
import { Car } from "@modules/cars/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IEspecificationsRepository } from "@modules/cars/repositories/IEspecificationsRepository";
import { inject, injectable, injectAll } from "tsyringe";

interface IRequest {
    car_id: number,
    especifications_id: number[]
}

@injectable()
class CreateCarEspecificationUseCase {

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

        await this.carsRepository.create(car)

        return car
    }

}

export { CreateCarEspecificationUseCase }