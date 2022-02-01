import "reflect-metadata"
//Inicia as variaveis de ambiaente junto com a aplicação
import "dotenv/config";

import express, { NextFunction, Request, Response } from 'express'
import "./shared/container"
// import "./database"

import createConnection from './database'
createConnection();

import "express-async-errors"


import { router } from './routes';

import swaggerUi = require('swagger-ui-express');
import swaggerDocument = require('./swagger.json');
import { AppError } from '@errors/AppError';
import upload from "@config/upload";

const app = express();

app.use(express.json())

app.use(router);

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Exibe os erros do tipo throw new
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ "message": err.message })
    }

    return res.status(500).json({"message":`Error interno da aplicação ${err}`})
})

app.listen(8000)