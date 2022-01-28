import { AppError } from '@errors/AppError';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICarImageRepository } from "@modules/cars/repositories/ICarImageRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id: number,
    image_name: string[]
}

@injectable()
class CarsImageUseCase {

    constructor(
        @inject("carsImageRepository")
        private carsImageRepository: ICarImageRepository,
        @inject("carsRepository")
        private carsRepository: ICarsRepository
    ) { }

    async execute({car_id, image_name}:IRequest): Promise<void> {

        const car = await this.carsRepository.findById(car_id)

        if(!car){
            throw new AppError("O carro não existe")
        }

        // Mapea o arrya das images e salva no banco
        image_name.map(async (image)=>{
          await this.carsImageRepository.uploadImage(car_id, image)
        })
    }

}

export { CarsImageUseCase }