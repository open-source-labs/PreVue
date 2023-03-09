// const path = require('path');
// const ViteExpress = require('vite-express')
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 8080;
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  // optionSuccessStatus: 200
};
const accountRouter = require('./routes/accountRouter');
// const accountController = require('./controllers/accountController');
const projectRouter = require('./routes/projectRouter');
// const projectController = require('./controllers/projectController');

// Connecting to MongoDB
const mongoose = require('mongoose');
const myURI =
  'mongodb+srv://prevue:prevue123@pvcluster.msrpd4m.mongodb.net/?retryWrites=true&w=majority';
const { MongoClient } = require('mongodb');
mongoose
  .connect(myURI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'prevueDB'
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

// Global Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

// Routers
app.use('/users', accountRouter);
app.use('/projects', projectRouter);

// accountRouter.post('/', accountController.createUser, (req, res) => {
//   return res.status(201).json(res.locals.newUser);
// });

//to endpoint /project
// app.use('/project', projectRouter);

app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;

// module.exports = app.listen(PORT, () =>
//   console.log(`Listening on port ${PORT}`)
// );
