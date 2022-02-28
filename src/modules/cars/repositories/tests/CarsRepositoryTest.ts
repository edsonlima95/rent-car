
import { Car } from "@modules/cars/entities/Car";
import { ICarsRepository, ICarsRepositoryDTO } from "../ICarsRepository";

class CarsRepositoryTest implements ICarsRepository {

    private cars: Car[] = [];

    async create({
        name,
        description,
        daily_rate,
        license_plate,
        brand,
        category_id }: ICarsRepositoryDTO): Promise<void> {

        const car = new Car();

        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            brand,
            category_id
        })

        await this.cars.push(car)

    }
}

export { CarsRepositoryTest }