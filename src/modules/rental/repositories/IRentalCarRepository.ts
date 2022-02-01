import { Rental } from "../models/Rental"


interface IRentalCarDTO {
    car_id: number,
    user_id: number,
    end_date?: Date,
    total?: number,
    id?: number,
    expected_return_date: Date
}

interface IRentalCarRepository {

    save(data: IRentalCarDTO): Promise<Rental>

    findById(id: number):Promise<Rental>

    getAllRentalsByUser(user_id: number): Promise<Rental[]>

    findOpenRentalCarByUser(user_id: number): Promise<Rental>

}

export { IRentalCarRepository, IRentalCarDTO }