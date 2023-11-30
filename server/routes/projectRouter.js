const express = require('express');
const projectController = require('../controllers/projectController');
const authController = require('../controllers/authController');
const projectRouter = express.Router();

// signup route
projectRouter.post(
  '/saveProject',
  authController.authenticate,
  projectController.saveProject,
  projectController.userQuery,
  (req, res) => {
    return res.status(201).json(res.locals.user);
  }
);

projectRouter.post(
  '/getProject',
  authController.authenticate,
  projectController.getProject,
  (req, res) => {
    console.log('testing route');
    return res.status(201).json(res.locals.project);
  }
);

// used to test Supertest functionality; not used in actual app
projectRouter.get(
  '/find',
  projectController.findProject,
  (req, res) => {
    return res
      .status(200)
      .json({ hello: test, 'res.locals.usename': res.locals.username });
  }
);

module.exports = projectRouter;
