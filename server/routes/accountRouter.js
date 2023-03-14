const express = require('express');
const accountController = require('../controllers/accountController');
const cookieController = require('../controllers/cookieController');
const oAuthController = require('../controllers/oAuthController');
const authController = require('../controllers/authController');
const accountRouter = express.Router();

// route for GitHub OAuth
accountRouter.get(
  '/oauth',
  oAuthController.oAuthLogin,
  // oAuthController.requestGitHubIdentity,
  (req, res) => {
    console.log('Oauth Router console log');
    return res.status(200).json(res.locals.url);
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

// general route for querying to find all users in database
accountRouter.get(
  '/find',
  accountController.findUser,
  // oAuthController.requestGitHubIdentity,
  (req, res) => {
    return res.status(200).json(res.locals.username);
  }
);

module.exports = accountRouter;
