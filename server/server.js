const path = require('path');
// import path from 'path';
const express = require('express');
// import express from 'express';
const Users = require('./models/accountModels');
// import Users from './models/accountModels.js';
const app = express();
const PORT = 3000;

app.get('/api', (req, res) => {
  Users.find({}).then((user) => console.log(user));
  console.log('hello from serverjs');
  res.status(200).json();
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;

// module.exports = app.listen(PORT, () =>
//   console.log(`Listening on port ${PORT}`)
// );
