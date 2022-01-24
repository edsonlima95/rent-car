import { Request, request, Response, response } from "express"
import { container } from "tsyringe"
import { CreateCarsImageUseCase } from "./CreateCarsImageUseCase"

interface IFile {
    filename: string
}

class CreateCarsImageController {

    async handle(req: Request, res: Response): Promise<Response> {

        const { id } = req.params

        const images = req.files as IFile[]

        const carImageUseCase = container.resolve(CreateCarsImageUseCase)

        const image_name = images.map((file) => file.filename)

        await carImageUseCase.execute({ car_id: id as unknown as number, image_name })

        return res.json()
    }

}

export { CreateCarsImageController }


