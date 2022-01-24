import { CarImage } from "@modules/cars/entities/CarImage";
import { ICarImageRepository } from "@modules/cars/repositories/ICarImageRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: number,
    image_name: string[]
}

@injectable()
class CreateCarsImageUseCase {

    constructor(
        @inject("carsImageRepository")
        private carsImageRepository: ICarImageRepository
    ) { }

    async execute({car_id, image_name}:IRequest): Promise<void> {

        // Mapea o arrya das images e salva no banco
        image_name.map(async (image)=>{
          await this.carsImageRepository.uploadImage(car_id, image)
        })
    }

}

export { CreateCarsImageUseCase }