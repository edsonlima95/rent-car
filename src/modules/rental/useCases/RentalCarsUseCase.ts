import { AppError } from "@errors/AppError";
import { container, inject, injectable } from "tsyringe";
import { IRentalCarRepository } from "../repositories/IRentalCarRepository";

import { IDateProvider } from "@shared/container/provider/IDateProvider";
import { Rental } from "../entities/Rental";


interface IRequest {
    car_id: number
    user_id: number
    expected_return_date: Date
}

@injectable()
class RentalCarsUseCase {

    constructor(
        @inject("rentalCarRepository")
        private rentalCarRepository: IRentalCarRepository,

        @inject("dateProvider")
        private dateProvide: IDateProvider

    ) { }

    async execute({ car_id, user_id, expected_return_date }: IRequest): Promise<Rental> {

        // Verifica se o carro esta disponivel
        const carUnavailable = await this.rentalCarRepository.findOpenRentalCarByCar(car_id)

        if (carUnavailable) {
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
    
        return rental
    }

}

export { RentalCarsUseCase }