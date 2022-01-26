import { Rental } from "../entities/Rental";

interface IRentalCarDTO {
    id?: number,
    car_id: number,
    user_id: number,
    end_date?: Date,
    total?: number,
    expected_return_date: Date
}

interface IRentalCarRepository {

    create(data: IRentalCarDTO): Promise<Rental>

    findById(id: number):Promise<Rental>

    getAllRentalsByUser(user_id: number): Promise<Rental[]>

    findOpenRentalCarByUser(user_id: number): Promise<Rental>

}

export { IRentalCarRepository, IRentalCarDTO }