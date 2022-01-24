import { Rental } from "../entities/Rental";

interface IRentalCarDTO {
    car_id: number,
    user_id: number
    expected_return_date: Date
}

interface IRentalCarRepository {

    create(data: IRentalCarDTO): Promise<Rental>

    findOpenRentalCarByCar(car_id: number): Promise<Rental>

    findOpenRentalCarByUser(user_id: number): Promise<Rental>

}

export { IRentalCarRepository, IRentalCarDTO }