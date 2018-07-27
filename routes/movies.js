const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {
  Movie,
  validate
} = require('../models/movie');
const {
  Genre
} = require('../models/genre');

router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name')
  res.send(movies)
})

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id)
  if (!movie) return res.status(404).send('There movie with given ID was not found')
  res.send(movie)
})