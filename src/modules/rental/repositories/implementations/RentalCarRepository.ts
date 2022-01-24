import { Rental } from "@modules/rental/entities/Rental";
import { getRepository, Repository } from "typeorm";
import { IRentalCarDTO, IRentalCarRepository } from "../IRentalCarRepository";

class RentalCarRepository implements IRentalCarRepository {

    private repository: Repository<Rental>

    constructor() {
        this.repository = getRepository(Rental)
    }

    async create({car_id, user_id, expected_return_date}:IRentalCarDTO): Promise<Rental> {

        const rental = this.repository.create({ car_id, user_id,expected_return_date})

        return await this.repository.save(rental)
    
    }

    async findOpenRentalCarByCar(car_id: number): Promise<Rental> {

        const rentalCar = await this.repository.findOne({ car_id })

        return rentalCar;

    }

    async findOpenRentalCarByUser(user_id: number): Promise<Rental> {
        const rentalUser = await this.repository.findOne({ user_id })

        return rentalUser;
    }

}

export { RentalCarRepository }