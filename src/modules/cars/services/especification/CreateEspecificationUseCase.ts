import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { IEspecificationsRepository } from "@modules/cars/repositories/IEspecificationsRepository";
import { Especification } from "@modules/cars/models/Especification";


interface IRequest {
    id?: number,
    name: string,
    description: string
}

@injectable()
class CreateEspecificationUseCase {

    constructor(
        @inject("EspecificationsRepository")
        private especificationsRepository: IEspecificationsRepository){}

    async execute({name, description, id}: IRequest): Promise<Especification>{

        const especificationAlreadeExists = await this.especificationsRepository.findByName(name);

        if(especificationAlreadeExists && id == null){
            throw new AppError("Especificação já existe")
        }                   

        const especification = await this.especificationsRepository.findById(id)

        if(!especification){
            throw new AppError("Especification não existe!")
        }

       return  await this.especificationsRepository.save({name,description, id});
    }

}


export {CreateEspecificationUseCase}