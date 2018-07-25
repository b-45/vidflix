const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Customer = mongoose.model('Customer', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  birthyear: {
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


router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name')
  res.send(customers)
})

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    birthyear: Joi.number().integer().min(1900).max(2050),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean()
  };

  return Joi.validate(customer, schema);
}

module.exports = router