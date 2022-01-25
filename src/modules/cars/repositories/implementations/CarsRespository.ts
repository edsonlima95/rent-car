import { Car } from "@modules/cars/entities/Car";
import { createQueryBuilder, getRepository, Repository } from "typeorm";
import { ICarsRepository, ICarsRepositoryDTO } from "../ICarsRepository";


class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>

    constructor() {

        this.repository = getRepository(Car)
    }
 
    async create({
        name,
        description,
        daily_rate,
        license_plate,
        brand,
        category_id, especifications, id }: ICarsRepositoryDTO): Promise<Car> {

        const car = this.repository.create({ name, description, daily_rate, license_plate, brand, category_id, especifications, id })

        return await this.repository.save(car)


    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return await this.repository.findOne({ license_plate })
    }

    async findAvailables(name?: string, category_id?: number, brand?: string): Promise<Car[]> {
        const carsQuery = await this.repository.createQueryBuilder("car");

        carsQuery.where("available = :available", { available: true })

        if (name) {
            carsQuery.andWhere("name = :name", { name: name })
        }
        if (category_id) {
            carsQuery.andWhere("category_id = :category_id", { category_id: category_id })
        }
        if (brand) {
            carsQuery.andWhere("brand = :brand", { brand: brand })
        }

        return await carsQuery.getMany()

    }

    async findById(car_id: number): Promise<Car> {

        const car = await this.repository.findOne(car_id)

        return car

    }

    async updateAvailable(id: number, available: boolean): Promise<void> {
    
         await this.repository.createQueryBuilder()
                                    .update()
                                    .set({available})
                                    .where("id = :id")
                                    .setParameters({id})
                                    .execute()
    
    }



}

export { CarsRepository }