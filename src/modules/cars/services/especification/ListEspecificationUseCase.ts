import { inject, injectable } from "tsyringe";

import { Especification } from "@modules/cars/models/Especification";
import { IEspecificationsRepository } from "@modules/cars/repositories/IEspecificationsRepository";


@injectable()
class ListEspecificationUseCase {

    constructor(
        @inject("EspecificationsRepository")
        private especificationRepository: IEspecificationsRepository){}

   async execute():Promise<Especification[]>{
        return await this.especificationRepository.getEspecifications();
    }

}


export {ListEspecificationUseCase}