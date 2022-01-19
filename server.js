const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');

const app = express();

//connect to DB
connectDB();
app.get('/', (req, res) => res.send('API Running'));

app.use(express.json({ extended: false })); // Set the body to json format

//print in the console if the request was successful (logger)
app.use(
  morgan('dev', {
    skip: function (req, res) {
      return res.statusCode < 400; //log only 4xx and 5xx responses to console
    },
    stream: process.stderr,
  })
);

app.use(
  morgan('dev', {
    skip: function (req, res) {
      return res.statusCode >= 400; // log successful responses to console
    },
    stream: process.stdout,
  })
);

app.use('/item', require('./routes/api/item'));
// app.use('/', require('./routes/api/item'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
