const express = require('express');
const accountController = require('../controllers/accountController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');
const oAuthController = require('../controllers/oAuthController');
const authController = require('../controllers/authController');
const accountRouter = express.Router();

accountRouter.post(
  '/loginWithoutCookie',
  // accountController.loginWithoutCookie,
  (req, res) => {
    console.log('hello from accountRouter');
    return res.status(201).json(res.locals.id);
  }
);

accountRouter.get(
  '/oauth',
  oAuthController.oAuthLogin,
  // oAuthController.requestGitHubIdentity,
  (req, res) => {
    console.log('in oauth router');
    return res.status(200).json(res.locals.url);
  }
);

// just trying to check for users; can be deleted later
accountRouter.get(
  '/find',
  accountController.findUser,
  // oAuthController.requestGitHubIdentity,
  (req, res) => {
    console.log('in find');
    return res.status(200).json(res.locals.username);
  }
);

// retrieves specific user projects
accountRouter.get(
  '/userProjects',
  authController.authenticate,
  accountController.userProjects,
  (req, res) => {
    return res.status(200).json(res.locals.userProjects);
  }
);

// github OAuth route
accountRouter.get(
  '/oauth/access_token/redirect',
  oAuthController.requestGitHubIdentity,
  oAuthController.queryGitHubAPIWithAccessToken,
  accountController.createUser,
  authController.sign,
  cookieController.setSSIDCookie,
  (req, res) => {
    console.log('after requestGitHUbIdentity'),
      console.log('res.locals.access_token', res.locals.access_token),
      console.log('final redirect to homepage');
    res.redirect('http://localhost:5173/home');
  }
);

accountRouter.get(
  '/validateSession',
  authController.authenticate,
  (req, res) => {
    res.status(200).json(res.locals.username);
  }
);

accountRouter.get(
  '/logout',
  cookieController.deleteCookie,
  (req, res) => {
    return res.sendStatus(200);
  }
);

module.exports = accountRouter;
