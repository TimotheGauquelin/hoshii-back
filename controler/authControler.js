import loginService from '../service/auth/loginService.js'
import registerService from '../service/auth/registerService.js'
import * as checkIf from '../service/utils/checkIf.js'

import Joi from 'joi';

async function registerControler(req, res, next) {
    
    try {

      const CHECK_IF_USERNAME_ALREADY_EXISTS = await checkIf.checkIfUserNameAlreadyExists(req, res, next);
      const CHECK_IF_EMAIL_ALREADY_EXISTS = await checkIf.checkIfEmailAlreadyExists(req, res, next);

      if (CHECK_IF_USERNAME_ALREADY_EXISTS === null && CHECK_IF_EMAIL_ALREADY_EXISTS === null) {

        const USER_JOI_MODEL = Joi.object({

          username: Joi.string()
                      .alphanum()
                      .min(3)
                      .max(30)
                      .required()
                      .messages({
                        'string.alphanum': `Votre pseudo ne doit contenir que des lettres (sans accent)`,
                        'string.empty': `Le champs "Username" est obligatoire`,
                        'string.min': `Votre pseudo doit contenir minimum 3 caractères`,
                        'string.max': `Votre pseudo doit contenir maximum 30 caractères`,
                        'string.required': `Le champs "Username" est obligatoire`
                      }),
          email: Joi.string()
                    .email({ minDomainSegments: 2, tlds: { allow: ['fr', 'com'] } })
                    .messages({
                      'string.empty': `Le champs "Email" est obligatoire`,
                      'string.required': `Le champs "Email" est obligatoire`
                    }),
          password: Joi.string()
                       .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                       .messages({
                        'string.empty': `Le champs "Mot de Passe" est obligatoire`,
                        "string.pattern.base": "Votre Mot de Passe doit contenir 3 à 30 caractères",
                      }),
          checkPassword: Joi.string()
                            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                            .messages({
                            'string.empty': `Le champs "Confirmation de Mot de Passe" est obligatoire`,
                            "string.pattern.base": "Votre Confirmation de Mot de Passe doit contenir 3 à 30 caractères",
                            }),
        });

        const {error, value} = USER_JOI_MODEL.validate(req.body);

        if(error) {

          res.status(400).json(error.details[0].message);

        } else {
          const RESPONSE = await registerService(value, res, next);
          res.status(201).json(RESPONSE);

        } 

      } else {

        throw new Error("Ce nom d'utilisateur et/ou cet email existe déjà");

      }

    } catch(error) {
  
      next(error);
      
    }
}

async function loginControler(req, res, next) {
  try {

    const accessToken = await loginService(req, res, next);
    res.status(200).json(accessToken);

  } catch(error) {

    next(error);
    
  }
}

export { registerControler, loginControler }