const mongoose = require('mongoose')
const Joi = require('joi');


const Customer = mongoose.model('Customer', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  birthYear: {
    type: Number,
    min: 1990,
    max: 2050
  },
  isGold: {
    type: Boolean,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}))

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    birthYear: Joi.number().integer().min(1900).max(2050),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean()
  };

  return Joi.validate(customer, schema);
}

exports.Customer = Customer
exports.validate = validateCustomer