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