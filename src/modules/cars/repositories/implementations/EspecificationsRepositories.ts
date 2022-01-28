import { Especification } from "@modules/cars/models/Especification";
import { getRepository, Repository } from "typeorm";

import { IEspecificationsDTO, IEspecificationsRepository } from "../IEspecificationsRepository";


class EspecificationsRepositories implements IEspecificationsRepository {

    private repository: Repository<Especification>;

    public constructor() {
        this.repository = getRepository(Especification);
    }
   
    async getEspecifications(): Promise<Especification[]> {
        const especifications = await this.repository.find();
        return especifications;
    }

    async findByName(name: string): Promise<Especification> {
        const especification = this.repository.findOne({ name })
        return especification;
    }

    async save({ name, description, id }: IEspecificationsDTO): Promise<Especification> {

        const especification = await this.repository.create({
            id,
            name,
            description
        });

       return await this.repository.save(especification)

    }

    async findById(id: number): Promise<Especification> {
        const especification = await this.repository.findOne(id)
        return especification
    }

    async findByIds(especifications_id: number[]): Promise<Especification[]> {

        const especifications = await this.repository.findByIds(especifications_id)

        return especifications
    }

}

export { EspecificationsRepositories }