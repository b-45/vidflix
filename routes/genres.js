const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Genre = new mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}))

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name')
  res.send(genres)
})


router.post('/', async (req, res) => {
  const {
    error
  } = validateGenre(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    name: req.body.name
  }, {
    new: true
  })
  if (!genre) return res.status(404).send('The genre with the given ID was not found')
  res.send(genre)
})


function validateGenre(genre) {
  const Schema = {
    name: Joi.string().min(3).required()
  }
  return Joi.validate(genre, scheme)
}