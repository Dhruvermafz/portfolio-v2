const Joi = require("joi");

const validateCategory = (categoryData) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    parentCategory: Joi.string().allow(null), // Allow parent to be null
    isActive: Joi.boolean().default(true), // Validate `isActive` field
  });

  return schema.validate(categoryData);
};

module.exports = validateCategory;
