const express = require("express")
const mongoose = require("mongoose")
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const app = express()

mongoose.connect('mongodb://localhost:27017/vidflix', {
    useNewUrlParser: true
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'))

app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/customers', customers)
app.use('/api/movies', movies)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Live at port ${port}...`))