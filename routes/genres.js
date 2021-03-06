const express = require('express')
const router = express.Router()
const {
  Genre,
  validate
} = require('../models/genre')

// GET route handler for genres
router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name')
  res.send(genres)
})

// GET route handler for a single genre
router.get('/:id', async (res, req) => {
  const genre = await Genre.findById(req.params.id)
  if (!genre) return res.status(404).send('The genre with the given ID was not found')
  res.send(genre)
})

// POST route handler
router.post('/', async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name
  });
  genre = await genre.save();

  res.send(genre);
});

// PUT route handler

router.put('/:id', async (req, res) => {
  // validate genre before updating database
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // update database
  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    name: req.body.name
  }, {
    new: true
  });
  // check if there is no genre 
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

// Delete
router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id)
  if (!genre) return res.status(404).send('The genre with the given ID was not found')
  res.send(genre)
})

module.exports = router;