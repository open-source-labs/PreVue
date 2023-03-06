// const express = require('express');
// const router = express.Router();

// const accountController = require('../controllers/accountController');
// const sessionController = require('../controllers/sessionController');
// const cookieController = require('../controllers/cookieController');
// const oauthController = require('../controllers/oauthController');

// const parseBodyToLocals = (req, res, next) => {
//   const { firstName, lastName, email, password } = JSON.parse(req.body);
//   res.locals = { firstName, lastName, email, password };
//   return next();
// };

// router.use(express.json());
// //create a new account
// router.post(
//   '/',
//   parseBodyToLocals,
//   accountController.createAccount,
//   cookieController.getSSIDCookie,
//   sessionController.startSession,
//   (req, res) => {
//     return res.status(201).json(res.locals.newUser);
//   }
// );

// //check user is logged in using browser cookies in react useEffect hook
// router.get('/', accountController.checkUser, (req, res) => {
//   return res.status(200).json(res.locals.userSession);
// });

// //log in existing user
// router.post(
//   '/log',
//   parseBodyToLocals,
//   accountController.verifyUser,
//   cookieController.getSSIDCookie,
//   sessionController.startSession,
//   (req, res) => {
//     //send status 200 and return ssid, equivalent to cookie set in browser
//     return res.status(200).json(res.locals.response);
//   }
// );

// //log out user and end session
// router.get('/logout', sessionController.endSession, (req, res) => {
//   res.clearCookie('ssid').json(res.locals.ssid);
// });

// /**
//  * OAUTH
//  */
// router.get('/oauth/login', oauthController.loginWithGitHub, (req, res) => {
//   res.status(200).end();
// });

// router.get(
//   '/oauth/access_token/redirect',
//   // get temporary "code" from Github (in req.query) in oauthController and AWAIT post request it back to exchange it for an access token (to Github API for user data)
//   oauthController.requestGitHubIdentity,
//   oauthController.queryGitHubAPIWithAccessToken,
//   // Conditionally branch to create or verify user depending on whether that email already exists in MongoDB
//   accountController.checkUserExistsFromResLocals,
//   (req, res, next) => {
//     if (res.locals.accountExists) {
//       accountController.verifyUser(req, res, next);
//     } else {
//       accountController.createAccount(req, res, next);
//     }
//   },
//   cookieController.getSSIDCookie,
//   sessionController.startSession,

//   (req, res) => {
//     console.table({ oauth: 'LOOK HERE FROM THE GET ROUTE FOR REDIRECT' });
//     console.log('req.params:', req.params);
//     console.log('req.query:', req.query);
//     console.log('req.body:', req.body);
//     // res.status(201).json(res.locals.newUser); // needed on front end?
//     res.redirect('http://localhost:8080/homepage');
//   }
// );

// module.exports = router;
