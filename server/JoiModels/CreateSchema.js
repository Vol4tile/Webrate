import Joi from "joi";

export const RatingSchema = Joi.object({
  baslik: Joi.string().min(3).max(60).required(),
  yazi: Joi.string().min(5).max(1500).required(),

  starRating: Joi.number().required(),
});

export const UserQuestionSchema = Joi.object({
  username: Joi.string().required(),
});
export const UserDataSchema = Joi.object({
  username: Joi.string().required(),
});
export const signUpSchema = Joi.object({
  fullname: Joi.string().min(5).max(30).required(),
  username: Joi.string().min(5).max(30).required(),
  password: Joi.string().min(8).max(50).required(),
  email: Joi.string().email().required(),
});
export const signInSchema = Joi.object({
  username: Joi.string().min(5).max(30).required(),
  password: Joi.string().min(8).max(50).required(),
});
export const searchUserSchema = Joi.object({
  search: Joi.string().required().trim().min(1),
});
