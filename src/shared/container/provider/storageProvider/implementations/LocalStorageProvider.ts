import { IStorageProvider } from "../IStorageProvider";
import fs from "fs"
import {resolve} from "path"
import upload from "@config/upload";

class LocalStorageProvider implements IStorageProvider{
   
    async save(file: string, folder: string): Promise<string> {
        await fs.promises.rename(
            //Copia o arquivo da pasta tmp
            resolve(upload.tmpFolder,file),
            //Para a pasta passada aqui
            resolve(`${upload.tmpFolder}/${folder}`, file)
        )

        return file
    }
   
    async delete(file: string, folder: string): Promise<void> {

        const file_name = resolve(`${upload.tmpFolder}/${folder}`, file)

        try {
            await fs.promises.stat(file_name);
        } catch (error) {
            return;
        }
    
        await fs.promises.unlink(file_name)
    }

}

export {LocalStorageProvider}