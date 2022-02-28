import { Rental } from "@modules/rental/models/Rental";
import { getRepository, Repository } from "typeorm";
import { IRentalCarDTO, IRentalCarRepository } from "../IRentalCarRepository";

class RentalCarRepository implements IRentalCarRepository {

    private repository: Repository<Rental>

    constructor() {
        this.repository = getRepository(Rental)
    }


    async save({ car_id, user_id, expected_return_date, end_date, total,id }: IRentalCarDTO): Promise<Rental> {

        const rental = this.repository.create({ car_id, user_id, expected_return_date, end_date, total,id })

        return await this.repository.save(rental)

    }

    // async findOpenRentalCarByCar(car_id: number): Promise<Rental> {

    //     const rentalCar = await this.repository.findOne(car_id)

    //     return rentalCar;

    // }

    async findOpenRentalCarByUser(user_id: number): Promise<Rental> {
        const rentalUser = await this.repository.findOne({ where: { user_id, end_date: null } })
        return rentalUser;
    }

    async findById(rental_id: number): Promise<Rental> {
        return await this.repository.findOne({
            where: { id: rental_id },
            relations: ['car', 'user']
        })
    }

    async getAllRentalsByUser(user_id: number): Promise<Rental[]> {
        return  await this.repository.find({where: {user_id},relations:['car']})
    }

}

export { RentalCarRepository }