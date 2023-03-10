const express = require('express');
const projectController = require('../controllers/projectController');
const authController = require('../controllers/authController');
// const accountController = require('../controllers/accountController/');
const projectRouter = express.Router();

//signup route
// endpoint : /projects/saveProject
projectRouter.post(
  '/saveProject',
  authController.authenticate,
  projectController.saveProject,
  projectController.userQuery,
  (req, res) => {
    return res.status(201).json(res.locals.user);
  }
);

projectRouter.get(
  'getProject',
  authController.authenticate,
  projectController.getProject,
  (req, res) => {
    return res.status(200).json(res.locals.project)
  }
)

projectRouter.get(
  '/find',
  projectController.findProject,
  // oAuthController.requestGitHubIdentity,
  (req, res) => {
    console.log('in find');
    return res.status(200).json(res.locals.username);
  }
);


module.exports = projectRouter;
