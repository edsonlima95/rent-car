import { Request, Response } from "express"
import { container } from "tsyringe"
import { CarsImageUseCase } from "../services/car/CarImagesUseCase"
import { CarsUseCase } from "../services/car/CarsUseCase"
import { ListAvailableCarsUseCase } from "../services/car/ListAvailableCarsUseCase"
import { CarEspecificationsUseCase } from "../services/car/CarEspecificationsUseCase"

interface IRequest {
    name?: string,
    brand?: string,
    category_id?: number
}

interface IFile {
    filename: string
}


class CarsController {

    async save(req: Request, res: Response): Promise<Response> {

        const { name, description, daily_rate, fine_amount, license_plate, brand, category_id, especifications } = req.body

        const {id} = req.params

        const car_id = id ? parseInt(id) : null
        
        const carsUseCase = container.resolve(CarsUseCase)

        const car = await carsUseCase.execute({ name, description, daily_rate,fine_amount,license_plate, brand, category_id, especifications, id:car_id })

        return res.send(car)

    }

    async availableCar(req: Request, res: Response): Promise<Response> {

        const { name, category_id, brand } = req.query as IRequest

        const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase)

        const cars =  await listAvailableCarsUseCase.execute({name,category_id, brand})

        return res.json(cars)

    }

    async uploadImages(req: Request, res: Response): Promise<Response> {

        const { id } = req.params

        const car_id = parseInt(id)

        //Recebe o array das images
        const images = req.files as IFile[]

        const carImageUseCase = container.resolve(CarsImageUseCase)

        //Retorna um novo array com apenas o nome das images
        const image_name = images.map((file) => file.filename)

        await carImageUseCase.execute({ car_id, image_name })

        return res.json()
    }

    async saveCarEspecifications(req: Request, res: Response): Promise<Response> {

        const { id } = req.params
        
        const car_id = parseInt(id)

        const {especifications_id} = req.body
        
        const carsEspecificationUseCase = container.resolve(CarEspecificationsUseCase)

        const result  = await carsEspecificationUseCase.execute({car_id, especifications_id})

        return res.json(result)

    }

}



export { CarsController }