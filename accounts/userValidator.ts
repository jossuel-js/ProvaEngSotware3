import { Joi, Segments } from "celebrate";

export const userRegistrationValidator = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().messages({
      "string.empty": `O campo name não pode ser vazio!`,
    }),
    email: Joi.string().email().required().messages({
      "string.empty": `O campo email não pode ser vazio!`,
      "string.email": "Deve informar um email válido",
    }),
    password: Joi.string().min(6).required().messages({
      "string.empty": `O campo password não pode ser vazio!`,
      "string.min": "a senha deve conter no mínimo 6 caracteres",
    }),
  }),
};
