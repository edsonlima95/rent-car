import { Car } from "../entities/Car";
import { Especification } from "../entities/Especification";

interface ICarsRepositoryDTO {
    id?: number
    name: string,
    description?: string,
    daily_rate: number,
    license_plate: string,
    brand?: string,
    category_id?: number,
    especifications?: Especification[],
}


interface ICarsRepository {

    create(data: ICarsRepositoryDTO): Promise<Car>
    findByLicensePlate(license_plate: string): Promise<Car>
    findAvailables(name?: string, category_id?: number, brand?: string): Promise<Car[]>
    findById(car_id: number):Promise<Car>
}

export { ICarsRepository, ICarsRepositoryDTO }