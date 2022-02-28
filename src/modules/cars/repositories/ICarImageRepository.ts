import { CarImage } from "../models/CarImage"


interface ICarImageRepository {

    uploadImage(car_id:number, image_name: string):Promise<CarImage>

}

export {ICarImageRepository}