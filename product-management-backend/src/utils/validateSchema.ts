import Joi from 'joi';

export const productSchema = Joi.object({
  name: Joi.string().required(),
  brand: Joi.string().required(),
  type: Joi.string().required(),
  warranty_period: Joi.number().integer().min(0).required(),
  start_date: Joi.date().iso().required(),
  price: Joi.number().precision(2).positive().required(),
});