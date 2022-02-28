
import { injectable } from "tsyringe";
import { IEmailProvider } from "../IEmailProvider";
import nodemailer, {Transporter} from "nodemailer"
import handlebars from "handlebars"
import fs from "fs"

@injectable()
class EtherealProvider implements IEmailProvider {

    private client: Transporter
    
    constructor(){
        nodemailer.createTestAccount().then((account)=>{

            let transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            }); 

            this.client = transporter

        }).catch((err)=>console.error(err));
        
    }
 
    async sendEmail(to: string, subject: string, variables: any, templatePath: string): Promise<void> {

        //Ler o conteudo do arquivo
        const templateFileContent = fs.readFileSync(templatePath).toString("utf-8")

        //compina para um template html com handlebars
        const templateParse = handlebars.compile(templateFileContent)

        //Monta o template
        const templateHTML = templateParse(variables)

        const message = await this.client.sendMail({
            to,
            from: "Rentx <noreplay@rentx.com>",
            subject,
            html: templateHTML
        })
        
        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }

}

export {EtherealProvider}
