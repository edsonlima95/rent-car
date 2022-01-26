import { AppError } from "@errors/AppError";
import { Rental } from "@modules/rental/entities/Rental";
import { IRentalCarRepository } from "@modules/rental/repositories/IRentalCarRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListUserRentalsUseCase {

    constructor(
        @inject("rentalCarRepository")
        private rentalCarRepository: IRentalCarRepository
    ) { }

    async execute(user_id: number): Promise<Rental[]> {

        const rentals = await this.rentalCarRepository.getAllRentalsByUser(user_id)

        return rentals

    }

}

export { ListUserRentalsUseCase }