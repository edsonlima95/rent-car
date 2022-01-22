import { getRepository, Repository } from "typeorm";
import { Especification } from "../../entities/Especification";
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

    async create({ name, description }: IEspecificationsDTO): Promise<Especification> {

        const especification = await this.repository.create({
            name,
            description
        });

       return await this.repository.save(especification)

    }

    async findByIds(especifications_id: number[]): Promise<Especification[]> {

        const especifications = await this.repository.findByIds(especifications_id)

        return especifications

    }

}

export { EspecificationsRepositories }