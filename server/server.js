const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 8080;

const cors = require('cors');
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
const accountRouter = require('./routes/accountRouter');
const projectRouter = require('./routes/projectRouter');

// connecting to MongoDB
const mongoose = require('mongoose');
const myURI = process.env.MONGO_URI;
const { MongoClient } = require('mongodb');
mongoose
  .connect(myURI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'prevueDB',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

// Global Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', '/dist')));

// Routers
app.use('/users', accountRouter);
app.use('/projects', projectRouter);

app.get('*', (req, res) => {
  return res.sendFile(path.join(__dirname, '..', '/dist/index.html'));
});

app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// starts server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
