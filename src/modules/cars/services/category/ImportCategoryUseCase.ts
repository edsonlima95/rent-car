import csvParse from "csv-parser";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { CategoriesRespository } from "@modules/cars/repositories/implementations/CategoriesRespository";

interface IImportCategory {
    name: string,
    description: string
}

@injectable()
class ImportCategoryUseCase {

    constructor(
        @inject("CategoriesRepository")
        private createCategoriesRepository: CategoriesRespository){}

    loadFile(file: any): Promise<IImportCategory[]> {

        return new Promise((resolve, reject) => {

            const categories: IImportCategory[] = [];

            // Criando um stream do arquivo que foi enviado, para leitura.
            const stream = fs.createReadStream(file.path);


            const readFile = csvParse(['name','description']);

            /**
             * Pipe - ler linha por linha de um arquivo
             * Csv-parser - Faz a conversão para o Pipe ler as linhas 
             */
            stream.pipe(readFile);

            // Retorna em forma de objetos os dados do arquivo.
            readFile.on("data", async (data) => {
                categories.push(data)
            }).on('end', () => {
                // Remove o arquivo apos salvar.
                fs.promises.unlink(file.path)
                resolve(categories)
            }).on("error", (err) => {
                reject(err)
            })

        })

    }

    async execute(file: any): Promise<void> {

        const categories = await this.loadFile(file);
       
        categories.map(async (category)=>{
            const {name, description} = category;
            const categoryAlreadyExists = await this.createCategoriesRepository.categoryByName(name);

            if(!categoryAlreadyExists){
                await this.createCategoriesRepository.create({
                    name,
                    description
                })
            }
        })


    }

}

export { ImportCategoryUseCase }