import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { IEspecificationsRepository } from "@modules/cars/repositories/IEspecificationsRepository";
import { Especification } from "@modules/cars/entities/Especification";

interface IRequest {
    name: string,
    description: string
}

@injectable()
class CreateEspecificationUseCase {

    constructor(
        @inject("EspecificationsRepository")
        private createEspecification: IEspecificationsRepository){}

    async execute({name, description}: IRequest): Promise<Especification>{

        const especificationAlreadeExists = await this.createEspecification.findByName(name);

        if(especificationAlreadeExists){
            throw new AppError("Especificação já existe")
        }

       return  await this.createEspecification.create({name,description});
    }

}


export {CreateEspecificationUseCase}