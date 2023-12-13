const express = require('express');
const accountController = require('../controllers/accountController');
const cookieController = require('../controllers/cookieController');
const oAuthController = require('../controllers/oAuthController');
const authController = require('../controllers/authController');
const accountRouter = express.Router();

accountRouter.get('/oauth', oAuthController.oAuthLogin, (req, res) => {
  // Instead of sending the URL back in the response, redirect the client to it
  res.redirect(res.locals.url.toString());
});

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
      console.log('Succesful login');
    res.redirect('/home');
  }
);

// validates user on login
accountRouter.get(
  '/validateSession',
  authController.authenticate,
  (req, res) => {
    res.status(200).json(res.locals.username);
  }
);

// logs out user by deleting cookie
accountRouter.get('/logout', cookieController.deleteCookie, (req, res) => {
  return res.sendStatus(200);
});

// general route for querying users in database
accountRouter.get(
  '/find',
  accountController.findUser,
  (req, res) => {
    return res.status(200).json(res.locals.username);
  }
);

module.exports = accountRouter;
