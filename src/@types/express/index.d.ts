
declare namespace Express {

    export interface Request {
        user: {
            user_id: number
        },
        file: {
            filename: string
        },
        files:[],
    } 

    export interface Error {
        statusCode: string 
    }
}
