

interface IEmailProvider {

    sendEmail(to: string,
        subject: string,
        variables: any, templatePath: string):Promise<void>

}

export {IEmailProvider}