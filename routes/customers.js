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

<<<<<<< HEAD
// POST new customer

router.post('/', async (req, res) => {
  const {
    error
  } = validateCustomer(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let customer = new Customer({
    name: req.body.name,
    birthYear: req.body.birthyear,
    isGold: req.body.isGold,
    phone: req.body.phone
  })

  customer = await customer.save()
  res.send(customer)
})

// Update Customer 
router.put('/:id', async (req, res) => {
  const {
    error
  } = validateCustomer(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const customer = await Customer.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    birthYear: req.body.birthyear,
    isGold: req.body.isGold,
    phone: req.body.phone
  }, {
    new: true
  })
  if (!customer) return res.status(404).send('The customer with the given ID was not found.')
  res.send(customer)
})

=======
>>>>>>> 18fddf5c119425a541d098b4fcaac75e3a6fc6de


function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    birthYear: Joi.number().integer().min(1900).max(2050),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean()
  };

  return Joi.validate(customer, schema);
}

module.exports = router