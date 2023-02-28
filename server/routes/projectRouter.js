const express = require('express');
const projectController = require('../controllers/projectController');
const sessionController = require('../controllers/sessionController');
// const accountController = require('../controllers/accountController/');
const projectRouter = express.Router();

//signup route
// endpoint : /projects/createProject
projectRouter.post(
  '/createProject',
  sessionController.isLoggedIn,
  projectController.createProject,
  (req, res) => {
    return res.status(201).json(res.locals.newProject);
  }
);

// projectRouter.get('/getProject', (req, res) => {
//   return res.status(201).json(res.locals);
// });

module.exports = projectRouter;
