import { IStorageProvider } from "../IStorageProvider";
import fs from "fs"
import {resolve} from "path"
import upload from "@config/upload";
import mime from "mime"

import {S3} from 'aws-sdk'

class S3StorageProvider implements IStorageProvider{

    private client: S3;
   
    constructor(){
        this.client =  new S3({
            region: process.env.AWS_BUCKET_REGION
        })
    }

    async save(file: string, folder: string): Promise<string> {
        //Obtem o caminho da imagem da pasta local tmp
        const originalName = resolve(upload.tmpFolder,file)

        //Ler o conteudo do arquivo.
        const fileContent = await fs.promises.readFile(originalName)

        //Obtem o mimeType do arquivo
        const ContentType = mime.getType(originalName)

        await this.client.putObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
            Body: fileContent,
            ContentType,
            ACL:"public-read"
        }).promise()

        await fs.promises.unlink(originalName)

        return file
    }
   
    async delete(file: string, folder: string): Promise<void> {

        await this.client.deleteObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
        })
      
    }

}

export {S3StorageProvider}