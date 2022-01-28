import { Especification } from "../models/Especification";

interface IEspecificationsDTO {
    id?: number,
    name: string;
    description: string;
}

interface IEspecificationsRepository {

    save(data: IEspecificationsDTO): Promise<Especification>;
    findByName(name: string): Promise<Especification>;
    findById(id: number): Promise<Especification>;
    getEspecifications(): Promise<Especification[]>;
    findByIds(especifications_id: number[]):Promise<Especification[]>
}


export { IEspecificationsRepository, IEspecificationsDTO }