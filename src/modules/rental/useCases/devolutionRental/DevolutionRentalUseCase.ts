import { AppError } from "@errors/AppError";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rental/entities/Rental";
import { IRentalCarRepository } from "@modules/rental/repositories/IRentalCarRepository";
import { IDateProvider } from "@shared/container/provider/IDateProvider";
import { inject, injectable } from "tsyringe";


@injectable()
class DevolutionRentalUseCase {

    constructor(
        @inject("rentalCarRepository")
        private rentalCarRepository: IRentalCarRepository,
        @inject("carsRepository")
        private carsRepository: ICarsRepository,
        @inject("dateProvider")
        private dateProvide: IDateProvider
    ) { }

    async execute(rental_id: number): Promise<Rental> {

        const rental = await this.rentalCarRepository.findById(rental_id)

        if (!rental) {
            throw new AppError("Aluguel não existe!")
        }

        // Calcula a se houve atraso, e aplica a "multa de atraso".

        const date = this.dateProvide.dateNow()

        const daily = this.dateProvide.compareInDays(rental.start_date, date)

        let total = 0;

        if (daily > 0) {
            total += rental.car.daily_rate * daily
        }


        // Calcula os dias de atraso, e aplica a "multa diaria"
        const daly = this.dateProvide.compareInDays(date, rental.expected_return_date)

        // Converte os dias para positivo
        var dalyConvertToPositive = Math.abs(daly)

        if (dalyConvertToPositive > 0) {
            const fineAmount = rental.car.fine_amount * dalyConvertToPositive
            total += fineAmount
        }

        rental.end_date = this.dateProvide.dateNow()
        rental.total = total

        await this.rentalCarRepository.create(rental)
        await this.carsRepository.updateAvailable(rental.car.id, true)

        return rental

    }

}

export { DevolutionRentalUseCase }