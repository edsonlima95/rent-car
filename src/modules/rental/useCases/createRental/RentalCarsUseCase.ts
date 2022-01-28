import { AppError } from "@errors/AppError";
import { container, inject, injectable } from "tsyringe";
import { IRentalCarRepository } from "../../repositories/IRentalCarRepository";

import { IDateProvider } from "@shared/container/provider/dateProvider/IDateProvider";
import { Rental } from "../../entities/Rental";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";


interface IRequest {
    id?:number
    car_id: number
    user_id: number
    expected_return_date: Date
}

@injectable()
class RentalCarsUseCase {

    constructor(
        @inject("rentalCarRepository")
        private rentalCarRepository: IRentalCarRepository,

        @inject("carsRepository")
        private carsRepository: ICarsRepository,

        @inject("dateProvider")
        private dateProvide: IDateProvider

    ) { }

    async execute({ car_id, user_id, expected_return_date, id }: IRequest): Promise<Rental> {

        // Verifica se o carro esta disponivel
        const carUnavailable = await this.carsRepository.findById(car_id)

        if (!carUnavailable.available) {
            throw new AppError("Carro está indisponivel!")
        }

        // Verifica se o carro esta disponivel
        const userUnavailable = await this.rentalCarRepository.findOpenRentalCarByUser(user_id)

        if (userUnavailable) {
            
            throw new AppError("O usuáro já possui um aluguel!")
        }

        // Verfica se a data de retorno é menor que 24H

        const dateNow = this.dateProvide.dateNow()

        const compar = this.dateProvide.compareInHours(dateNow, expected_return_date)

        if (compar > 24) {
            throw new AppError("A data não pode ser menor que 24H")
        }

        const rental = await this.rentalCarRepository.create({ car_id, user_id, expected_return_date })


        await this.carsRepository.updateAvailable(car_id, false)
    
        return rental
    }

}

export { RentalCarsUseCase }