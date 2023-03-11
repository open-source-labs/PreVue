const Users = require('../models/accountModels');
const accountController = {};

// enters a user into the database after GitHub OAuth if an entry
// does not already exist
accountController.createUser = (req, res, next) => {
  const { username, id } = res.locals;
  //Making sure username does not exist
  Users.findOne({ username })
    .then((data) => {
      if (!data) {
        Users.create({ username, id }).then((data) => {
          //data here is full entry, includes _id key
          res.locals.id = data._id; // sending ID for cookie auth
          return next();
        });
      } else {
        return next();
      }
    })
    .catch((err) => {
      next({
        log: 'account.createUser failed',
        message: `user already exists!`,
      });
    });
};

accountController.loginWithoutCookie = (req, res, next) => {
  const { username, password } = req.body;
  Users.findOne({ username, password })
    .then((data) => {
      if (data) {
        res.locals.id = data._id; // sending ID for cookie auth
        return next();
      } else {
        return next(err);
      }
    })
    .catch((err) => {
      next({
        log: 'accountcontroller login failed',
        message: `could not log in`,
      });
    });
};

// showing the logged in user's projects before the mounting
// of the home page
accountController.userProjects = (req, res, next) => {
  Users.findOne({ username: res.locals.username })
    .then((data) => {
      res.locals.userProjects = data.project_ids;
      return next();
    })
    .catch((err) => {
      next({
        log: 'accountController.userProjects failed',
        message: `could not find projects for user`,
      });
    });
};

// accountController.verifyUser = (req, res, next) => {
//   // write code here
//   const { username, password } = req.body;
//   Users.findOne({ username, password })
//     .then((data) => {
//       res.locals.username = data.username;
//       return next();
//     })
//     .catch((err) => {
//       // if (err.message === `Username Doesn't Exist`) res.redirect("/signup");
//       return next({
//         log: err,
//         error: `error found in userController.verifyUser`,
//       });
//     });
// };

// just checking for users; can be deleted later
accountController.findUser = (req, res, next) => {
  // write code here
  // const { username } = req.body;
  Users.find({})
    .then((data) => {
      res.locals.username = data;
      return next();
    })
    .catch((err) => {
      // if (err.message === `Username Doesn't Exist`) res.redirect("/signup");
      return next({
        log: err,
        error: `error found in userController.findUser`,
      });
    });
};

module.exports = accountController;
