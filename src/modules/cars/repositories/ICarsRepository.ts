import { Car } from "../models/Car"
import { Especification } from "../models/Especification"

interface ICarsRepositoryDTO {
    id?: number
    name: string,
    description?: string,
    daily_rate: number,
    fine_amount: number,
    license_plate: string,
    brand?: string,
    category_id?: number,
    especifications?: Especification[],
}


interface ICarsRepository {

    save(data: ICarsRepositoryDTO): Promise<Car>
    findByLicensePlate(license_plate: string): Promise<Car>
    findAvailables(name?: string, category_id?: number, brand?: string): Promise<Car[]>
    findById(id: number):Promise<Car>
    updateAvailable(id: number, available: boolean):Promise<void>
}

export { ICarsRepository, ICarsRepositoryDTO }