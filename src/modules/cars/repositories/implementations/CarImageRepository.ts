import { CarImage } from "@modules/cars/entities/CarImage";
import { getRepository, Repository } from "typeorm";
import { ICarImageRepository } from "../ICarImageRepository";

class CarImageRepository implements ICarImageRepository{

    private repository: Repository<CarImage>

    constructor(){
        this.repository = getRepository(CarImage)
    }

    async uploadImage(car_id: number, image_name: string): Promise<CarImage> {
       
        const carImage = this.repository.create({car_id, image_name})

        await this.repository.save(carImage)

        return carImage;
    }

}

export {CarImageRepository}