import { UsersRepository } from '@modules/account/repositories/implementatios/UsersRepository';

import { body , check} from 'express-validator'

function validate(routeName) {
    

    switch (routeName) {
        case 'categories': {
            return [
                body('name').exists().withMessage('O campo nome é obrigatório')
                            .isLength({ min: 3 }).withMessage("O minimo de caracteres é 3"),
            ]
        }
        
        case 'users': {
            return [
               body("email").isEmail().withMessage("E-mail invalido").exists(),
               body("password").isLength({min: 4}).withMessage("Senha deve ter no minimo 4 caracteres").exists(),
            ]
        }
    }

}

export {validate}