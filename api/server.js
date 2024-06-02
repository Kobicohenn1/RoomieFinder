require('dotenv').config();
// config will read .env file, parse the contents, assign it to process.env, and return an Object with a parsed key containing the loaded content or an error key if it failed.
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/connectDB');
const regRoutes = require('./routes/register'); // Correct path to register.js

const PORT = process.env.PORT || 3500;
const app = express();

connectDB();

app.use(cors());
app.use(express.json({ extended: false }));

//Define the route
app.use('/api', require('./routes/register'));

mongoose.connection.once('open', () => {
  console.log('Connected To MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT} port`);
  });
});
