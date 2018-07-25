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

// GET customers
router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name')
  res.send(customers)
})

// GET customer by ID
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id)
  if (!customer) return res.status(404).send('The customer with the given ID was not found')
  res.send(customer)
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