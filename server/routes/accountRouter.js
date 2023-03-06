const express = require('express');
const accountController = require('../controllers/accountController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');
const oAuthController = require('../controllers/oAuthController');
const accountRouter = express.Router();

//signup route
accountRouter.post(
  '/createUser',
  accountController.createUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    console.log('hello from createUser in accountRouter');
    return res.status(201).json(res.locals.id);
  }
);

accountRouter.post(
  '/login',
  accountController.login,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req, res) => {
    console.log('hello from accountRouter');
    return res.status(201).json(res.locals.id);
  }
);

accountRouter.post(
  '/loginWithoutCookie',
  accountController.loginWithoutCookie,
  (req, res) => {
    console.log('hello from accountRouter');
    return res.status(201).json(res.locals.id);
  }
),

  accountRouter.get(
    '/oauth',
    oAuthController.oAuthLogin,
    // oAuthController.requestGitHubIdentity,
    (req, res) => {
      console.log('in oauth router');
      return res.status(200).json(res.locals.url);
    }
  );

module.exports = accountRouter;
