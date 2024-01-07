const Joi = require("@hapi/joi");



const signupValidation=(data)=>{

    const schema=Joi.object({

        username: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
        referralLink:Joi.string(),
        balance:Joi.number()

    });
    return schema.validate(data);
};

const loginValidation=(data)=>{

    const schema=Joi.object({

        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)

    });
    return schema.validate(data);


};

module.exports.loginValidation = loginValidation;
module.exports.signupValidation = signupValidation;