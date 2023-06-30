import loginService from '../service/auth/loginService.js'
import registerService from '../service/auth/registerService.js'

import Joi from 'joi';

async function registerControler(req, res, next) {
    
    try {

      const schema = Joi.object({
        username: Joi.string()
                     .alphanum()
                     .min(3)
                     .max(30)
                     .required(),
        email: Joi.string()
                  .email({ minDomainSegments: 2, tlds: { allow: ['fr', 'com'] } }),
        password: Joi.string(),
                    //  .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        isAdmin: Joi.boolean().required(),
        isActive: Joi.boolean().required(),
      });

      const {error, value} = schema.validate(req.body);

      if(error) {

        res.status(400).json(error.details[0].message);

      } else {

        const response = await registerService(value, res, next);
        res.status(201).json(response);

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