import { Especification } from "../entities/Especification";

interface IEspecificationsDTO {
    name: string;
    description: string;
}

interface IEspecificationsRepository {

    create({ name, description }: IEspecificationsDTO): Promise<Especification>;
    findByName(name: string): Promise<Especification>;
    getEspecifications(): Promise<Especification[]>;
    findByIds(especifications_id: number[]):Promise<Especification[]>
}


export { IEspecificationsRepository, IEspecificationsDTO }