require('dotenv').config();
const Users = require('../models/accountModels');
const jwt = require('jsonwebtoken');
const accountController = {};

// enters a user into the database after GitHub OAuth if an entry
// does not already exist
accountController.createUser = (req, res, next) => {
  const { username, id } = res.locals;
  //Making sure username does not exist
  Users.findOne({ username })
    .then(data => {
      if (!data) {
        Users.create({ username, id }).then(data => {
          //data here is full entry, includes _id key
          res.locals.id = data._id; // sending ID for cookie auth
          return next();
        });
      } else {
        return next();
      }
    })
    .catch(err => {
      next({
        log: `accountController.createUser failed: ${err}`,
        message: `User already exists!`
      });
    });
};

// accountController.createUser = (req, res, next) => {
//   const { username, id } = res.locals;
//   console.log(`username and id in createUser: ${res.locals}`);
//   // Find or create user
//   Users.findOne({ username })
//     .then(data => {
//       if (!data) {
//         return Users.create({ username, id });
//       } else {
//         // User already exists, so we use the existing data
//         res.locals.id = data._id;
//         return data;
//       }
//     })
//     .then(data => {
//       // At this point, data is either the newly created user or the existing user

//       // Generate a JWT token
//       const privateKey = process.env.SECRET_KEY;
//       console.log(`Secret key when creating: ${process.env.SECRET_KEY}`);
//       const token = jwt.sign(
//         { username, id: data._id },
//         privateKey,
//         { expiresIn: '6h' }
//       );
//       console.log(`JWT Token: ${token}`);
//       // Set the JWT token in a cookie
//       res.cookie('ssid', token, { httpOnly: true, secure: false });

//       // Continue with the next middleware
//       return next();
//     })
//     .catch(err => {
//       return next({
//         log: `accountController.createUser failed: ${err}`,
//         message: `Error creating or finding user in the database`
//       });
//     });
// };

// showing the logged in user's projects before the mounting
// of the home page
accountController.userProjects = (req, res, next) => {
  Users.findOne({ username: res.locals.username })
    .then(data => {
      res.locals.userProjects = data.project_ids;
      return next();
    })
    .catch(err => {
      next({
        log: 'accountController.userProjects failed',
        message: `could not find projects for user`
      });
    });
};

// just for test purposes; returns all users in the database
accountController.findUser = (req, res, next) => {
  // write code here
  // const { username } = req.body;
  Users.find({})
    .then(data => {
      res.locals.username = data;
      return next();
    })
    .catch(err => {
      // if (err.message === `Username Doesn't Exist`) res.redirect("/signup");
      return next({
        log: err,
        error: `error found in userController.findUser`
      });
    });
};

module.exports = accountController;
